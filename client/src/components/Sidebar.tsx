import React from 'react';
import { LayoutDashboard, ShoppingBag, FolderTree, Users, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 shadow-2xl z-40">
            <div className="p-8 pb-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <ShoppingBag size={22} className="text-white" />
                    </div>
                    <span className="text-2xl font-bold text-white tracking-tight">Fastcart</span>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main Menu</p>
                <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
                <NavItem icon={<ShoppingBag size={20} />} label="Orders" badge="14" />
                <NavItem icon={<FolderTree size={20} />} label="Categories" active />
                <NavItem icon={<Users size={20} />} label="Customers" />

                <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mt-8 mb-2">Settings</p>
                <NavItem icon={<Settings size={20} />} label="Settings" />
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 font-medium"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    badge?: string;
}

const NavItem = ({ icon, label, active = false, badge }: NavItemProps) => {
    const handleClick = () => {
        if (!active) {
            alert(`${label} feature is coming soon!`);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`flex items-center justify-between w-full p-3.5 rounded-xl text-left transition-all duration-300 group ${active
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                : 'hover:bg-slate-800 hover:text-white'
                }`}
        >
            <div className="flex items-center gap-3">
                <span className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'} transition-colors`}>
                    {icon}
                </span>
                <span className="font-medium">{label}</span>
            </div>
            {badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${active ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                    }`}>
                    {badge}
                </span>
            )}
        </button>
    );
};

export default Sidebar;

