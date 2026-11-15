import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionManager, {
  type AdminItem,
} from "@/components/Admin/SectionManager";
import { listSection } from "@/lib/content";
import { getSectionDef } from "@/lib/sections";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ section: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { section } = await params;
  const def = getSectionDef(section);
  return {
    title: def ? `Manage ${def.label} — Content Studio` : "Content Studio",
    robots: { index: false, follow: false },
  };
}

export default async function SectionPage({ params }: PageProps) {
  const { section } = await params;
  const def = getSectionDef(section);
  if (!def) notFound();

  let items: AdminItem[] = [];
  let loadError = "";

  try {
    items = (await listSection(def.slug)) as AdminItem[];
  } catch (error) {
    console.error(`Admin: failed to load ${def.slug}`, error);
    loadError =
      "We could not load this content from the database. Check the Turso connection in your environment variables, then reload.";
  }

  return <SectionManager def={def} initialItems={items} loadError={loadError} />;
}
