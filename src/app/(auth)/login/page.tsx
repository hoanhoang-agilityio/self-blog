import LoginForm from '@/components/ui/login-form';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <main className="mt-10 flex items-center justify-center">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
