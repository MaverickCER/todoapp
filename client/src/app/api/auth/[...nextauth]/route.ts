import NextAuth, { NextAuthOptions, User } from 'next-auth';
// import Twitter from "next-auth/providers/twitter" // does not provide email
import { config } from '@/contracts/config.constants';
import { profileRepository } from '@/libs/prisma';
import Credentials from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: config.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Anonymous Profile',
      credentials: {},
      async authorize() {
        const email = 'anonymous+@gmail.com';
        const profile = await profileRepository.create({ email });

        return {
          id: `${profile.id}`,
          name: 'Anonymous User',
          email: profile.email,
        } as User;
      },
    }),
  ],
  theme: {
    colorScheme: 'dark', // "auto" | "dark" | "light"
    brandColor: '#003da5', // Hex color code
    logo: '', // Absolute URL to image
    buttonText: '#ffffff', // Hex color code
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
