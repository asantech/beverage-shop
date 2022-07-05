function OverlayedSpinner() {
  return (
    <div
      className='d-flex justify-content-center align-items-center position-absolute top-0 start-0 w-100 h-100'
      style={{ backgroundColor: 'rgba(255,255,255,0.5)', zIndex: 10 }}
    >
      <div className='spinner-border text-primary' role='status'></div>
    </div>
  );
}

export default OverlayedSpinner;
