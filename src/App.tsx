/* eslint-disable max-len */
import './App.scss';

import {
  LOCAL_CART_KEY,
  LOCAL_FAVORITES_KEY,
} from './constants/localStorageKeys';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import CartPage from './components/pages/CartPage/CartPage';
import FavoritesPage from './components/pages/FavoritesPage/FavoritesPage';
import HomePage from './components/pages/HomePage/HomePage';
import Layout from './components/layout/Layout';
import LoginPage from './components/pages/LoginPage/LoginPage';
import NotFoundPage from './components/pages/NotFoundPage/NotFoundPage';
import ProductPage from './components/pages/ProductPage/ProductPage';
import ProductTypePage from './components/pages/ProductTypePage/ProductTypePage';
import RegistrationPage from './components/pages/RegistrationPage/RegistrationPage';
import SignInPage from './components/pages/SignInPage/SignInPage';
import SignUpPage from './components/pages/SignUpPage/SignUpPage';
import { fetchProducts } from './slices/productsSlice';
import { setCartItems } from './slices/cartSlice';
import { setFavorites } from './slices/favoriteSlice';
import { useAppDispatch } from './hooks/reduxHooks';
import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

export const App = () => {
  const dispatch = useAppDispatch();

  const { user } = useUser();

  useEffect(() => {
    const localCart = localStorage.getItem(LOCAL_CART_KEY + user?.id);
    const cart = localCart ? JSON.parse(localCart) : {};

    dispatch(setCartItems({ products: cart, userId: user?.id as string }));

    const localFaves = localStorage.getItem(LOCAL_FAVORITES_KEY + user?.id);
    const faves = localFaves ? JSON.parse(localFaves) : [];

    dispatch(setFavorites({ products: faves, userId: user?.id as string }));

    dispatch(fetchProducts());
  }, [dispatch, user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {['phones', 'tablets', 'accessories'].map(productType => (
            <Route key={productType} path={productType}>
              <Route
                index
                element={
                  <ProductTypePage
                    productsType={
                      productType as 'phones' | 'tablets' | 'accessories'
                    }
                  />
                }
              />
              <Route
                path=":productId"
                element={
                  <ProductPage
                    productType={
                      productType as 'phones' | 'tablets' | 'accessories'
                    }
                  />
                }
              />
            </Route>
          ))}
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
