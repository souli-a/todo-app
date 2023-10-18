import { RefObject } from 'react';
import { useEventListener, EventType } from './useEventListener';

interface UseDetectOuterClickProps {
  elementRef: RefObject<HTMLElement>;
  handleFunctions: () => void;
}

const useDetectOuterClick = ({
  elementRef,
  handleFunctions,
}: UseDetectOuterClickProps) => {
  const anyFunctions = () => {
    handleFunctions();
  };

  const handleOuterClick = (e: EventType) => {
    if (
      elementRef.current &&
      !elementRef.current.contains(e.target as Node) &&
      !(e.target as HTMLButtonElement).closest('.button') &&
      anyFunctions
    ) {
      anyFunctions();
    }
  };

  useEventListener({
    event: 'mousedown',
    eventHandler: (e: EventType) => {
      handleOuterClick(e);
    },
  });

  return null;
};

export default useDetectOuterClick;
