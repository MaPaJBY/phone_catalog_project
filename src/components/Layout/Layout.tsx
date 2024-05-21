import { Outlet } from 'react-router-dom';
import { ProductsProvider } from '../../context/ProductsContext';

type Props = {};
export default function Layout({ }: Props) {
  return (
    <>
      {/* <Header /> */}

      <ProductsProvider>
        <Outlet />
      </ProductsProvider>

      {/* <Footer /> */}
    </>
  );
}
