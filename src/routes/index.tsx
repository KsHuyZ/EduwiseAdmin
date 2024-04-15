import { useRoutes } from 'react-router-dom';
import { useAuth } from '../hooks';
import { protectedRoutes } from './privateRoutes';
import { publicRoutes } from './publicRoutes';

const Router = () => {
  const { user } = useAuth();
  const routes = user ? [...publicRoutes, ...protectedRoutes] : publicRoutes;
  const element = useRoutes(routes);
  return element;
};

export default Router;
