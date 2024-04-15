import { Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './common/Loader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import Router from './routes';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const queryClient = new QueryClient();

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Suspense fallback={<Loader />}>
          <Router />
        </Suspense>
      </HelmetProvider>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
