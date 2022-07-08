import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { isEmpty } from 'lodash';

import * as productActions from '../store/entities/products/products.slice';
import * as favoriteActions from '../store/entities/favorites/favorites.slice';
import * as cartActions from '../store/entities/cart/cart.slice';

import * as productsConsts from '../utils/constants/product.constants';

import * as itemsHelpers from '../utils/helpers/items.helpers';
import * as storageHelpers from '../utils/helpers/storage.helpers';
import * as expirationHelpers from '../utils/helpers/expiration.helpers.tsx';

import TabsNav from '../components/common/tabs/TabsNav';
import TabContent from '../components/common/tabs/TabContent';
import Pagination from '../components/layout/navigation/pagination/Pagination';

interface ProductCategoryData {
  currentTabID: string;
  categories: any;
}

const Home: NextPage = () => {
  const router = useRouter();

  const { currentTabID, categories: productCategories }: ProductCategoryData =
    useSelector((state: any) => state.products);

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
      productActions.setCurrentTab({
        id: currentTabID,
      });

      (async () => {
        let result = await productActions.loadData({
          tabID: currentTabID,
          page: currentPage,
        });
        productActions.setData({
          id: currentTabID,
          list: result,
          page: currentPage,
          sort: productCategories[currentTabID].sort,
        });
      })();

      expirationHelpers.initializeExpirableDataToStorage('favorites');
      expirationHelpers.initializeExpirableDataToStorage('cart');

      favoriteActions.setList(storageHelpers.getStoredVal('favorites').data);
      cartActions.setList(storageHelpers.getStoredVal('cart').data);
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
    productActions.setCurrentTab({
      id: currentTabID,
    });

    let result = await productActions.loadData({
      tabID: currentTabID,
      page: currentPage,
    });

    productActions.setData({
      id: currentTabID,
      list: result,
      page: currentPage,
      sort: productCategories[currentTabID].sort,
    });
  }

  async function onPageBtnClickHandler(currentPage: number) {
    let result = await productActions.loadData({
      tabID: currentTabID,
      page: currentPage,
    });

    productActions.setData({
      id: currentTabID,
      list: result,
      page: currentPage,
      sort: productCategories[currentTabID].sort,
    });
  }

  const isListItemsEmpty: boolean = isEmpty(
    productCategories[currentTabID].list
  );

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <TabsNav
        links={productsConsts.categoriesSettings}
        navItemOnClickHandler={onNavItemClickHandler}
      />

      {<TabContent tabs={productsConsts.categoriesSettings} />}
      <Pagination
        page={currentPage}
        onPageItemClick={(currentPage: number) =>
          onPageBtnClickHandler(currentPage)
        }
        nextBtnDisabled={!isListItemsEmpty}
      />
    </>
  );
};

export default Home;
