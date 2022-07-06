import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import TabsNav from '../components/common/tabs/TabsNav';
import TabContent from '../components/common/tabs/TabContent';
import Pagination from '../components/layout/navigation/pagination/Pagination';

import { useSelector } from 'react-redux';

import * as beverageActions from '../store/entities/beverages/beverages.slice';

import * as beverageConsts from '../utils/constants/beverages.constants';

import * as itemsHelpers from '../utils/helpers/items.helpers';
import * as expirationHelpers from '../utils/helpers/expiration.helpers.tsx';

interface BeverageSliceData {
  currentTabID: string;
  categories: any;
}

const Home: NextPage = () => {
  const router = useRouter();

  const { currentTabID, categories: productCategories }: BeverageSliceData =
    useSelector((state: any) => state.beverages);

  const currentPage = itemsHelpers.getCurrentPage(
    productCategories,
    currentTabID
  );

  useEffect(() => {
    if (
      currentTabID === '' ||
      currentTabID === 'pizza' ||
      currentTabID === 'steak'
    ) {
      beverageActions.setCurrentTab({
        id: currentTabID,
      });

      (async () => {
        let result = await beverageActions.loadData({
          tabID: currentTabID,
          page: currentPage,
        });
        beverageActions.setData({
          id: currentTabID,
          list: result,
          page: currentPage,
          sort: productCategories[currentTabID].sort,
        });
      })();

      expirationHelpers.initializeExpirableDataToStorage('favorites');
      expirationHelpers.initializeExpirableDataToStorage('cart');
    } else {
      router.push('404');
    }
  }, []);

  async function onNavItemClickHandler(params: any) {
    const { id: currentTabID } = params;
    const currentPage = itemsHelpers.getCurrentPage(
      productCategories,
      currentTabID
    );
    beverageActions.setCurrentTab({
      id: currentTabID,
    });

    let result = await beverageActions.loadData({
      tabID: currentTabID,
      page: currentPage,
    });

    beverageActions.setData({
      id: currentTabID,
      list: result,
      page: currentPage,
      sort: productCategories[currentTabID].sort,
    });
  }

  const hasCurrentListItems = itemsHelpers.hasListItems(
    productCategories,
    currentTabID
  );

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <TabsNav
        links={beverageConsts.beveragesNavLinks}
        navItemOnClickHandler={onNavItemClickHandler}
      />

      {<TabContent tabs={beverageConsts.beveragesNavLinks} />}
      <Pagination
        page={currentPage}
        onPageItemClick={async (currentPage: number) => {
          let result = await beverageActions.loadData({
            tabID: currentTabID,
            page: currentPage,
          });

          beverageActions.setData({
            id: currentTabID,
            list: result,
            page: currentPage,
            sort: productCategories[currentTabID].sort,
          });
        }}
        nextBtnDisabled={!hasCurrentListItems}
      />
    </>
  );
};

export default Home;
