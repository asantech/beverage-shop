type ImgBox = {
  src: string;
  addiClassName?: string;
  imgClassName?: string;
  alt: string;
  style?: any;
};

function ImgBox(props: ImgBox) {
  const { style, src, addiClassName, imgClassName, alt } = props;
  return (
    <div className={'img-box ' + (addiClassName ?? '')} style={style}>
      <img src={src} className={imgClassName} alt={alt}></img>
    </div>
  );
}

export default ImgBox;
