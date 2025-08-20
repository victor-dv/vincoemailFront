import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Mail, FileText, Settings, Users, X } from 'lucide-react';
import { jwtDecode } from "jwt-decode";
import img from '../assets/logo.png';

interface JwtPayload {
  name: string;
  email: string; // Adicionado 'email' na interface para que ele seja decodificado
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { title: 'Dashboard', path: '/dashboard', icon: Home },
  { title: 'Campanhas', path: '/campaigns', icon: Mail },
  { title: 'Modelos', path: '/templates', icon: FileText },
  { title: 'Configurações', path: '/settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = React.useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUser({ name: decoded.name, email: decoded.email });
      } catch (error) {
        console.error("Token inválido:", error);
      }
    }
  }, []); // O array vazio [] garante que o useEffect rode apenas uma vez, na montagem do componente.

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img src={img} alt="Logo Vinco leilões" className='h-8 w-auto' />
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-gray-900"><span className='font-semibold text-lg text-yellow-600'>Vinco</span>Email</span>
              <span className="text-xs text-gray-600">Campanhas de Emails</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Menu Principal
            </p>
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                    ? 'bg-yellow-50 text-yellow-700 border-r-2 border-yellow-600'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2">
            <Users className="h-4 w-4 text-gray-500" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">{user?.name || "Usuário"}</span>
              <span className="text-xs text-gray-600" >{user?.email || ""}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};