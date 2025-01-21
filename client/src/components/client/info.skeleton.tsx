'use client';

export function InfoSkeleton() {
  return (
    <div className="flex justify-between items-center w-full">
      <span className="flex items-center">
        <div className="bg-brand-white rounded-full w-12 h-6"></div>
        <div className="w-2"></div>
        <div className="bg-brand-soot rounded-full w-8 h-6"></div>
      </span>
      <span className="flex items-center">
        <div className="bg-brand-white rounded-full w-48 h-6"></div>
        <div className="w-2"></div>
        <div className="bg-brand-soot rounded-full w-40 h-6"></div>
      </span>
    </div>
  );
}

export default InfoSkeleton;
