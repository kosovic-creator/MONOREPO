"use client";
import { useTranslations } from '@/../../packages/shared/i18n/useTranslations';

export default function HomeClient({ postovi }: { postovi: { id: string; title: string }[] }) {
  const { t } = useTranslations("post");
  return (
    <main className="p-8 text-2xl font-bold">
      {t("title")}
      {postovi.map((post) => (
        <div className='text-sm' key={post.id}>{post.title}</div>
      ))}
    </main>
  );
}
