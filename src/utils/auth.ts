import { whopsdk } from "@/lib/whop";

export async function verifyUserToken(token: string) {
  try {
    const { userId } = await whopsdk.verifyUserToken(token);
    return userId;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

export async function getMemberInfo(userId: string) {
  try {
    return await whopsdk.users.retrieve(userId);
  } catch (error) {
    console.error("Failed to retrieve user info:", error);
    return null;
  }
}

export async function checkAccess(userId: string, requireValidMembership = true) {
  // Placeholder for specific access logic, e.g., checking if user owns a specific product
  // This would typically involve whopsdk.memberships.list({ user_id: userId })
  // For now, we return true if user info can be retrieved
  const user = await getMemberInfo(userId);
  return !!user;
}
