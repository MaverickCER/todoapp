import { getTranslations } from 'next-intl/server';
import { RenderJson } from '@/components/server';

export default async function Page() {
  const t = await getTranslations('not_found');

  return <RenderJson json={t.raw('page')} />;
}
