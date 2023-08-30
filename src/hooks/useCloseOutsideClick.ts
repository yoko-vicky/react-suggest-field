import { useEffect, useRef } from 'react';

const useCloseOutsideClick = (onOutsideClick: () => void) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOutsideClick = (e: any) => {
    const clickedContainer = containerRef.current?.contains(e.target);
    const clickedInput = inputRef.current?.contains(e.target);

    if (!clickedContainer && !clickedInput) {
      // setShowSuggest(false);
      onOutsideClick();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    containerRef,
    inputRef,
  };
};

export default useCloseOutsideClick;
