'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function handleLogin(_: unknown, formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return 'Email and password are required.';
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: email,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return data?.error?.message || 'Login failed';
  }

  // ✅ Store token in cookies (HttpOnly recommended in prod)
  (await cookies()).set('token', data.jwt, {
    path: '/',
    httpOnly: true, // Optional: prevents JS access
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // ✅ Redirect to /home on success
  redirect('/home');
}
