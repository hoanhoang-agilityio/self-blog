import { cookies } from 'next/headers';

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ADMIN_ROUTES } from '@/constants/routers';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  const session = await auth();

  if (!session) redirect(ADMIN_ROUTES.LOGIN.URL);

  return (
    <section>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <SidebarTrigger />
          <main className="p-20">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </section>
  );
}
