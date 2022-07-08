import { useSelector } from 'react-redux';

import Head from 'next/head';
import Card from '../components/common/cards/Card';
import Alert from '../components/common/alerts/Alert';

import { isEmpty } from 'lodash';

function Cart() {
  const cartList = useSelector((state: any) => state.cart.list);
  const isCartEmpty: boolean = isEmpty(cartList);

  return (
    // todo: get from the page settings cont obj
    <div>
      <Head>
        <title>Cart</title>
      </Head>
      <h1>Cart</h1>
      <div className='d-flex flex-wrap justify-content-center'>
        {isCartEmpty && <Alert msgs='no products in cart...' />}
        {!isCartEmpty && // todo: get the alert msg (up there) from the consts file
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
