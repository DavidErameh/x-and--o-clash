import LandingHero from "@/components/LandingHero";
import FeatureShowcase from "@/components/FeatureShowcase";
import { Button } from "@whop/react/components";
import Link from "next/link";

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-gray-1">
      <LandingHero />
      <FeatureShowcase />
      
      {/* Call to Action Section */}
      <div className="py-16 px-4 text-center bg-gray-a2">
        <h2 className="text-6 font-bold text-gray-12 mb-4">
          Ready to Play?
        </h2>
        <p className="text-3 text-gray-10 mb-6 max-w-lg mx-auto">
          Join the X&O Clash community and start competing today. 
          Available exclusively for Whop members.
        </p>
        <Link href="/experiences/demo">
          <Button variant="classic" size="4">
            Get Started
          </Button>
        </Link>
      </div>
      
      {/* Footer */}
      <div className="py-8 px-4 text-center border-t border-gray-a4">
        <p className="text-1 text-gray-9">
          © 2026 X&O Clash. Built with Whop.
        </p>
      </div>
    </div>
  );
}
