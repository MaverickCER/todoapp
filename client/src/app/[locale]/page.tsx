import { getServerUser } from '@/actions';
import { DynamicInfo, DynamicList } from '@/components/client';
import { CreateTask, NoTasks } from '@/components/server';

export default async function Page() {
  const user = await getServerUser();

  if (!user) {
    return <></>;
  }

  return (
    <article className='space-y-4'>
      <CreateTask />
      <DynamicInfo />
      <DynamicList>
        <NoTasks />
      </DynamicList>
    </article>
  );
}
