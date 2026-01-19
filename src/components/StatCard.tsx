'use client';

import { Card, Text } from '@geist-ui/core';

interface StatCardProps {
  label: string;
  value: string | number;
  color?: string;
}

export default function StatCard({ label, value, color }: StatCardProps) {
  return (
    <Card width="100%" style={{ textAlign: 'center' }}>
      <Text small type="secondary">{label}</Text>
      <Text h3 my={0} style={{ color: color || 'inherit' }}>{value}</Text>
    </Card>
  );
}
