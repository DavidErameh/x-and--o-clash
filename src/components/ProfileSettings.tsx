'use client';

import { useAuth } from '@/hooks/useAuth';
import { Avatar } from '@geist-ui/core';

export default function ProfileSettings() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="bg-gray-a2 border border-gray-a4 rounded-xl p-6 text-center">
        <p className="text-2 text-gray-10">Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-a2 border border-gray-a4 rounded-xl p-6">
      <h3 className="text-4 font-semibold text-gray-12 mb-4">Profile</h3>
      <div className="flex items-center gap-4">
        <Avatar
          src={user.image || undefined}
          text={user.name?.charAt(0) || 'U'}
          width="64px"
          height="64px"
        />
        <div className="flex flex-col gap-1">
          <span className="text-4 font-semibold text-gray-12">
            {user.name || 'Anonymous'}
          </span>
          <span className="text-2 text-gray-10">
            {user.email || 'No email'}
          </span>
        </div>
      </div>
    </div>
  );
}
