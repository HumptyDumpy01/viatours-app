import { getServerSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { redirect } from 'next/navigation';

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

        // TODO: replace this with a real db query

        const dbUser = {
          email: 'john.doe@gmail.com',
          password: 'MalFox'
        } as { email: string, password: string };

        if (dbUser && dbUser.password === credentials.password) {
          return dbUser;
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


  ]
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
