import React from 'react';
import { times } from 'lodash';

const DottedSpinner = (props: any) => {
  const { dotCount = 3 } = props;
  return (
    <div className='d-flex justify-content-center align-items-center position-absolute top-0 start-0 w-100 h-100'>
      {times(dotCount).map((_: number, i: number) => (
        <div
          key={i}
          className='spinner-grow spinner-grow-md text-primary mx-2'
          role='status'
        ></div>
      ))}
    </div>
  );
};

export default DottedSpinner;
