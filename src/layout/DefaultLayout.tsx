import { useState, Suspense } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '@/common/Loader';
import { useAuth } from '@/hooks';

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  return user ? (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Suspense fallback={<Loader />}>
                <Outlet />
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={'/login'} />
  );
};

export default DefaultLayout;
