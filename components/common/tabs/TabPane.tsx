import { useSelector } from 'react-redux';
import OverlayedSpinner from '../spinners/OverlayedSpinner';

import * as itemsHelpers from '../../../utils/helpers/items.helpers';

import type { CardDetails } from '../cards/Card';
import Card from '../cards/Card';

function TabPane(props: any) {
  const { id: tabID } = props.tab;
  const { loading } = useSelector((state: any) => state.req);
  const beverages = useSelector((state: any) => state.beverages);
  const { categories: productCategories, currentTabID } = beverages;

  const hasCurrentListItems = itemsHelpers.hasListItems(
    productCategories,
    currentTabID
  );

  return (
    <div
      className={
        'tab-pane fade pt-4 px-5 pb-4' +
        (currentTabID === tabID
          ? ' show active d-flex flex-wrap justify-content-center'
          : '')
      }
      id={tabID}
      role='tabpanel'
      aria-labelledby={tabID + '-tab'}
    >
      {loading && <OverlayedSpinner />}
      {tabID === currentTabID && !loading && !hasCurrentListItems && (
        <div className='alert alert-danger mt-5' role='alert'>
          <div className='h4'>no beverages to load...</div>
        </div>
      )}
      {tabID === currentTabID &&
        hasCurrentListItems &&
        productCategories[currentTabID].list.map((itemDetails: CardDetails) => (
          <Card
            key={itemDetails.id}
            addiClassName='mx-2 mb-2 p-2'
            {...itemDetails}
            id={'beverage-details-card-' + itemDetails.id} // todo: check the order later
          />
        ))}
    </div>
  );
}

export default TabPane;
