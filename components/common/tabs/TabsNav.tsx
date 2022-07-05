import Button from '../buttons/Button';

import { useSelector } from 'react-redux';

import SortBar from './../../sorting/SortBar/SortBar';

function TabsNav(props: any) {
  const { currentTabID, lists } = useSelector((state: any) => state.beverages);

  function tabItemOnClickHandler({ id, lbl, path }: any) {
    props.navItemOnClickHandler({ id, lbl, path });
  }

  return (
    <ul className='nav nav-tabs justify-content-center position-relative'>
      {props.links.map(({ id, lbl, path }: any) => (
        <li key={path} className='nav-item'>
          {currentTabID === id && <SortBar sort={lists[currentTabID].sort} />}
          <Button
            id={id + '-tab'}
            className={'nav-link' + (currentTabID === id ? ' active' : '')}
            onClickHandler={() => {
              tabItemOnClickHandler({ id, lbl, path });
            }}
            role='tab'
            data-bs-toggle='tab'
            data-bs-target={'#' + id}
            aria-controls={id}
            aria-selected='true'
          >
            {lbl}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default TabsNav;
