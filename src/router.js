import {
  Route,
  Routes,
  // useRoutes,
} from 'react-router-dom';

import { EditContact } from './pages/EditContact';
import { Home } from './pages/Home';
import { NewContact } from './pages/NewContact';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewContact />} />
      <Route path="/edit/:id" element={<EditContact />} />
    </Routes>
  );
}

// imperative way to declare our routes
// export function Router() {
//   const routes = useRoutes([
//     {
//       path: '/',
//       element: <Home />,
//     },
//     {
//       path: '/new',
//       element: <NewContact />,
//     },
//     {
//       path: '/edit/:id',
//       element: <EditContact />,
//     },
//   ]);

//   return routes;
// }
