import TabPane from './TabPane';
import DottedSpinner from 'components/common/spinners/DottedSpinner';

import styles from './TabContent.module.scss';

function TabContent(props: any) {
  const { showSpinner, tabs } = props;
  return (
    <div
      className={styles['tab-content'] + ' tab-content position-relative mb-3'}
    >
      {showSpinner && <DottedSpinner />}
      {!showSpinner &&
        tabs.map((tab: any, i: number) => (
          <TabPane key={i} tab={tab}></TabPane>
        ))}
    </div>
  );
}

export default TabContent;
