import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bitte Starter with Next.js",
  description: "Simple Login with Next.js 14",
};

export default function AccountPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      Account
    </main>
  );
}
