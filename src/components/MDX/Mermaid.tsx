import React, {useEffect} from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'forest',
});

const Mermaid = ({chart}) => {
  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  return <div className="mermaid my-4">{chart}</div>;
};

export default Mermaid;
