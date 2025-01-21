import { Clipboard } from '@/assets/images';
import { getTranslations } from 'next-intl/server';
import { RenderJson } from '.';

export async function NoTasks() {
  const t = await getTranslations('notasks');

  return (
    <section
      className='flex flex-col text-center justify-center items-center gap-3 rounded-2xl min-h-96'
      style={{ borderTop: '1px solid #333', marginTop: '24px' }}
    >
      <div>
        <Clipboard />
      </div>
      <RenderJson json={t.raw('component')} />
    </section>
  );
}

export default NoTasks;
