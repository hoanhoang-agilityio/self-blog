import { Users, Home, Settings } from 'lucide-react';
import { ADMIN_ROUTES } from '@/constants/routers';

export const SIDEBAR_ITEMS = [
  {
    title: 'Home',
    url: ADMIN_ROUTES.DASHBOARD.URL,
    icon: Home,
  },
  {
    title: 'Users',
    url: ADMIN_ROUTES.USERS.URL,
    icon: Users,
  },
  {
    title: 'Settings',
    url: ADMIN_ROUTES.SETTINGS.URL,
    icon: Settings,
  },
];
