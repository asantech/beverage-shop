import { useSelector } from 'react-redux';
import * as beverageActions from './../../../store/entities/beverages/beverages.slice';

import Btn from '../../common/buttons/Button';
import SortIcon from './SortIcon';

function SortBar(props: any) {
  const { currentTabID, lists } = useSelector((state: any) => state.beverages);
  const { by, order } = props.sort;

  function changeSortHandler(sortBy: 'name' | 'abv') {
    const currentListSortOrder = lists[currentTabID].sort.order;
    const isSortByBtnClicked = by === sortBy;
    const newSortOrder = isSortByBtnClicked
      ? currentListSortOrder === 'asc'
        ? 'desc'
        : 'asc'
      : currentListSortOrder;

    beverageActions.setSort({
      id: currentTabID,
      sort: {
        by: sortBy,
        order: newSortOrder,
      },
    });

    beverageActions.setData({
      id: currentTabID,
      list: lists[currentTabID].list,
      page: lists[currentTabID].page,
    });
  }

  return (
    <div className='d-flex position-absolute end-0'>
      <Btn
        className='btn btn-light d-flex mx-2'
        onClickHandler={() => changeSortHandler('name')}
      >
        name
        {by === 'name' && <SortIcon order={order} />}
      </Btn>
      <Btn
        className='btn btn-light d-flex mx-2'
        onClickHandler={() => changeSortHandler('abv')}
      >
        abv
        {by === 'abv' && <SortIcon order={order} />}
      </Btn>
    </div>
  );
}

export default SortBar;
