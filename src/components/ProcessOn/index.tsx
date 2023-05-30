import React from 'react';

import './index.scss';

const ProcessOn = ({
  id = '',
}) => {

  return (
    <iframe
      className='process-on'
      title={`processOn-${id}`}
      src={`https://v3.processon.com/embed/${id}`}
      allowFullScreen
    ></iframe>
  )

}

export default ProcessOn;