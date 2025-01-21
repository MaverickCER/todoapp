import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// https://vercel.com/docs/analytics/quickstart
// https://vercel.com/docs/speed-insights/quickstart
export function Insights() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default Insights;
