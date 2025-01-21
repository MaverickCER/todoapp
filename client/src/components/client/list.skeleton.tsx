'use client';

export function ListSkeleton() {
  return (
    <section
      className='flex flex-col text-center justify-center items-center gap-3 rounded-2xl min-h-96 animate-pulse'
      style={{ borderTop: '1px solid #333', marginTop: '24px' }}
    >
      <div className='w-12 h-14 bg-brand-soot rounded mb-4' />
      <div className='w-2/3 h-4 bg-brand-soot rounded-md mb-2' />
      <div className='w-3/4 h-4 bg-brand-soot rounded-md' />
    </section>
  );
}

export default ListSkeleton;
