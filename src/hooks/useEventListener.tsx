import { useEffect } from 'react';

type EventType = KeyboardEvent | MouseEvent;
type EventTypeString = 'keydown' | 'click' | 'mousedown';

interface useEventListenerProps {
  event: EventTypeString;
  eventHandler: (e: EventType) => void;
  dependencies?: object[];
}

const useEventListener = ({
  event,
  eventHandler,
  dependencies,
}: useEventListenerProps) => {
  useEffect(() => {
    const handler = (e: EventType) => {
      eventHandler(e);
    };

    document.addEventListener(event, handler);

    return () => {
      document.removeEventListener(event, handler);
    };
  }, [dependencies, event, eventHandler]);

  return null;
};

export { useEventListener, type EventType };
