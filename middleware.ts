import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login' // Redirect to home page if not authenticated
  }
});

export const config = {
  matcher: ['/account-settings/:path*'] // Apply middleware to /protect and its subpaths
};
