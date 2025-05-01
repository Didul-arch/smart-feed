import { Outlet } from 'react-router-dom';
import MobileNavbar from '../ui/navbar';

const Layout = () => {


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main content area with padding for navbar at bottom */}
      <main className="flex-grow pt-20">
        {/* Router outlet - ini yang akan render component dari routes */}
        <Outlet />
      </main>

      {/* Navbar di bagian bawah */}
      <MobileNavbar />
    </div>
  );
};

export default Layout;