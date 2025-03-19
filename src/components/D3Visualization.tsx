
import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

interface D3VisualizationProps {
  height: number;
}

const D3Visualization: React.FC<D3VisualizationProps> = ({ height }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Ensure we're loading the D3 visualization correctly
    if (iframeRef.current) {
      // Use GitHub Pages URL for the D3 visualization
      iframeRef.current.src = 'https://dev-edzola.github.io/D3js-/';
    }
  }, []);

  return (
    <Card className="h-full overflow-hidden">
      <div className="h-full w-full">
        <iframe
          ref={iframeRef}
          title="D3 Visualization"
          frameBorder="0"
          width="100%"
          height={height}
          style={{ border: 'none', overflow: 'hidden' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </Card>
  );
};

export default D3Visualization;
