'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LoadingContext = createContext({
  isLoading: true,
  progress: 0,
  registerComponent: () => { },
  markComponentReady: () => { },
});

export function useLoading() {
  return useContext(LoadingContext);
}

export function LoadingProvider({ children, minimumLoadTime = 2000 }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [registeredComponents, setRegisteredComponents] = useState(new Set());
  const [readyComponents, setReadyComponents] = useState(new Set());
  const [startTime] = useState(Date.now());

  // Register a component that needs to load
  const registerComponent = useCallback((componentId) => {
    setRegisteredComponents(prev => new Set([...prev, componentId]));
  }, []);

  // Mark a component as ready
  const markComponentReady = useCallback((componentId) => {
    setReadyComponents(prev => new Set([...prev, componentId]));
  }, []);

  // Calculate progress based on ready components
  useEffect(() => {
    const totalComponents = registeredComponents.size;
    const readyCount = readyComponents.size;

    if (totalComponents === 0) {
      setProgress(0);
      return;
    }

    const componentProgress = (readyCount / totalComponents) * 100;
    setProgress(Math.min(componentProgress, 100));
  }, [registeredComponents.size, readyComponents.size]);

  // Check if all components are ready
  useEffect(() => {
    const allReady = registeredComponents.size > 0 &&
      registeredComponents.size === readyComponents.size;

    if (allReady) {
      // Ensure minimum load time for smooth UX
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minimumLoadTime - elapsed);

      setTimeout(() => {
        setProgress(100);
        setTimeout(() => setIsLoading(false), 300); // Small delay after 100%
      }, remainingTime);
    }
  }, [registeredComponents, readyComponents, startTime, minimumLoadTime]);

  // Fallback: if no components register within 1s, check basic page readiness
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (registeredComponents.size === 0) {
        // No components registered, use document ready state
        if (document.readyState === 'complete') {
          setProgress(100);
          setTimeout(() => setIsLoading(false), 500);
        } else {
          const handleLoad = () => {
            setProgress(100);
            setTimeout(() => setIsLoading(false), 500);
          };
          window.addEventListener('load', handleLoad);
          return () => window.removeEventListener('load', handleLoad);
        }
      }
    }, 1000);

    return () => clearTimeout(fallbackTimer);
  }, [registeredComponents.size]);

  // Track fonts loading
  useEffect(() => {
    registerComponent('fonts');

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        markComponentReady('fonts');
      });
    } else {
      // Fallback for browsers without font loading API
      setTimeout(() => markComponentReady('fonts'), 500);
    }
  }, [registerComponent, markComponentReady]);

  // Track document ready
  useEffect(() => {
    registerComponent('document');

    if (document.readyState === 'complete') {
      markComponentReady('document');
    } else {
      const handleReady = () => markComponentReady('document');
      window.addEventListener('load', handleReady);
      return () => window.removeEventListener('load', handleReady);
    }
  }, [registerComponent, markComponentReady]);

  return (
    <LoadingContext.Provider value={{
      isLoading,
      progress,
      registerComponent,
      markComponentReady
    }}>
      {children}
    </LoadingContext.Provider>
  );
}
