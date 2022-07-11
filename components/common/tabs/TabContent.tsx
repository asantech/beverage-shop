import TabPane from './TabPane';

import styles from './TabContent.module.scss';

function TabContent(props: any) {
  const { tabs } = props;
  return (
    <div
      className={styles['tab-content'] + ' tab-content position-relative mb-3'}
    >
      {tabs.map((tab: any, i: number) => (
        <TabPane key={i} tab={tab}></TabPane>
      ))}
    </div>
  );
}

export default TabContent;
