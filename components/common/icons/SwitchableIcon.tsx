interface SwitchableIconProps {
  isFilled: boolean;
  classNames: {
    addi?: string;
    filled: string;
    unfilled: string;
    color?: string;
  };
}

function SwitchableIcon(props: SwitchableIconProps) {
  const { isFilled, classNames } = props;
  const { addi = '', filled, unfilled, color = '' } = classNames;
  return (
    <i
      className={
        (isFilled ? `${filled}` : `${unfilled}`) + ` ${color}` + ` ${addi}`
      }
    ></i>
  );
}

export default SwitchableIcon;
