// global types
// zod types available at @/libs/zod/types
declare module '*.svg?react' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}
type signal = {
  signal: AbortSignal;
};
type PageProps = {
  params: Promise<{
    [key: string]: string;
  }>;
};
