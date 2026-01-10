import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { twoFactor } from "better-auth/plugins";
import { Resend } from "resend";
import { admin } from "better-auth/plugins";
import { adminRole, userRole } from "./permission";

const resend = new Resend("re_Vv9NuspD_43ocZQ3jvFaEevnm86RbRWfV");

export const auth = betterAuth({
  appName: "lab blog",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.APP_URL!],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  //* github authentication
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      redirectURI: `${process.env.FRONTEND_URL}/api/auth/callback/github`,
    },
  },

  plugins: [
    admin({
      adminRoles: ["admin", "user"],
      defaultRole: "user",
      roles: {
        admin: adminRole,
        user: userRole,
      },
    }),
    twoFactor({
      otpOptions: {
        period: 2,
        async sendOTP({ user, otp }, ctx) {
          await resend.emails.send({
            from: "LabLog <onboarding@resend.dev>",
            to: user.email,
            subject: "ToFactor mail checking",
            html: `<p>Your OPF is <b>${otp}</b></p>`,
          });
        },
      },
    }),
  ],
});
