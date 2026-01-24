import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

export async function getSession() {
  return await getServerSession();
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session?.user?.id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
    },
  });

  return user;
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return user;
}

export async function requireRole(role: string[]) {
  const user = await requireAuth();

  if (!role.includes(user.role)) {
    redirect("/unauthorized");
  }

  return user;
}
