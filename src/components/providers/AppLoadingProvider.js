'use client';

import { LoadingProvider, useLoading } from '@/context/LoadingContext';
import Loading from '@/app/loading';

function LoadingWrapper({ children }) {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && <Loading />}
      <div
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
          visibility: isLoading ? 'hidden' : 'visible',
        }}
      >
        {children}
      </div>
    </>
  );
}

export default function AppLoadingProvider({ children }) {
  return (
    <LoadingProvider minimumLoadTime={2000}>
      <LoadingWrapper>{children}</LoadingWrapper>
    </LoadingProvider>
  );
}
