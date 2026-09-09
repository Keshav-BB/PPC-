import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import {
  SYSTEM_PROMPT,
  APPROVED_PACKAGES,
  calculateLeadScore,
  getDeterministicFallbackResponse,
  ChatMessage,
  LeadProfile
} from '@/lib/botKnowledge';

// In-memory rate limiting map: ip -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS_PER_MINUTE = 30;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 1000 });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_MINUTE) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';

    if (!checkRateLimit(clientIp)) {
      // Rate limited: Return safe guidance rather than crashing
      return NextResponse.json({
        reply: "You're sending messages quite quickly! To discuss your requirements directly with our team, feel free to connect on WhatsApp at +91 88073 04713.",
        engine: 'rate_limited',
        quickReplies: ['Chat on WhatsApp (+91 88073 04713)', 'Book Free Consultation']
      });
    }

    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: messages array required.' },
        { status: 400 }
      );
    }

    const messages: ChatMessage[] = body.messages.slice(-20); // Keep last 20 messages for context
    const profile: Partial<LeadProfile> = body.profile || {};
    const lastMessage = messages[messages.length - 1];

    if (!lastMessage || typeof lastMessage.content !== 'string' || lastMessage.content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message content cannot be empty.' },
        { status: 400 }
      );
    }

    // Limit single message length
    const userText = lastMessage.content.slice(0, 1000);
    const apiKey = process.env.GEMINI_API_KEY;
    const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

    // If API key is present, attempt Gemini Call
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });

        // Build conversation history for Gemini
        const contents = messages.map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }));

        // Use Promise.race for strict 9-second timeout
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout waiting for Gemini response')), 9000)
        );

        const geminiPromise = ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.6,
            maxOutputTokens: 800,
          }
        });

        const response: any = await Promise.race([geminiPromise, timeoutPromise]);
        const replyText = response?.text?.trim();

        if (replyText) {
          // Identify if any approved package was recommended
          let matchedPackage = undefined;
          for (const key of Object.keys(APPROVED_PACKAGES)) {
            const pkg = APPROVED_PACKAGES[key];
            if (replyText.toLowerCase().includes(pkg.packageName.toLowerCase())) {
              matchedPackage = pkg;
              break;
            }
          }

          const leadScore = calculateLeadScore({
            ...profile,
            primaryNeed: matchedPackage?.packageName || profile.primaryNeed
          });

          return NextResponse.json({
            reply: replyText,
            recommendedPackage: matchedPackage,
            leadScore,
            engine: 'gemini',
            quickReplies: [
              'Continue on WhatsApp',
              'Book Free Consultation',
              'Tell me about timelines',
              'What else is included?'
            ]
          });
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call failed or timed out. Gracefully activating Deterministic Fallback Engine:', geminiError?.message);
        // Fall through to deterministic engine
      }
    }

    // Deterministic Domain Knowledge Fallback Engine
    const fallback = getDeterministicFallbackResponse(userText, messages);
    const leadScore = calculateLeadScore({
      ...profile,
      primaryNeed: fallback.recommendedPackage?.packageName || profile.primaryNeed,
      businessStage: fallback.suggestedStage || profile.businessStage
    });

    return NextResponse.json({
      reply: fallback.reply,
      recommendedPackage: fallback.recommendedPackage,
      leadScore,
      quickReplies: fallback.quickReplies,
      engine: 'deterministic_fallback'
    });

  } catch (error: any) {
    console.error('Unhandled chat route error:', error);
    // Even in unhandled errors, never send a 500 back to the user interface
    const fallback = getDeterministicFallbackResponse('help');
    return NextResponse.json({
      reply: fallback.reply,
      recommendedPackage: fallback.recommendedPackage,
      leadScore: 25,
      quickReplies: fallback.quickReplies,
      engine: 'emergency_fallback'
    });
  }
}
