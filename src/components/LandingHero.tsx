import { Button } from "@whop/react/components";
import Link from "next/link";

export default function LandingHero() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16 px-4 text-center">
      <h1 className="text-9 font-bold text-gray-12">
        X&O Clash
      </h1>
      <p className="text-4 text-gray-10 max-w-xl">
        The ultimate Tic-Tac-Toe battle arena. Challenge AI opponents or compete 
        against other Whop community members in real-time PvP matches.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/experiences/demo">
          <Button variant="classic" size="3">
            Start Playing
          </Button>
        </Link>
        <Link href="https://docs.whop.com" target="_blank">
          <Button variant="soft" size="3">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
}
