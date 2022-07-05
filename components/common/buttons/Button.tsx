export type Btn = {
  id?: string;
  className?: string;
  onClickHandler?: any;
  disabled?: true | false;
  role?: string;
  children?: any;
};

function Btn(props: Btn) {
  const { id, className, role, disabled, onClickHandler, children, ...rest } =
    props;
  return (
    <button
      id={id}
      type='button'
      className={className ?? ''}
      role={role ?? 'button'}
      disabled={disabled ?? false}
      onClick={onClickHandler}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Btn;
