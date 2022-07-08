import Image from 'next/image';
import { useState } from 'react';

import SwitchableIcon from '../icons/SwitchableIcon';
import * as favoriteActions from './../../../store/entities/favorites/favorites.slice';
import * as cartActions from './../../../store/entities/cart/cart.slice';

import * as rootElementsHelpers from './../../../utils/helpers/rootElements.helpers';

import ItemInfoModal from '../modal/ItemInfoModal';

export type CardDetails = {
  addiClassName?: string;
  id: string;
  image_url: string;
  name: string;
  tagline: string;
  abv: number;
  description: string;
  srm: number;
};

function Card(props: CardDetails) {
  const { id, image_url, name, tagline, abv, description, srm, addiClassName } =
    props;

  const productDetails = {
    id,
    name,
    tagline,
    abv,
    description,
    srm,
    image_url,
  };

  const [isFavorite, setIsFavorite] = useState(
    favoriteActions.isFavorite({ id })
  );

  const [isInCart, setIsInCart] = useState(cartActions.isInCart({ id }));

  const setIsFavoriteState = (state: any) => {
    setIsFavorite(state);
  };

  const setIsInCartState = (state: any) => {
    setIsInCart(state);
  };

  function cardOnClickHandler() {
    rootElementsHelpers.getRootElement('modalsContainer').render(
      <ItemInfoModal
        data={{
          details: productDetails,
        }}
        isFavorite={isFavorite}
        isInCart={isInCart}
        setIsFavoriteState={setIsFavoriteState}
        setIsInCartState={setIsInCartState}
      />
    );
  }

  return (
    <div
      id={id}
      className={'card ' + addiClassName ?? ''}
      style={{ width: '200px' }}
      onClick={cardOnClickHandler}
    >
      <div className='d-flex'>
        <SwitchableIcon
          isFilled={isFavorite}
          classNames={{
            filled: 'bi-star-fill',
            unfilled: 'bi-star',
            color: 'text-warning',
          }}
        />
        <SwitchableIcon
          isFilled={isInCart}
          classNames={{
            addi: 'ms-auto',
            filled: 'bi-cart-fill',
            unfilled: 'bi-cart',
            color: 'text-success',
          }}
        />
      </div>

      <div className='card-body text-center px-0'>
        <div className='img-container' style={{ minHeight: '150px' }}>
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
          {!image_url && (
            <div
              className='empty-img-placeholder bg-light text-muted rounded-3 d-flex justify-content-center align-items-center'
              style={{ height: '150px' }}
            >
              no image
            </div>
          )}
        </div>
        <h5 className='card-title h5'>
          {name}-<span className='h6 text-muted'>({abv})</span>
        </h5>
        <p className='card-text'>{tagline}</p>
      </div>
    </div>
  );
}

export default Card;
