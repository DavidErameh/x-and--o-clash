export type WebhookEventType = 
  | 'membership.activated'
  | 'membership.deactivated'
  | 'payment.succeeded'
  | 'payment.failed';

export interface MembershipWebhookPayload {
  id: string;
  user_id: string;
  product_id: string;
  plan_id: string;
  status: string;
  valid: boolean;
  created_at: string;
  expires_at?: string;
}

export interface WebhookEvent {
  type: WebhookEventType;
  data: MembershipWebhookPayload;
  id: string;
  created_at: string;
}

export interface ProcessedWebhookEvent {
  eventId: string;
  eventType: WebhookEventType;
  processedAt: string;
  success: boolean;
}
