import { prisma } from "../lib/prisma";
import { hashPassword, publicUser, signToken, verifyPassword } from "../lib/auth";
import { sendMail, welcomeEmail } from "../lib/email";

export async function signupTraveler(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}) {
  const existing = await prisma.user.findFirst({
    where: { OR: [{ email: input.email.toLowerCase() }, { phone: input.phone }] },
  });
  if (existing) {
    throw Object.assign(new Error("An account with this email or phone already exists"), { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      email: input.email.toLowerCase().trim(),
      phone: input.phone.trim(),
      passwordHash: await hashPassword(input.password),
      role: "TRAVELER",
    },
  });

  const mail = welcomeEmail(user.firstName);
  await sendMail({ to: user.email, subject: mail.subject, text: mail.text });

  return { user: publicUser(user), token: signToken(user) };
}

export async function signin(identifier: string, password: string) {
  const value = identifier.trim();
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: value.toLowerCase() }, { phone: value }],
    },
  });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    throw Object.assign(new Error("Invalid email/phone or password"), { status: 401 });
  }
  return { user: publicUser(user), token: signToken(user) };
}
