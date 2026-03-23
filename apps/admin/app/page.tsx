import type { Metadata } from 'next';
import { Button } from "@sport/shared/components/ui/button";

export const metadata: Metadata = {
  title: 'Admin App',
  description: 'Admin app in SPORT monorepo',
};

export default function Home() {
  return (
    <main className="p-8 text-2xl font-bold">
      Admin App Home (App Router)
      <Button variant="primary">Primary Button</Button>
      <div className="bg-yellow-500 text-white p-4">Test Tailwind</div>
    </main>
  );
}
