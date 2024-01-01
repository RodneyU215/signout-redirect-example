import {
  RedirectWithBuiltinSignedOutBtn,
  RedirectWithCustomSignedOutBtn,
} from '@/components/SignOut';
import {
  SignOutButton,
  UserButton,
  currentUser,
} from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await currentUser();

  if (!user) redirect('/sign-in');

  // 4 ways to redirect a user after they sign out:
  // 1. <UserButton afterSignOutUrl="/" />;
  // 2. <SignOutButton signOutCallback={() => router.push("/")} />
  // 3. <button onClick={() => signOut(() => router.push("/"))}>
  // 4. Clerk Dashboard - Deprecated, Not Recommended

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mt-8">
            Custom Signout Redirect Demo
          </h1>
          <div className="flex-col items-center  text-xl mt-4 border-y-2 border-black p-2 flex gap-2">
            <UserButton afterSignOutUrl="/signed_out" />
            {/* Full URLs work too! <UserButton afterSignOutUrl="https://www.clerk.com" /> */}
            <span>
              {'<UserButton afterSignOutUrl="/signed_out" />'}
            </span>
          </div>
          <div className="flex-col items-center text-xl mt-4 p-2 flex gap-2">
            <SignOutButton redirectUrl="/signed_out">
              <button className="border-2 border-black max-w-48">
                Sign Out
              </button>
            </SignOutButton>
            <span>
              {'<SignOutButton redirectUrl="/signed_out" />'}
            </span>
            <p className="text-sm">
              Note: This version only works with
              @clerk/nextjs@5.0.0-alpha-v5.13 or higher
            </p>
          </div>
          <p className="flex-col items-center text-xl mt-4 border-y-2 border-black p-2 flex gap-2">
            {<RedirectWithBuiltinSignedOutBtn />}
            <span>
              {`<SignOutButton signOutCallback={() => router.push('/signed_out')} />`}
            </span>
          </p>
          <p className="flex-col items-center text-xl mt-4 p-2 flex gap-2">
            {<RedirectWithCustomSignedOutBtn />}
            <span>
              {`<button onClick={() => signOut(() => router.push('/signed_out'))}>Custom Sign Out</button>`}
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
