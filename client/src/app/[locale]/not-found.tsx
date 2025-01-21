import { RenderJson } from '@/components/server';
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('not_found');

  return <RenderJson json={t.raw('page')} />;
}
