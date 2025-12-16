import { clientEvn } from '@/lib/env';
import { createContext, use, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

export const turnstileSkipLocal = clientEvn.VITE_TURNSTILE_SKIP_LOCAL === 'true';

type TurnstileCtx = {
  token?: string;
  isValid: boolean;
  skip_local: boolean;
  reset: () => void;
};

const initialState = {
  isValid: turnstileSkipLocal,
  skip_local: turnstileSkipLocal,
  reset: () => {},
};

const TurnstileCtx = createContext<TurnstileCtx>(initialState);

export const useTurnstile = () => {
  const ctx = use(TurnstileCtx);
  return ctx;
};

export const TurnstileProvider = ({ children, containerIncluded = false }: { children: ReactNode; containerIncluded?: boolean }) => {
  const [state, setState] = useState<TurnstileCtx>(initialState);
  const widgetIdRef = useRef<string | undefined>(undefined);

  const reset = useCallback(() => {
    if (turnstileSkipLocal) return;
    if (window.turnstile && widgetIdRef.current !== undefined) {
      window.turnstile.reset(widgetIdRef.current);
      setState((prev) => ({ ...prev, token: '', isValid: false }));
    }
  }, []);

  const init = useCallback(() => {
    if (turnstileSkipLocal) return;
    if (window.turnstile) {
      const container = document.getElementById('turnstile-container');
      if (container && container.children.length > 0) {
        return;
      }
      const widgetId = window.turnstile.render('#turnstile-container', {
        sitekey: clientEvn.VITE_TURNSTILE_SITE_KEY as string,
        theme: 'auto',
        size: 'flexible',
        callback(token) {
          setState((prev) => ({ ...prev, token, isValid: true }));
        },
        'error-callback': () => {
          setState((prev) => ({ ...prev, token: '', isValid: false }));
        },
      });
      widgetIdRef.current = widgetId;
    }
  }, []);

  useEffect(() => {
    setState((prev) => ({ ...prev, reset }));
  }, [reset]);

  useEffect(() => {
    if (turnstileSkipLocal) return;
    if (window.turnstile) {
      init();
    } else {
      window.addEventListener('load', init);
    }
    return () => {
      window.removeEventListener('load', init);
    };
  }, [init]);

  return turnstileSkipLocal ? (
    children
  ) : (
    <TurnstileCtx value={state}>
      {children}
      {!containerIncluded && <TurnstileContainer />}
    </TurnstileCtx>
  );
};

export const TurnstileContainer = () => {
  return <div id="turnstile-container" className="mt-4 w-full"></div>;
};
