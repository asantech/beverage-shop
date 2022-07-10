import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import Head from 'next/head';
import Card from '../components/common/cards/Card';
import Alert from '../components/common/alerts/Alert';

import msgsConstants from '../utils/constants/msgs.constants';

function Cart() {
  const cartList = useSelector((state: any) => state.cart.list);
  const isCartEmpty: boolean = isEmpty(cartList);

  const totalPrice = cartList.reduce((prevVal: any, currentVal: any) => {
    return (prevVal ?? 0) + (currentVal ? currentVal.srm : 0);
  }, 0);

  return (
    <div>
      <Head>
        <title>Cart</title>
      </Head>
      <h1>
        Cart <span className='h4'>( Total Price: {totalPrice} )</span>
      </h1>
      <div className='d-flex flex-wrap justify-content-center align-items-start const-height-container'>
        {isCartEmpty && <Alert msgs={msgsConstants.cart.isEmpty} />}
        {!isCartEmpty &&
          cartList.map(
            (
              itemDetails: any // todo: set the type later on
            ) => (
              <Card
                key={itemDetails.id}
                addiClassName='mx-2 mb-2 p-2'
                {...itemDetails}
              />
            )
          )}
      </div>
    </div>
  );
}

export default Cart;
