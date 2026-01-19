import { supabase } from '@/lib/supabase';
import { MembershipWebhookPayload, WebhookEventType } from '@/types/webhook';

// Set to track processed events for idempotency
const processedEvents = new Set<string>();

export function logWebhookEvent(type: WebhookEventType, data: any): void {
  console.log(`[WEBHOOK LOG] Type: ${type}`);
  console.log(`[WEBHOOK LOG] Data:`, JSON.stringify(data, null, 2));
  console.log(`[WEBHOOK LOG] Timestamp: ${new Date().toISOString()}`);
}

export async function handleMembershipActivated(data: MembershipWebhookPayload): Promise<void> {
  const eventId = data.id;

  // Idempotency check
  if (processedEvents.has(eventId)) {
    console.log(`[WEBHOOK] Event ${eventId} already processed, skipping`);
    return;
  }

  try {
    const { user_id, product_id, plan_id } = data;

    // Upsert user or update membership status
    const { error } = await (supabase.from('users') as any).upsert({
      whop_user_id: user_id,
      membership_status: 'active',
      product_id,
      plan_id,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'whop_user_id',
    });

    if (error) {
      console.error('[WEBHOOK] Error activating membership:', error);
      throw error;
    }

    console.log(`[WEBHOOK] Membership activated for user ${user_id}`);
    processedEvents.add(eventId);

  } catch (error) {
    console.error('[WEBHOOK] Failed to handle membership activation:', error);
    throw error;
  }
}

export async function handleMembershipDeactivated(data: MembershipWebhookPayload): Promise<void> {
  const eventId = data.id;

  // Idempotency check
  if (processedEvents.has(eventId)) {
    console.log(`[WEBHOOK] Event ${eventId} already processed, skipping`);
    return;
  }

  try {
    const { user_id } = data;

    // Update user's membership status to inactive
    const { error } = await (supabase.from('users') as any).update({
      membership_status: 'inactive',
      updated_at: new Date().toISOString(),
    }).eq('whop_user_id', user_id);

    if (error) {
      console.error('[WEBHOOK] Error deactivating membership:', error);
      throw error;
    }

    console.log(`[WEBHOOK] Membership deactivated for user ${user_id}`);
    processedEvents.add(eventId);

  } catch (error) {
    console.error('[WEBHOOK] Failed to handle membership deactivation:', error);
    throw error;
  }
}
