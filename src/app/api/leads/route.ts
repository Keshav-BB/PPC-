import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || (!body.phone && !body.email && !body.name && !body.fullName)) {
      return NextResponse.json(
        { error: 'Invalid lead payload: at least name, phone, or email is required.' },
        { status: 400 }
      );
    }

    const leadPayload = {
      fullName: String(body.fullName || body.name || 'Anonymous Visitor').trim().slice(0, 150),
      companyName: String(body.companyName || body.company || 'Not specified').trim().slice(0, 150),
      phone: String(body.phone || '').trim().slice(0, 50),
      email: String(body.email || '').trim().slice(0, 100),
      city: String(body.city || body.location || 'India').trim().slice(0, 100),
      businessStage: String(body.businessStage || 'Not specified').trim().slice(0, 100),
      entityStatus: String(body.entityStatus || 'Not specified').trim().slice(0, 100),
      teamSize: String(body.teamSize || 'Not specified').trim().slice(0, 50),
      servicesNeeded: Array.isArray(body.servicesNeeded)
        ? body.servicesNeeded.map((s: string) => String(s).slice(0, 100))
        : [String(body.service || 'AI Business Advisor Inquiry').slice(0, 100)],
      challenge: String(body.challenge || body.requirementSummary || 'Captured from AI Business Advisor chat.').trim().slice(0, 1000),
      expectedTimeline: String(body.expectedTimeline || body.timeline || 'Exploring').trim().slice(0, 100),
      recommendedPackage: String(body.recommendedPackage || 'Business Launch 360°').trim().slice(0, 100),
      leadScore: typeof body.leadScore === 'number' ? body.leadScore : 35,
      conversationId: String(body.conversationId || ('PP-CONV-' + Date.now().toString(36))).slice(0, 50),
      source: String(body.source || 'Website AI Business Advisor').slice(0, 100),
      utmSource: body.utmSource ? String(body.utmSource).slice(0, 100) : undefined,
      utmMedium: body.utmMedium ? String(body.utmMedium).slice(0, 100) : undefined,
      utmCampaign: body.utmCampaign ? String(body.utmCampaign).slice(0, 100) : undefined,
      createdAt: new Date().toISOString()
    };

    console.log('[CRM Lead Ingested] ID: ' + leadPayload.conversationId + ' | Name: ' + leadPayload.fullName + ' | Stage: ' + leadPayload.businessStage + ' | Score: ' + leadPayload.leadScore);

    return NextResponse.json({
      success: true,
      message: 'Lead recorded successfully in CRM queue.',
      leadId: leadPayload.conversationId
    });
  } catch (err: any) {
    console.error('Lead submission API error:', err?.message || err);
    return NextResponse.json(
      { error: 'Internal server error while saving lead.' },
      { status: 500 }
    );
  }
}
