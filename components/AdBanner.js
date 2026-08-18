import { useEffect, useRef, useState } from 'react';

export default function AdBanner({ adKey, width, height, className = '', style = {}, lazy = false }) {
  const [visible, setVisible] = useState(!lazy);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!lazy || visible) return
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [lazy, visible])

  if (!adKey) return null;

  return (
    <div
      ref={containerRef}
      className={`ad-container ${className}`}
      style={{ display: 'flex', justifyContent: 'center', width: '100%', minHeight: visible ? undefined : height, ...style }}
    >
      {visible && (
        <iframe
          src={`/ad.html?key=${adKey}&width=${width}&height=${height}`}
          width={width}
          height={height}
          frameBorder="0"
          scrolling="no"
          title={`Ad-${width}x${height}`}
          style={{ maxWidth: '100%', overflow: 'hidden' }}
        />
      )}
    </div>
  );
}
