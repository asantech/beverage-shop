import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import type { CardDetails } from '../cards/Card';

import Card from 'components/common/cards/Card';
import Alert from 'components/common/alerts/Alert';

let isInitialLoad: boolean = true;

function TabPane(props: any) {
  const { id: tabID } = props.tab;

  const { categories: productCategories, currentTabID } = useSelector(
    (state: any) => state.products
  );
  const productsList = productCategories[currentTabID].list;
  const isCurrentTab: boolean = tabID === currentTabID;

  const isListItemsEmpty: boolean = isEmpty(productsList);

  useEffect(() => {
    isInitialLoad = false;
  }, []);

  return (
    <div
      className={
        'tab-pane fade p-4' +
        (currentTabID === tabID
          ? ' show active d-flex flex-wrap justify-content-center'
          : '')
      }
      id={tabID}
      role='tabpanel'
      aria-labelledby={tabID + '-tab'}
    >
      {isCurrentTab &&
        !isInitialLoad &&
        isListItemsEmpty && ( // get alert msg from consts file
          <Alert msgs='no beverages to load...' />
        )}
      {isCurrentTab &&
        !isListItemsEmpty &&
        productsList.map((productDetails: CardDetails) => (
          <Card
            key={productDetails.id}
            addiClassName='mx-2 mb-2 p-2'
            {...productDetails}
          />
        ))}
    </div>
  );
}

export default TabPane;
