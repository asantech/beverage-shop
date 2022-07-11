import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import Head from 'next/head';
import { isEmpty } from 'lodash';

import OverlayedSpinner from '../components/common/spinners/OverlayedSpinner';

import * as productServices from 'services/products/products.services';

import * as productActions from 'store/entities/products/products.slice';
import * as favoriteActions from 'store/entities/favorites/favorites.slice';
import * as cartActions from 'store/entities/cart/cart.slice';

import * as productsConsts from 'utils/constants/products.constants';

import * as itemsHelpers from 'utils/helpers/items.helpers';
import * as storageHelpers from 'utils/helpers/storage.helpers';
import * as expirationHelpers from 'utils/helpers/expiration.helpers';
import {
  convertObjToURLQueryStr,
  createdURLQueryObj,
} from 'utils/helpers/url.helpers';

import TabsNav from 'components/common/tabs/TabsNav';
import TabContent from 'components/common/tabs/TabContent';
import Pagination from 'components/layout/navigation/pagination/Pagination';

interface ProductCategoryData {
  currentTabID: string;
  categories: any;
}

interface ProductQuery {
  food?: string;
  page?: number;
}

const Home: NextPage = (data: any) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { tabID: currentTabID, page: currentPage, productsList }: any = data;

  const { categories: productCategories }: ProductCategoryData = useSelector(
    (state: any) => state.products
  );

  const isListItemsEmpty: boolean = isEmpty(productsList);

  useEffect(() => {
    if (
      currentTabID === '' ||
      currentTabID === 'pizza' ||
      currentTabID === 'steak'
    ) {
      productActions.setCurrentTab({
        id: currentTabID,
      });

      productActions.setData({
        id: currentTabID,
        list: productsList,
        page: currentPage,
        sort: productCategories[currentTabID].sort,
      });

      expirationHelpers.initializeExpirableDataToStorage('favorites');
      expirationHelpers.initializeExpirableDataToStorage('cart');

      favoriteActions.setList(storageHelpers.getStoredVal('favorites').data);
      cartActions.setList(storageHelpers.getStoredVal('cart').data);
    } else {
      router.push('404');
    }
    setIsLoading(false);
  }, [data.tabID, data.page]);

  async function onNavItemClickHandler(params: any) {
    setIsLoading(true);
    const { id: currentTabID } = params;
    const currentPage = itemsHelpers.getCurrentPage(
      productCategories,
      currentTabID
    );

    router.push(
      convertObjToURLQueryStr(createdURLQueryObj(currentTabID, currentPage))
    );
  }

  async function onPageBtnClickHandler(currentPage: number) {
    setIsLoading(true);
    router.push(
      convertObjToURLQueryStr(createdURLQueryObj(currentTabID, currentPage))
    );
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {isLoading && <OverlayedSpinner />}
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
        nextBtnDisabled={isListItemsEmpty}
      />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async context => {
  const { query }: { query: ProductQuery } = context;
  const { food, page } = query;

  const urlQueryObj = {
    tabID: food ?? '',
    page: page ? +page : 1,
  };

  const productsList = await productServices.loadData(urlQueryObj);

  return {
    props: {
      productsList,
      ...urlQueryObj,
    },
  };
};
export default Home;
