'use client';

export function TaskFormSkeleton() {
  return (
    <form>
      <div className='mb-5'>
        <div className='w-1/12 h-6 bg-brand-bright animate-pulse rounded mb-2'></div>
        <div className='w-full h-10 bg-brand-soot animate-pulse rounded'></div>
      </div>
      <div>
        <div className='w-1/12 h-6 bg-brand-bright animate-pulse rounded mb-2'></div>
        <div className='flex flex-wrap space-x-3 items-center justify-start mb-5'>
          {['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'pink', 'brown'].map((color) => (
            <div key={color} className={`w-10 h-10 bg-brand-soot animate-pulse rounded-full`}></div>
          ))}
        </div>
      </div>
      <div className='w-full h-12 bg-brand animate-pulse rounded mb-5'></div>
    </form>
  );
}

export default TaskFormSkeleton;
