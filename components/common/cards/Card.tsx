import Image from 'next/image';
import { useState } from 'react';
import { pick } from 'lodash';

import SwitchableIcon from 'components/common/icons/SwitchableIcon';
import * as favoriteActions from 'store/entities/favorites/favorites.slice';
import * as cartActions from 'store/entities/cart/cart.slice';

import * as rootElementsHelpers from 'utils/helpers/rootElements.helpers';

import ProductInfoModal from 'components/common/modals/ProductInfoModal';

import styles from './Card.module.scss';

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
  const { id, image_url, name, description, abv, addiClassName } = props;

  const productDetails = pick(props, [
    'id',
    'name',
    'tagline',
    'abv',
    'description',
    'srm',
    'image_url',
  ]);

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
      <ProductInfoModal
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
      className={styles['card'] + ' card ' + addiClassName ?? ''}
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

      <div className='card-body px-0'>
        <div className={styles['img-container'] + ' text-center mb-3'}>
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
              className={
                styles['empty-img-placeholder'] +
                ' bg-light text-muted rounded-3 d-flex justify-content-center align-items-center mb-3'
              }
            >
              no image
            </div>
          )}
        </div>
        <h5
          className={
            `${styles['card-title']} ${styles['lines-limited']}` +
            ' card-title h6 fw-bold mb-1'
          }
        >
          {name}-<span className='fw-light text-muted'>({abv})</span>
        </h5>
        <p
          className={
            `${styles['card-text']} ${styles['lines-limited']}` + ' card-text'
          }
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default Card;
