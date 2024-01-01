'use client';
import { SignOutButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useClerk } from '@clerk/clerk-react';

export function RedirectWithBuiltinSignedOutBtn() {
  const router = useRouter();

  return (
    <SignOutButton signOutCallback={() => router.push('/signed_out')}>
      <button className="border-2 border-black max-w-48">
        Sign Out
      </button>
    </SignOutButton>
  );
}

export function RedirectWithCustomSignedOutBtn() {
  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <button
      className="border-2 border-black max-w-48"
      onClick={() => signOut(() => router.push('/signed_out'))}
    >
      Custom Sign Out
    </button>
  );
}
