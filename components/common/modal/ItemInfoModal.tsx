import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { map } from 'lodash';

import Image from 'next/image';
import Btn from '../buttons/Button';

import * as beverageInfoActions from './../../../store/entities/beverages/beverageInfo.slice';

import * as favoriteActions from './../../../store/entities/favorites/favorites.slice';

function ItemInfoModal() {
  const modalRef: any = useRef();

  const { showModal, data } = useSelector((state: any) => state.beverageInfo);
  const { imgURL, details } = data;

  const [isFavorite, setIsFavorite] = useState(
    details && favoriteActions.isFavorite({ id: details.id })
  );

  function ResetModal() {
    setIsFavorite(false);
  }

  function closeBtnOnClickHandler() {
    beverageInfoActions.hideModal();
    beverageInfoActions.removeData();
    ResetModal();
  }

  function addToFavoriteBtnOnClickHandler() {
    favoriteActions.add(details);
    setIsFavorite(favoriteActions.isFavorite({ id: details.id }));
  }

  return (
    // todo: use portal
    <>
      <div
        ref={modalRef}
        className={'modal fade' + (showModal ? ' show' : '')}
        id='item-info-modal'
        aria-labelledby='item-info-modal-lbl'
        tabIndex={-1} // todo: search what is it for
        {...(showModal ? { 'aria-modal': true } : { 'aria-hidden': true })}
        style={{ display: showModal ? 'block' : 'none' }}
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
                {imgURL && (
                  <Image
                    src={imgURL}
                    alt={details.name}
                    width={100}
                    height={150}
                  />
                )}
              </div>
              {details &&
                map(details, (detail: any, i: number) => (
                  <p key={i} className='mb-1'>
                    <span className='fw-bold'>{i}</span> : {detail}
                  </p>
                ))}
            </div>
            <div className='modal-footer'>
              {!isFavorite ? (
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
                  onClickHandler={addToFavoriteBtnOnClickHandler}
                >
                  <i className='bi-star-fill'></i>
                </Btn>
              )}
              <Btn id='add-to-cart-btn' className='btn btn-success'>
                <i className='bi-cart-plus-fill'></i>
              </Btn>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className='modal-backdrop fade show'
          onClick={closeBtnOnClickHandler}
        ></div>
      )}
    </>
  );
}

export default ItemInfoModal;
