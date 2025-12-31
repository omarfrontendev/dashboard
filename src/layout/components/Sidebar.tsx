import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Crown,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Search,
} from 'lucide-react';
import { modules } from '@/config/menu.config';

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
    const location = useLocation();

    return (
        <aside
            className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-pink-900 text-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'
                } overflow-y-auto z-50`}
        >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                    {!collapsed && (
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg blur-md opacity-75" />
                                <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                                    <Crown className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-lg">Super Admin</h1>
                                <p className="text-xs text-purple-200">Provider Console</p>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        {collapsed ? (
                            <ChevronRight className="w-5 h-5" />
                        ) : (
                            <ChevronLeft className="w-5 h-5" />
                        )}
                    </button>
                </div>

                {!collapsed && (
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300" />
                        <input
                            type="text"
                            placeholder="Search modules..."
                            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-6">
                {modules.map((section, idx) => (
                    <div key={idx}>
                        {!collapsed && (
                            <h3 className="text-xs text-purple-300 uppercase tracking-wider mb-2 px-3">
                                {section.section}
                            </h3>
                        )}
                        <div className="space-y-1">
                            {section.items.map((item, itemIdx) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link key={itemIdx} to={item.path}>
                                        <div
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive
                                                ? 'bg-white/20 text-white shadow-lg'
                                                : 'text-purple-100 hover:bg-white/10 hover:text-white'
                                                } ${collapsed ? 'justify-center' : ''}`}
                                        >
                                            <Icon className="w-5 h-5 flex-shrink-0" />
                                            {!collapsed && (
                                                <>
                                                    <span className="text-sm flex-1">{item.label}</span>
                                                    {item.badge && (
                                                        <Badge className="bg-pink-500 text-white border-0 text-xs">
                                                            {item.badge}
                                                        </Badge>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 mt-auto">
                <Link to="/auth/login">
                    <Button
                        variant="ghost"
                        className={`w-full text-purple-200 hover:text-white hover:bg-white/10 ${collapsed ? 'px-2' : ''
                            }`}
                    >
                        <LogOut className="w-4 h-4" />
                        {!collapsed && <span className="ml-2">Logout</span>}
                    </Button>
                </Link>
            </div>
        </aside>
    );
}