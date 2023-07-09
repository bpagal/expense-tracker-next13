import { useRef, useEffect } from 'react';

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as HTMLUListElement)
      ) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [callback, ref]);

  return ref;
};
