import Button from '../buttons/Button';

import { useSelector } from 'react-redux';

function TabsNav(props: any) {
  const currentTabID = useSelector(
    (state: any) => state.beverages.currentTabID
  );

  function tabItemOnClickHandler({ id, lbl, path }:any) {
    props.navItemOnClickHandler({ id, lbl, path });
  }

  return (
    <ul className='nav nav-tabs justify-content-center'>
      {props.links.map(({ id, lbl, path }: any) => (
        <li key={path} className='nav-item'>
          <Button
            id={id + '-tab'}
            className={'nav-link' + (currentTabID === id ? ' active' : '')}
            role='tab'
            data-bs-toggle='tab'
            data-bs-target={'#' + id}
            aria-controls={id}
            aria-selected='true'
            onClickHandler={() => {
              tabItemOnClickHandler({ id, lbl, path });
            }}
          >
            {lbl}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default TabsNav;
