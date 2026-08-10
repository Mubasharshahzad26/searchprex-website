"use server";

import { revalidatePath } from "next/cache";
import { db as prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { pageSeoSchema, toPrismaData, type PageSeoInput } from "@/lib/validations/page-seo";

/**
 * Defense-in-depth: middleware already gates /admin, but server actions are
 * independently addressable endpoints, so every mutation re-checks the role.
 * Throws if the caller is not an admin.
 */
async function requireAdmin() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Authentication is not configured on this deployment.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated.");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") throw new Error("Forbidden: admin role required.");

  return user;
}

export async function getPages() {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { updatedAt: "desc" },
    });
    return { success: true, data: pages };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getPageById(id: string) {
  try {
    const page = await prisma.page.findUnique({
      where: { id },
    });
    return { success: true, data: page };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createPage(input: PageSeoInput) {
  try {
    await requireAdmin();

    const parsed = pageSeoSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const page = await prisma.page.create({ data: toPrismaData(parsed.data) });

    revalidatePath("/admin/pages");
    revalidatePath(page.slug); // revalidate the actual frontend page
    revalidatePath("/sitemap.xml");
    return { success: true, data: page };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updatePage(id: string, input: PageSeoInput) {
  try {
    await requireAdmin();

    const parsed = pageSeoSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const previous = await prisma.page.findUnique({ where: { id }, select: { slug: true } });
    const page = await prisma.page.update({ where: { id }, data: toPrismaData(parsed.data) });

    revalidatePath("/admin/pages");
    revalidatePath(page.slug);
    // If the slug changed, the old route needs revalidating too.
    if (previous?.slug && previous.slug !== page.slug) revalidatePath(previous.slug);
    revalidatePath("/sitemap.xml");
    return { success: true, data: page };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deletePage(id: string) {
  try {
    await requireAdmin();

    const page = await prisma.page.delete({ where: { id } });

    revalidatePath("/admin/pages");
    revalidatePath(page.slug);
    revalidatePath("/sitemap.xml");
    return { success: true, data: page };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Client Management Actions
export async function getClients() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: clients };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Autopilot Management Actions
export async function getAutopilotConfigs() {
  try {
    const configs = await prisma.autopilotConfig.findMany({
      include: { client: true },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: configs };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Blog Management Actions
export async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      include: { client: true },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: posts };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Indexing Management Actions
export async function getIndexingAccounts() {
  try {
    const accounts = await prisma.indexingAccount.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: accounts };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
