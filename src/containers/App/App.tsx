import { Routes, Route } from 'react-router-dom';

import { Layout } from '../';
import { CartPage, NotFoundPage, ProductDetailsPage, StorePage } from '../../pages';

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<StorePage />} />
        <Route path='checkout' element={<CartPage />} />
        <Route path='products/:category' element={<StorePage />} />
        <Route path='products/:category/:id' element={<ProductDetailsPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
