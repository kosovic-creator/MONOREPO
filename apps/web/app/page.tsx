import type { Metadata } from 'next';
import { Button } from "@sport/shared/components/ui/button";

export const metadata: Metadata = {
  title: 'Web App',
  description: 'Web app in SPORT monorepo',
};

export default function Home() {
  return (
    <main className="p-8 text-2xl font-bold">
      Web App Home (App Router)
      <Button variant="primary">Primary Button</Button>
      <div className="bg-red-500 text-white p-4">Test Tailwind</div>
    </main>
  );
}