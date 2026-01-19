import { Whop } from "@whop/sdk";

export const whopsdk = new Whop({
	appID: process.env.NEXT_PUBLIC_WHOP_APP_ID || "app_mock_id",
	apiKey: process.env.WHOP_API_KEY || "mock_key",
	webhookKey: btoa(process.env.WHOP_WEBHOOK_SECRET || "mock_secret"),
});
