import { getServerSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { getUser, UserType } from '@/lib/mongodb';

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign In',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: `Enter Email` },
        password: { label: 'Password', type: 'password', placeholder: `Enter Password` }
      },
      // @ts-ignore
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const dbUser = await getUser({ email: credentials.email }, {
          firstName: 1,
          lastName: 1,
          email: 1,
          password: 1
          // phone: 1,
          // image: 1,
          // orders: 1,
          // wishlist: 1,
          // savedArticles: 1,
          // notifications: 1,
          // extra: 1
        }) as UserType[];

        console.log(`Executing dbUser: `, dbUser);

        if (dbUser.length === 0 || !dbUser[0].password) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(credentials.password, dbUser[0].password);

        if (dbUser && passwordsMatch) {
          // @ts-ignore
          dbUser[0].name = `${dbUser[0].firstName} ${dbUser[0].lastName}`;

          return dbUser[0];
        }
        return null;
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    })
  ],
  // session should expire in 2 hours
  session: {
    strategy: `jwt`,
    maxAge: 2 * 60 * 60 // 2 hours
  }
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig) as {
    user: {
      email: string;
      image: string;
    }
  };
  if (!session) {
    redirect('/');
  }
}