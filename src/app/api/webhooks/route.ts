import { waitUntil } from "@vercel/functions";
import type { NextRequest } from "next/server";
import { whopsdk } from "@/lib/whop";
import { handleMembershipActivated, handleMembershipDeactivated, logWebhookEvent } from "@/services/webhookService";

export async function POST(request: NextRequest): Promise<Response> {
  try {
    // Get raw body and headers for validation
    const requestBodyText = await request.text();
    const headers = Object.fromEntries(request.headers);

    // Validate the webhook signature
    let webhookData: any;
    try {
      webhookData = whopsdk.webhooks.unwrap(requestBodyText, { headers });
    } catch (error) {
      console.error('[WEBHOOK] Invalid signature:', error);
      return new Response('Invalid signature', { status: 401 });
    }

    // Log the event
    console.log(`[WEBHOOK] Received event: ${webhookData.type}`);
    logWebhookEvent(webhookData.type, webhookData.data);

    // Handle different event types
    switch (webhookData.type) {
      case 'membership.activated':
        waitUntil(handleMembershipActivated(webhookData.data));
        break;

      case 'membership.deactivated':
        waitUntil(handleMembershipDeactivated(webhookData.data));
        break;

      case 'payment.succeeded':
        console.log('[WEBHOOK] Payment succeeded:', webhookData.data);
        break;

      default:
        console.log(`[WEBHOOK] Unhandled event type: ${webhookData.type}`);
    }

    // Return 200 quickly to prevent retries
    return new Response('OK', { status: 200 });

  } catch (error) {
    console.error('[WEBHOOK] Error processing webhook:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Only allow POST requests
export async function GET() {
  return new Response('Method Not Allowed', { status: 405 });
}
