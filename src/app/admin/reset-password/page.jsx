'use client';

import dynamic from 'next/dynamic';

// Dynamically import the ResetPassword component with SSR disabled
const ResetPasswordWithNoSSR = dynamic(
  () => import('./page-component'),
  { ssr: false }
);

export default function ResetPasswordPage() {
  return <ResetPasswordWithNoSSR />;
}