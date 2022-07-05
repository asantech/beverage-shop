import { useSelector } from 'react-redux';

import { map } from 'lodash';

import * as beverageInfoActions from './../../../store/entities/beverages/beverageInfo.slice';

function ItemInfoModal() {
  const { showModal, details } = useSelector(
    (state: any) => state.beverageInfo
  );

  function closeBtnOnClickHandler() {
    beverageInfoActions.hideModal();
    beverageInfoActions.removeData();
  }

  return (
    <div
      className={'modal fade' + (showModal ? ' show' : '')}
      id='exampleModal'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
      style={showModal ? { display: 'block' } : {}}
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Beverage Info Modal
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={closeBtnOnClickHandler}
            ></button>
          </div>
          <div className='modal-body'>
            {details &&
              map(details, (detail: any, i: number) => (
                <p>
                  {i} : {detail}
                </p>
              ))}
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Add To Favourites
            </button>
            <button type='button' className='btn btn-primary'>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemInfoModal;
