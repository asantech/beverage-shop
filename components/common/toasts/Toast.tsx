import { useState, useEffect } from 'react';

import Btn from '../buttons/Button';

interface ToastProps {
  role?: 'alert' | 'success';
  msgs: string;
}

function Toast(props: ToastProps) {
  const { role = 'alert', msgs } = props;
  const [isShown, setIsShown] = useState(true);
  let setTimeoutID: any;

  const toastBGColorClassName = role === 'alert' ? ' bg-danger' : ' bg-success';

  // useEffect(() => {
  //   setTimeoutID = setTimeout(() => {
  //     delToastHandler();
  //   }, 5000);
  // }, []);

  function delToastHandler() {
    clearTimeout(setTimeoutID);
    setIsShown(false);
  }
  if (!isShown) return <></>;

  return (
    <div
      className='toast show text-white'
      role={role}
      aria-live='assertive'
      aria-atomic='true'
    >
      <div className={'toast-header text-white' + toastBGColorClassName}>
        <strong className='me-auto'>{role}</strong>
        <small>just now</small>
        <Btn
          className='btn-close bg-white text-white'
          data-bs-dismiss='toast'
          aria-label='Close'
          onClickHandler={delToastHandler}
        />
      </div>
      <div className={'toast-body' + toastBGColorClassName}>
        <span>{msgs}</span>
      </div>
    </div>
  );
}

export default Toast;
