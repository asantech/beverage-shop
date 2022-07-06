function FavoriteIcon(props: any) {
  return (
    <i
      className={
        (props.filled ? 'bi-star-filled' : 'bi-star') + ' text-warning'
      }
    ></i>
  );
}

export default FavoriteIcon;
