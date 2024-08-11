import { getServerSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { createUserWhenAuthViaProvider, getUser, UserType } from '@/lib/mongodb';
import { Timestamp } from 'mongodb';
import { revalidatePath } from 'next/cache';

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
        }) as UserType[];

        if (dbUser.length === 0 || !dbUser[0].password) {
          return null;
        }
        if (dbUser.length > 0 && dbUser[0].password === null && !dbUser[0].registeredManually) {
          // get
          const user = {
            name: `${dbUser[0].firstName} ${dbUser[0].lastName}`,
            email: dbUser[0].email,
            image: dbUser[0].image
          };
          return user;
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
  session: {
    strategy: `jwt`,
    maxAge: 2 * 60 * 60 // 2 hours
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account && profile) {
        const dbUser = await getUser({ email: profile.email }, {
          email: 1,
          firstName: 1,
          lastName: 1,
          image: 1
        }) as UserType[];

        if (dbUser.length === 0) {
          const newUser: UserType = {
            // @ts-ignore
            firstName: profile.given_name || profile.name!.split(' ')[0],
            // @ts-ignore
            lastName: profile.family_name || profile.name!.split(' ')[1] || '',
            // @ts-ignore
            image: profile.picture || null,
            // @ts-ignore
            email: profile.email,
            password: null, // No password since it's OAuth
            registeredManually: false,
            phone: null,
            orders: [],
            notifications: [{
              type: `green`,
              icon: `smile`,
              addedAt: new Date(),
              timestamp: Timestamp.fromNumber(Date.now()),
              text: `Welcome aboard! Your account was successfully registered!`
            }],
            wishlist: [],
            savedArticles: [],
            extra: {
              signedOnNewsletter: false
            }
          };

          await createUserWhenAuthViaProvider(newUser);

          const user = {
            name: `${newUser.firstName} ${newUser.lastName}`,
            email: newUser.email,
            image: newUser.image

          };
          token.user = user;

          revalidatePath(`/`, `layout`);

        } else {

          const dbUser = await getUser({ email: profile.email }, {
            email: 1,
            firstName: 1,
            lastName: 1,
            image: 1
          }) as UserType[];

          const user = {
            name: `${dbUser[0].firstName} ${dbUser[0].lastName}`,
            email: dbUser[0].email,
            image: dbUser[0].image

          };

          token.user = user;
          revalidatePath(`/`, `layout`);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    }
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