import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.error?.message || 'Invalid credentials');

        return {
          id: data.user.id,
          name: data.user.username,
          email: data.user.email,
          jwt: data.jwt, // We'll pass this to the JWT token
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.jwt) {
        token.jwt = user.jwt;
      }
      return token;
    },
    async session({ session, token }) {
      session.jwt = token.jwt as string;
      return session;
    },
  },
  session: {
    strategy: 'jwt', // ensures JWT strategy
  },
});
