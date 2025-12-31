import {
    LayoutDashboard,
    Users,
    //   Crown,
    // add more icons here
} from 'lucide-react';
import Overview from '@/pages/dashboard/Overview';
import { LoginPage } from '@/pages/auth/LoginPage';
import { ProtectedRoute } from '@/app/router/ProtectedRoute';
import SuperAdminLayout from '@/layout/SuperAdminLayout';
import Tenants from '@/pages/dashboard/Tenants';
import type { ReactNode } from 'react';

interface ModuleItem {
    icon: any;
    label: string;
    path: string;
    badge?: string | null;
    element?: ReactNode; // 💡 Component to render in router
}

interface ModuleSection {
    section: string;
    items: ModuleItem[];
}

// 💡 Central sidebar + routes config
export const modules: ModuleSection[] = [
    {
        section: 'Main',
        items: [
            // Overview page
            {
                icon: LayoutDashboard,
                label: 'Overview',
                path: '/',
                badge: null,
                element: (
                    <Overview />
                ),
            },
            {
                icon: Users,
                label: 'Tenants',
                path: '/tenants',
                badge: '247',
                element: (
                    <Tenants />
                ),
            },
            // add more items here
        ],
    },
    // add more sections if needed
];

// 💡 Flat routes array for router
export const routes = [
    {
        path: '/auth/login',
        element: <LoginPage />,
    },
    ...modules.flatMap((section) =>
        section.items.map((item) => ({
            path: item.path,
            element:
                <ProtectedRoute>
                    <SuperAdminLayout>
                        {item.element}
                    </SuperAdminLayout>
                </ProtectedRoute>
        }))
    ),
];
