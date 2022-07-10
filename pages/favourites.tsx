import { useSelector } from 'react-redux';

import Head from 'next/head';
import Card from '../components/common/cards/Card';
import Alert from '../components/common/alerts/Alert';
import msgsConstants from '../utils/constants/msgs.constants';

function Favourites() {
  const favoritesList = useSelector((state: any) => state.favorites.list);
  const hasCurrentListItems = !(favoritesList.length === 0);

  return (
    <div>
      <Head>
        <title>Favourites</title>
      </Head>
      <h1>Favourites</h1>
      <div className='d-flex flex-wrap justify-content-center align-items-start const-height-container'>
        {!hasCurrentListItems && (
          <Alert msgs={msgsConstants.favorites.isEmpty} />
        )}
        {hasCurrentListItems &&
          favoritesList.map(
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

export default Favourites;
