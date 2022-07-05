import Image from 'next/image';

import * as beverageInfoActions from './../../../store/entities/beverages/beverageInfo.slice';

export type CardDetails = {
  id: string;
  image_url: string;
  addiClassName?: string;
  name: string;
  tagline: string;
  abv: number;
  description: string;
  srm: number;
};

function Card(props: CardDetails) {
  const { id, image_url, name, tagline, abv, description, srm, addiClassName } =
    props;

  function cardOnClickHandler() {
    beverageInfoActions.setData({
      imgURL: image_url,
      details: {
        name,
        tagline,
        abv,
        description,
        srm,
      },
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
      <div className='d-flex'>
        <i className='bi-star text-warning'></i>
        <i className='bi-cart ms-auto text-success'></i>
      </div>

      <div className='card-body text-center px-0'>
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
        <h5 className='card-title h5'>
          {name}-<span className='h6 text-muted'>({abv})</span>
        </h5>
        <p className='card-text'>{tagline}</p>
      </div>
    </div>
  );
}

export default Card;
