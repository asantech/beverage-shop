import { useSelector } from 'react-redux';

import Head from 'next/head';
import Card from '../components/common/cards/Card';

function Cart() {
  const cartList = useSelector((state: any) => state.cart.list);
  const hasCurrentListItems = !(cartList.length === 0);

  return (
    <div>
      <Head>
        <title>Cart</title>
      </Head>
      <h1>Cart</h1>
      <div className='d-flex flex-wrap justify-content-center'>
        {!hasCurrentListItems && (
          <div className='alert alert-danger mt-5' role='alert'>
            <div className='h4'>no beverages in cart...</div>
          </div>
        )}
        {hasCurrentListItems &&
          cartList.map(
            (
              itemDetails: any // todo: set the type later on
            ) => (
              <Card
                key={itemDetails.id}
                addiClassName='mx-2 mb-2 p-2'
                {...itemDetails}
                id={itemDetails.id} // todo: check the order later
              />
            )
          )}
      </div>
    </div>
  );
}

export default Cart;
