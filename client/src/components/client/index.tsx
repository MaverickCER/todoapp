'use client';
import dynamic from 'next/dynamic';
import A11yCssSkeleton from './a11y-css.skeleton';
import InfoSkeleton from './info.skeleton';
import LanguageSelectorSkeleton from './language-selector.skeleton';
import ListSkeleton from './list.skeleton';
import TaskFormSkeleton from './task-form.skeleton';

// dynamically load client components wrapped withErrorBoundary by default
export const DynamicA11yCss = dynamic(() => import('./a11y-css'), {
  loading: () => <A11yCssSkeleton />,
  ssr: false,
});
export const DynamicInfo = dynamic(() => import('./info'), {
  loading: () => <InfoSkeleton />,
  ssr: false,
});
export const DynamicLanguageSelector = dynamic(() => import('./language-selector'), {
  loading: () => <LanguageSelectorSkeleton />,
  ssr: false,
});
export const DynamicList = dynamic(() => import('./list'), {
  loading: () => <ListSkeleton />,
  ssr: false,
});
export const DynamicTaskForm = dynamic(() => import('./task-form'), {
  loading: () => <TaskFormSkeleton />,
  ssr: false,
});

export { default as AnimatedTemplate } from './animated-template';
export { default as withErrorBoundary } from './error-boundary';
export { default as ScrollToTopButton } from './scroll-to-top-button';
