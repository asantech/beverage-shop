import { useRef, useState } from 'react';
import { map, pick } from 'lodash';

import Image from 'next/image';
import Btn from 'components/common/buttons/Button';
import ExpandableDescBox from 'components/custom/expandableDescBox/ExpandableDescBox';
import Toast from 'components/common/toasts/Toast';

import * as favoriteActions from 'store/entities/favorites/favorites.slice';
import * as cartActions from 'store/entities/cart/cart.slice';

import * as rootElementsHelpers from 'utils/helpers/rootElements.helpers';
import msgsConstants from 'utils/constants/msgs.constants';

function ItemInfoModal(props: any) {
  const modalRef: any = useRef();

  const { data, setIsFavoriteState, setIsInCartState } = props;
  const { details } = data;

  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  const [isInCart, setIsInCart] = useState(props.isInCart);

  const [showModal, setShowModal] = useState(true);

  function closeBtnOnClickHandler() {
    setShowModal(false);
  }

  function addToFavoriteBtnOnClickHandler() {
    favoriteActions.add(details);
    const isFavorite = favoriteActions.isFavorite({ id: details.id });
    setIsFavorite(isFavorite);
    setIsFavoriteState(isFavorite);
    rootElementsHelpers
      .getRootElement('toastsContainer')
      .render(<Toast role='success' msgs={msgsConstants.favorites.added} />);
  }

  function delFromFavoriteBtnOnClickHandler() {
    favoriteActions.del(details);
    const isFavorite = favoriteActions.isFavorite({ id: details.id });
    setIsFavorite(isFavorite);
    setIsFavoriteState(isFavorite);
    rootElementsHelpers
      .getRootElement('toastsContainer')
      .render(<Toast role='success' msgs={msgsConstants.favorites.removed} />);
  }

  function addToCartBtnOnClickHandler() {
    cartActions.add(details);
    const isInCart = cartActions.isInCart({ id: details.id });
    setIsInCart(isInCart);
    setIsInCartState(isInCart);
    rootElementsHelpers
      .getRootElement('toastsContainer')
      .render(<Toast role='success' msgs={msgsConstants.cart.added} />);
  }

  function delFromCartBtnOnClickHandler() {
    cartActions.del(details);
    const isInCart = cartActions.isInCart({ id: details.id });
    setIsInCart(isInCart);
    setIsInCartState(isInCart);
    rootElementsHelpers
      .getRootElement('toastsContainer')
      .render(<Toast role='success' msgs={msgsConstants.cart.removed} />);
  }

  const pickedDetails = pick(details, [
    'name',
    'tagline',
    'abv',
    'description',
    'srm',
  ]);

  const favoriteBtn = !isFavorite ? (
    <Btn
      id='add-to-favorites-btn'
      className='btn btn-primary'
      onClickHandler={addToFavoriteBtnOnClickHandler}
    >
      <i className='bi-star-fill'></i>
    </Btn>
  ) : (
    <Btn
      id='remove-from-favorites-btn'
      className='btn btn-danger'
      onClickHandler={delFromFavoriteBtnOnClickHandler}
    >
      <i className='bi-star-fill'></i>
    </Btn>
  );

  const cartBtn = !isInCart ? (
    <Btn
      id='add-to-cart-btn'
      className='btn btn-success'
      onClickHandler={addToCartBtnOnClickHandler}
    >
      <i className='bi-cart-plus-fill'></i>
    </Btn>
  ) : (
    <Btn
      id='remove-from-cart-btn'
      className='btn btn-danger'
      onClickHandler={delFromCartBtnOnClickHandler}
    >
      <i className='bi-cart-plus-fill'></i>
    </Btn>
  );

  if (showModal === false) return <></>;

  return (
    <>
      <div
        ref={modalRef}
        className='modal fade show'
        id='item-info-modal'
        aria-labelledby='item-info-modal-lbl'
        tabIndex={-1} // todo: search what is it for
        aria-modal={true}
        style={{ display: 'block' }}
        onClick={(e: any) =>
          e.target === modalRef.current && closeBtnOnClickHandler()
        }
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='item-info-modal-lbl'>
                Beverage Info Modal
              </h5>
              <Btn
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClickHandler={closeBtnOnClickHandler}
              />
            </div>
            <div className='modal-body'>
              <div className='img-container text-center mb-3'>
                {details.image_url && (
                  <Image
                    src={details.image_url} // todo: use placeholder & other nessecary configs
                    alt={details.name}
                    width={100}
                    height={150}
                  />
                )}
              </div>
              {map(pickedDetails, (detail: any, i: string) =>
                i !== 'description' ? (
                  <p key={i} className='mb-1'>
                    <span className='fw-bold'>{i === 'srm' ? 'price' : i}</span>{' '}
                    : {detail}
                  </p>
                ) : (
                  <ExpandableDescBox key={i} txt={detail} />
                )
              )}
            </div>
            <div className='modal-footer'>
              {favoriteBtn}
              {cartBtn}
            </div>
          </div>
        </div>
      </div>
      <div
        className='modal-backdrop fade show'
        onClick={closeBtnOnClickHandler}
      ></div>
    </>
  );
}

export default ItemInfoModal;
