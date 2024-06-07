import { useState, useEffect, useRef } from 'react';

const useVirtualScroll = ({ itemCount, itemHeight, buffer = 5 }) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const containerRef = useRef(null);

  const viewportHeight = 250;
  const itemsInView = Math.ceil(viewportHeight / itemHeight);

  const handleScroll = (e) => {
    setScrollOffset(e.currentTarget.scrollTop);
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const startIndex = Math.max(0, Math.floor(scrollOffset / itemHeight) - buffer);
  const endIndex = Math.min(itemCount, startIndex + itemsInView + buffer * 2);

  return { containerRef, startIndex, endIndex };
};

export default useVirtualScroll;
