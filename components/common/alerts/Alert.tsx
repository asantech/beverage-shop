interface AlertProps {
  role?: 'alert';
  msgs: string;
}

function Alert(props: AlertProps) {
  const { role = 'alert', msgs } = props;
  return (
    <div className='alert alert-danger mt-5' role={role}>
      <div className='h4'>{msgs}</div>
    </div>
  );
}

export default Alert;
