import React, {useEffect} from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'forest',
});

const Mermaid = (props: {
  chart:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  return <div className="mermaid my-4">{props.chart}</div>;
};

export default Mermaid;
