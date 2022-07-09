import { useState, useRef, useEffect } from 'react';

import Btn from './../../common/buttons/Button';

import styles from './ExpandableDescBox.module.scss';

interface ExpandableDescBoxProps {
  txt: string;
}

function ExpandableDescBox(props: ExpandableDescBoxProps) {
  const txtRef: any = useRef(null);

  const [isExpandable, setIsExpandable] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleCollapseStateHandler() {
    setIsExpanded(!isExpanded);
  }

  useEffect(() => {
    setIsExpandable(txtRef.current.offsetHeight > 100);
  }, []);

  return (
    <div
      className={
        styles['expandable-desc-box'] +
        (isExpanded ? ` ${styles['expanded']}` : '') +
        ' position-relative'
      }
    >
      <div ref={txtRef} className={'txt' + (isExpanded ? ' pb-4' : '')}>
        {props.txt}
      </div>
      {isExpandable && (
        <>
          {!isExpanded && (
            <>
              <Btn
                className={
                  styles['expand-btn'] +
                  ' btn btn-sm btn-light position-absolute'
                }
                onClickHandler={toggleCollapseStateHandler}
              >
                <i className='bi bi-caret-down-fill'></i>
              </Btn>
              <div
                className={
                  styles['blurred-overlay'] +
                  ' position-absolute bottom-0 container-fluid'
                }
              ></div>
            </>
          )}
          {isExpanded && (
            <Btn
              className={
                styles['collapse-btn'] +
                ' btn btn-sm btn-light position-absolute'
              }
              onClickHandler={toggleCollapseStateHandler}
            >
              <i className='bi bi-caret-up-fill'></i>
            </Btn>
          )}
        </>
      )}
    </div>
  );
}

export default ExpandableDescBox;
