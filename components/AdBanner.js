import React from 'react';

export default function AdBanner({ adKey, width, height, className = '', style = {} }) {
  if (!adKey) return null;

  return (
    <div className={`ad-container ${className}`} style={{ display: 'flex', justifyContent: 'center', width: '100%', ...style }}>
      <iframe
        src={`/ad.html?key=${adKey}&width=${width}&height=${height}`}
        width={width}
        height={height}
        frameBorder="0"
        scrolling="no"
        title={`Ad-${width}x${height}`}
        style={{ maxWidth: '100%', overflow: 'hidden' }}
      />
    </div>
  );
}
