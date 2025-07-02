import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Rutas from './components/Rutas';

function Layout() {
  const location = useLocation();
  const noSidebar = ['/login', '/registro'];
  const shouldHideSidebar = noSidebar.includes(location.pathname);

  return (
    <div>
      {!shouldHideSidebar && <Sidebar />}
      <div className='flex-grow-1 p-4' style={{ marginLeft: shouldHideSidebar ? 0 : undefined }}>
        <Rutas />
      </div>
    </div>
  )
}

export default function App() {

  return (
    <Router>
      <Layout />
    </Router>
  );
}
