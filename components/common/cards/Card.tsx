import Image from 'next/image';

import * as beverageInfoActions from './../../../store/entities/beverages/beverageInfo.slice';

export type CardDetails = {
  id: string;
  image_url: string;
  addiClassName?: string;
  name: string;
  tagline: string;
};

function Card(props: CardDetails) {
  const { id, image_url, name, tagline, addiClassName, abv } = props;

  function cardOnClickHandler() {
    beverageInfoActions.setData({
      name,
      tagline,
      abv,
    });
    beverageInfoActions.showModal();
  }

  return (
    <div
      id={id}
      className={'card ' + addiClassName ?? ''}
      style={{ width: '200px' }}
      onClick={cardOnClickHandler}
    >
      {image_url && (
        <Image
          src={image_url}
          alt={name}
          width={100}
          height={150}
          // blurDataURL="data:..." automatically provided
          // placeholder="blur" // Optional blur-up while loading
        />
      )}
      <div className='card-body'>
        <h5 className='card-title'>{name}</h5>
        <p className='card-text'>{tagline}</p>
      </div>
    </div>
  );
}

export default Card;
