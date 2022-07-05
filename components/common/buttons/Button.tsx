export type Btn = {
  id?: string;
  className?: string;
  onClickHandler?: any;
  disabled?: true | false;
  role?: string;
  children: any;
};

function Btn(props: Btn) {
  const { id, className, onClickHandler, disabled, role, children } = props;
  return (
    <button
      // {...props}
      id={id}
      type='button'
      className={className ?? ''}
      role={role ?? 'button'}
      disabled={disabled ?? false}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
}

export default Btn;
