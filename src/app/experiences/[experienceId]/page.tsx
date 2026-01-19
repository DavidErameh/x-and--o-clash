import { Button } from "@whop/react/components";
import { headers } from "next/headers";
import Link from "next/link";
import { whopsdk } from "@/lib/whop";

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ experienceId: string }>;
}) {
  const { experienceId } = await params;
  
  // Verify user is logged in via Whop
  const { userId } = await whopsdk.verifyUserToken(await headers());

  // Fetch user data and check access
  const [experience, user, access] = await Promise.all([
    whopsdk.experiences.retrieve(experienceId),
    whopsdk.users.retrieve(userId),
    whopsdk.users.checkAccess(experienceId, { id: userId }),
  ]);

  const displayName = user.name || `@${user.username}`;

  // If no access, show access denied with link to purchase
  if (!access.has_access) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-6 text-center">
        <h1 className="text-7 font-bold text-gray-12">Access Required</h1>
        <p className="text-3 text-gray-10 max-w-md">
          You need a valid membership to access X&O Clash. 
          Join the community to start playing!
        </p>
        <Link href="https://whop.com" target="_blank">
          <Button variant="classic" size="3">
            Get Access
          </Button>
        </Link>
      </div>
    );
  }

  // Authenticated member view - show game selection
  return (
    <div className="flex flex-col p-8 gap-6 min-h-screen">
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-7 font-bold text-gray-12">
          Welcome, <span className="text-blue-10">{displayName}</span>!
        </h1>
      </div>

      <p className="text-3 text-gray-10">
        You have <strong>{access.access_level}</strong> access. Choose your game mode below:
      </p>

      {/* Game Mode Selection */}
      <div className="grid md:grid-cols-2 gap-6 mt-4 max-w-2xl">
        <Link href="/game/ai">
          <div className="bg-gray-a2 border border-gray-a4 rounded-xl p-6 hover:border-blue-7 transition-colors cursor-pointer">
            <h3 className="text-5 font-semibold text-gray-12 mb-2">🤖 vs AI</h3>
            <p className="text-2 text-gray-10">
              Challenge our minimax AI opponent
            </p>
          </div>
        </Link>
        
        <Link href="/game/pvp">
          <div className="bg-gray-a2 border border-gray-a4 rounded-xl p-6 hover:border-blue-7 transition-colors cursor-pointer">
            <h3 className="text-5 font-semibold text-gray-12 mb-2">👥 vs Player</h3>
            <p className="text-2 text-gray-10">
              Compete against other community members
            </p>
          </div>
        </Link>
      </div>

      {/* Quick Stats Link */}
      <div className="mt-8">
        <Link href="/dashboard">
          <Button variant="soft" size="2">
            View Your Stats
          </Button>
        </Link>
      </div>
    </div>
  );
}
