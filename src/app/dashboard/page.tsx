'use client';

import { Spacer, Loading } from '@geist-ui/core';
import GameContainer from '@/components/GameContainer';
import StatsSummary from '@/components/StatsSummary';
import RecentGames from '@/components/RecentGames';
import ProfileSettings from '@/components/ProfileSettings';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Button } from '@whop/react/components';

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const { data, loading, error } = useDashboardData();

  if (!isAuthenticated) {
    return (
      <GameContainer>
        <div className="text-center py-16">
          <h2 className="text-6 font-bold text-gray-12 mb-4">Sign In Required</h2>
          <p className="text-3 text-gray-10 mb-6">Please sign in to view your dashboard.</p>
        </div>
      </GameContainer>
    );
  }

  if (loading) {
    return (
      <GameContainer>
        <div className="flex justify-center py-16">
          <Loading scale={2} />
        </div>
      </GameContainer>
    );
  }

  if (error || !data) {
    return (
      <GameContainer>
        <div className="text-center py-16">
          <h2 className="text-6 font-bold text-red-10 mb-4">Error</h2>
          <p className="text-3 text-gray-10">{error || 'Failed to load dashboard'}</p>
        </div>
      </GameContainer>
    );
  }

  return (
    <GameContainer>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-7 font-bold text-gray-12">Your Dashboard</h1>
          <Link href="/">
            <Button variant="soft" size="2">Play Now</Button>
          </Link>
        </div>

        <ProfileSettings />

        <Spacer h={1} />

        <div>
          <h2 className="text-5 font-semibold text-gray-12 mb-4">Statistics</h2>
          <StatsSummary {...data.stats} />
        </div>

        <Spacer h={1} />

        <RecentGames games={data.recentGames} />
      </div>
    </GameContainer>
  );
}
