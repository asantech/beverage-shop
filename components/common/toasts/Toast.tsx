import { useState, useEffect } from 'react';

import Btn from 'components/common/buttons/Button';

interface ToastProps {
  role?: 'alert' | 'success';
  msgs: string;
}

function Toast(props: ToastProps) {
  const { role = 'alert', msgs } = props;
  const [isShown, setIsShown] = useState(true);
  let setTimeoutID: any;

  const toastColorClassName = role === 'alert' ? 'danger' : 'success';

  useEffect(() => {
    // todo: check later
    setTimeoutID = setTimeout(() => {
      hideToastHandler();
    }, 3000);
  }, []);

  function hideToastHandler() {
    clearTimeout(setTimeoutID);
    setIsShown(false);
  }

  return (
    <div
      className={'toast text-white' + (isShown ? ' show' : ' hide')}
      role={role}
      aria-live='assertive'
      aria-atomic='true'
    >
      <div
        className={
          'toast-header text-white bg-gradient' +
          ` bg-${toastColorClassName} border-${toastColorClassName}`
        }
      >
        <strong className='me-auto'>{role}</strong>
        <small>just now</small>
        <Btn
          className='btn-close btn-close-white'
          data-bs-dismiss='toast'
          aria-label='Close'
          onClickHandler={hideToastHandler}
        />
      </div>
      <div className={'toast-body bg-gradient' + ` bg-${toastColorClassName}`}>
        <span>{msgs}</span>
      </div>
    </div>
  );
}

export default Toast;
