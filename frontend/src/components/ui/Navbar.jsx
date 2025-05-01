import { Link, useLocation } from 'react-router-dom';
import images from '@/utils/images';

export default function MobileNavbar() {
  const location = useLocation();
  
  // Check which route is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="fixed top-18 left-0 right-0 flex justify-center z-50">
      <div className="bg-white rounded-full shadow-md px-3 py-1">
        <div className="flex items-center justify-between gap-4">
          <NavItem to="/" isActive={isActive('/')} icon={images.LOGO.HOME} label="Home" />
          <NavItem to="/jadwal" isActive={isActive('/jadwal')} icon={images.LOGO.JADWAL} label="Jadwal" />
          <NavItem to="/sapi" isActive={isActive('/sapi')} icon={images.LOGO.SAPI} label="Sapi" />
          <NavItem to="/pakan" isActive={isActive('/pakan')} icon={images.LOGO.PAKAN} label="Pakan" />
          <NavItem to="/settings" isActive={isActive('/settings')} icon={images.LOGO.SETTING} label="Settings" />
        </div>
      </div>
    </div>
  );
}

// Component buat masing-masing item navbar
function NavItem({ to, isActive, icon, label }) {
  return (
    <Link 
      to={to} 
      className={`flex items-center justify-center ${isActive ? 'text-primary' : 'text-gray-400'}`}
      aria-label={label}
    >
      <div className={`p-1.5 rounded-full ${isActive ? 'bg-blue-100' : ''}`}>
        <img 
          src={icon} 
          alt={label} 
          className="w-5 h-5" 
        />
      </div>
    </Link>
  );
}