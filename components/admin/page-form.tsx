"use client";

/**
 * Full-coverage SEO editor for a Page row.
 *
 * Validation is shared with the server action via `lib/validations/page-seo.ts`,
 * so a value that passes here passes there. Note that `schemaData` and
 * `contentBlocks` are edited and submitted as JSON *text*: the schema validates
 * the string and `toPrismaData` parses it server-side. Parsing here would send
 * an object the schema rejects.
 *
 * Primitive libraries are mixed in this project — Tabs and Select come from
 * Base UI, Switch from Radix. Base UI's `onValueChange` is
 * `(value, eventDetails) => void` and can emit `null`, so it is never handed
 * `field.onChange` directly.
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Sparkles, X } from "lucide-react";

import { createPage, updatePage } from "@/app/(admin)/admin/actions";
import {
  DESCRIPTION_IDEAL_MAX,
  OG_TYPES,
  PAGE_STATUSES,
  SCHEMA_TYPES,
  TITLE_IDEAL_MAX,
  TWITTER_CARDS,
  pageSeoSchema,
  starterSchemaFor,
  type PageSeoInput,
  type RobotsValue,
} from "@/lib/validations/page-seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.searchprex.com";

/** Which tab owns which field, so validation errors can be surfaced. */
const FIELD_TABS: Record<string, string> = {
  slug: "basics",
  title: "basics",
  metaDescription: "basics",
  canonicalUrl: "basics",
  status: "basics",
  ogTitle: "social",
  ogDescription: "social",
  ogImage: "social",
  ogType: "social",
  twitterCard: "social",
  twitterTitle: "social",
  twitterDescription: "social",
  twitterImage: "social",
  robots: "indexing",
  metaKeywords: "indexing",
  schemaType: "schema",
  schemaData: "schema",
  contentBlocks: "content",
};

function combineRobots(index: boolean, follow: boolean): RobotsValue {
  return `${index ? "index" : "noindex"}, ${follow ? "follow" : "nofollow"}` as RobotsValue;
}

/** JSON columns arrive from Prisma as objects; the editor works in text. */
function toJsonText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  return JSON.stringify(value, null, 2);
}

/**
 * Character counter that goes amber past the SERP truncation point. Over-long
 * is a warning, not an error — Google truncates rather than penalises.
 */
function Counter({ value, max }: { value?: string; max: number }) {
  const length = value?.length ?? 0;
  return (
    <span
      className={cn(
        "text-xs tabular-nums",
        length === 0 && "text-muted-foreground",
        length > 0 && length <= max && "text-emerald-600 dark:text-emerald-500",
        length > max && "text-amber-600 dark:text-amber-500"
      )}
    >
      {length} / {max}
    </span>
  );
}

export default function PageForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter();
  const [tab, setTab] = React.useState("basics");
  const [keywordDraft, setKeywordDraft] = React.useState("");

  const form = useForm<PageSeoInput>({
    resolver: zodResolver(pageSeoSchema),
    defaultValues: {
      slug: initialData?.slug ?? "/",
      title: initialData?.title ?? "",
      metaDescription: initialData?.metaDescription ?? "",
      canonicalUrl: initialData?.canonicalUrl ?? "",
      ogTitle: initialData?.ogTitle ?? "",
      ogDescription: initialData?.ogDescription ?? "",
      ogImage: initialData?.ogImage ?? "",
      ogType: initialData?.ogType ?? "website",
      twitterCard: initialData?.twitterCard ?? "summary_large_image",
      twitterTitle: initialData?.twitterTitle ?? "",
      twitterDescription: initialData?.twitterDescription ?? "",
      twitterImage: initialData?.twitterImage ?? "",
      robots: (initialData?.robots as RobotsValue) ?? "index, follow",
      metaKeywords: initialData?.metaKeywords ?? [],
      schemaType: initialData?.schemaType ?? "",
      schemaData: toJsonText(initialData?.schemaData),
      contentBlocks: toJsonText(initialData?.contentBlocks),
      status: initialData?.status ?? "published",
    },
  });

  const watched = form.watch();
  const keywords = watched.metaKeywords ?? [];
  const robots = watched.robots ?? "index, follow";
  const previewUrl = `${SITE_URL}${watched.slug === "/" ? "" : watched.slug ?? ""}`;

  async function onSubmit(values: PageSeoInput) {
    const res = initialData?.id ? await updatePage(initialData.id, values) : await createPage(values);

    if (res.success) {
      toast.success(initialData?.id ? "Page updated." : "Page created.");
      router.push("/admin/pages");
      router.refresh();
    } else {
      toast.error(res.error ?? "Could not save the page.");
    }
  }

  /**
   * An error on a hidden tab is invisible, which reads as "the save button did
   * nothing". Jump to the first tab that has one.
   */
  function onInvalid(errors: Record<string, unknown>) {
    const first = Object.keys(errors)[0];
    const target = first ? FIELD_TABS[first] : undefined;
    if (target) setTab(target);
    toast.error("Some fields need attention before saving.");
  }

  function addKeyword(raw: string) {
    const next = raw.trim().replace(/,$/, "").trim();
    if (!next) {
      setKeywordDraft("");
      return;
    }
    if (!keywords.includes(next)) {
      form.setValue("metaKeywords", [...keywords, next], { shouldDirty: true });
    }
    setKeywordDraft("");
  }

  function removeKeyword(value: string) {
    form.setValue(
      "metaKeywords",
      keywords.filter((keyword) => keyword !== value),
      { shouldDirty: true }
    );
  }

  function generateStarterSchema() {
    const type = form.getValues("schemaType");
    if (!type) {
      toast.error("Pick a schema type first.");
      return;
    }
    const starter = starterSchemaFor(type, {
      title: form.getValues("title"),
      metaDescription: form.getValues("metaDescription"),
      url: previewUrl,
    });
    form.setValue("schemaData", JSON.stringify(starter, null, 2), { shouldDirty: true });
    toast.success(`Starter ${type} schema generated.`);
  }

  function copyFromBasics(target: "og" | "twitter") {
    const title = form.getValues("title");
    const description = form.getValues("metaDescription");
    if (target === "og") {
      form.setValue("ogTitle", title, { shouldDirty: true });
      form.setValue("ogDescription", description, { shouldDirty: true });
    } else {
      form.setValue("twitterTitle", title, { shouldDirty: true });
      form.setValue("twitterDescription", description, { shouldDirty: true });
    }
    toast.success("Copied from Basics.");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]"
      >
        <div className="min-w-0 space-y-6">
          <Tabs value={tab} onValueChange={(value) => setTab(String(value ?? "basics"))}>
            <TabsList variant="line" className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="basics">Basics</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="indexing">Indexing</TabsTrigger>
              <TabsTrigger value="schema">Schema</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            {/* ---------------------------------------------------------- Basics */}
            <TabsContent value="basics">
              <Card>
                <CardHeader>
                  <CardTitle>Search appearance</CardTitle>
                  <CardDescription>
                    What Google shows for this page. The preview updates as you type.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL path</FormLabel>
                        <FormControl>
                          <Input placeholder="/about" {...field} />
                        </FormControl>
                        <FormDescription>
                          Must match a real route. Use <code>/</code> for the homepage.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Meta title</FormLabel>
                          <Counter value={field.value} max={TITLE_IDEAL_MAX} />
                        </div>
                        <FormControl>
                          <Input placeholder="About SearchPrex | …" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Meta description</FormLabel>
                          <Counter value={field.value} max={DESCRIPTION_IDEAL_MAX} />
                        </div>
                        <FormControl>
                          <Textarea rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            value={field.value ?? "published"}
                            onValueChange={(value) => field.onChange(value ?? "published")}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {PAGE_STATUSES.map((value) => (
                                <SelectItem key={value} value={value}>
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Only <strong>published</strong> pages override the live metadata and
                            appear in the sitemap.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="canonicalUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Canonical URL</FormLabel>
                          <FormControl>
                            <Input placeholder={previewUrl} {...field} />
                          </FormControl>
                          <FormDescription>
                            Leave blank to use the page&apos;s own URL.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ---------------------------------------------------------- Social */}
            <TabsContent value="social">
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <CardTitle>Open Graph</CardTitle>
                      <CardDescription>
                        Used by Facebook, LinkedIn, Slack and WhatsApp previews.
                      </CardDescription>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => copyFromBasics("og")}
                    >
                      Copy from Basics
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <FormField
                    control={form.control}
                    name="ogTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OG title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={watched.title || "Falls back to the meta title"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ogDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OG description</FormLabel>
                        <FormControl>
                          <Textarea rows={2} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="ogImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OG image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://…/og.png" {...field} />
                          </FormControl>
                          <FormDescription>1200 × 630 works everywhere.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ogType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OG type</FormLabel>
                          <Select
                            value={field.value ?? "website"}
                            onValueChange={(value) => field.onChange(value ?? "website")}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {OG_TYPES.map((value) => (
                                <SelectItem key={value} value={value}>
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <CardTitle>X / Twitter</CardTitle>
                      <CardDescription>
                        Leave blank to inherit the Open Graph values.
                      </CardDescription>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => copyFromBasics("twitter")}
                    >
                      Copy from Basics
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <FormField
                    control={form.control}
                    name="twitterCard"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card type</FormLabel>
                        <Select
                          value={field.value ?? "summary_large_image"}
                          onValueChange={(value) => field.onChange(value ?? "summary_large_image")}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TWITTER_CARDS.map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="twitterTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="twitterDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter description</FormLabel>
                        <FormControl>
                          <Textarea rows={2} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="twitterImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://…/twitter.png" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* -------------------------------------------------------- Indexing */}
            <TabsContent value="indexing">
              <Card>
                <CardHeader>
                  <CardTitle>Crawling &amp; indexing</CardTitle>
                  <CardDescription>
                    Controls the <code>robots</code> meta tag for this page.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="robots"
                    render={({ field }) => {
                      const value = field.value ?? "index, follow";
                      const canIndex = !value.includes("noindex");
                      const canFollow = !value.includes("nofollow");
                      return (
                        <FormItem>
                          <FormLabel>Directives</FormLabel>
                          <div className="space-y-4 rounded-lg border p-4">
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="text-sm font-medium">Allow indexing</p>
                                <p className="text-xs text-muted-foreground">
                                  Off adds <code>noindex</code> — the page gets dropped from search
                                  results.
                                </p>
                              </div>
                              <Switch
                                checked={canIndex}
                                onCheckedChange={(checked) =>
                                  field.onChange(combineRobots(checked, canFollow))
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="text-sm font-medium">Follow links</p>
                                <p className="text-xs text-muted-foreground">
                                  Off adds <code>nofollow</code> — link equity stops here.
                                </p>
                              </div>
                              <Switch
                                checked={canFollow}
                                onCheckedChange={(checked) =>
                                  field.onChange(combineRobots(canIndex, checked))
                                }
                              />
                            </div>
                          </div>
                          <FormDescription>
                            Emitted as <code>{value}</code>
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <div className="space-y-2">
                    <Label htmlFor="keyword-draft">Meta keywords</Label>
                    <Input
                      id="keyword-draft"
                      value={keywordDraft}
                      placeholder="Type a keyword and press Enter"
                      onChange={(event) => {
                        const next = event.target.value;
                        if (next.endsWith(",")) addKeyword(next);
                        else setKeywordDraft(next);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          addKeyword(keywordDraft);
                        }
                      }}
                    />
                    <p className="text-xs text-muted-foreground">
                      Google ignores this tag, but some AI answer engines and internal search still
                      read it. Up to 50.
                    </p>
                    {keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {keywords.map((keyword) => (
                          <Badge key={keyword} variant="secondary" className="gap-1 pr-1">
                            {keyword}
                            <button
                              type="button"
                              aria-label={`Remove ${keyword}`}
                              className="rounded-sm p-0.5 hover:bg-muted-foreground/20"
                              onClick={() => removeKeyword(keyword)}
                            >
                              <X className="size-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ---------------------------------------------------------- Schema */}
            <TabsContent value="schema">
              <Card>
                <CardHeader>
                  <CardTitle>Structured data</CardTitle>
                  <CardDescription>
                    JSON-LD injected into the page. Powers rich results and gives AI crawlers
                    machine-readable facts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <FormField
                    control={form.control}
                    name="schemaType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Schema type</FormLabel>
                        <Select
                          value={field.value ?? ""}
                          onValueChange={(value) => field.onChange(value ?? "")}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="None" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SCHEMA_TYPES.map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="schemaData"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between gap-3">
                          <FormLabel>JSON-LD</FormLabel>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={generateStarterSchema}
                          >
                            <Sparkles className="size-3.5" />
                            Generate starter
                          </Button>
                        </div>
                        <FormControl>
                          <Textarea
                            rows={16}
                            spellCheck={false}
                            className="font-mono text-xs"
                            placeholder="{}"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Leave empty to emit no structured data for this page.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* --------------------------------------------------------- Content */}
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Content blocks</CardTitle>
                  <CardDescription>
                    Optional JSON payload for pages that read editable copy from the CMS. Page
                    designs stay in code; this is for the text they pull in.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="contentBlocks"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            rows={20}
                            spellCheck={false}
                            className="font-mono text-xs"
                            placeholder="{}"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* ------------------------------------------------------------- Preview */}
        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Google preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5">
              <p className="truncate text-xs text-muted-foreground">{previewUrl}</p>
              <p className="text-lg leading-snug text-[#1a0dab] dark:text-[#8ab4f8]">
                {watched.title
                  ? watched.title.length > TITLE_IDEAL_MAX
                    ? `${watched.title.slice(0, TITLE_IDEAL_MAX)}…`
                    : watched.title
                  : "Your meta title appears here"}
              </p>
              <p className="text-sm leading-snug text-muted-foreground">
                {watched.metaDescription
                  ? watched.metaDescription.length > DESCRIPTION_IDEAL_MAX
                    ? `${watched.metaDescription.slice(0, DESCRIPTION_IDEAL_MAX)}…`
                    : watched.metaDescription
                  : "Your meta description appears here."}
              </p>
              {robots.includes("noindex") && (
                <Badge variant="destructive" className="mt-2">
                  noindex — hidden from search
                </Badge>
              )}
              {watched.status !== "published" && (
                <Badge variant="secondary" className="mt-2">
                  {watched.status} — live page uses code defaults
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Social preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border">
                {watched.ogImage ? (
                  // Plain <img>: the URL is arbitrary user input, so next/image
                  // would need every possible host in images.remotePatterns.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={watched.ogImage}
                    alt=""
                    className="aspect-[1200/630] w-full bg-muted object-cover"
                  />
                ) : (
                  <div className="flex aspect-[1200/630] w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                    No OG image set
                  </div>
                )}
                <div className="space-y-1 p-3">
                  <p className="truncate text-[11px] uppercase text-muted-foreground">
                    {SITE_URL.replace(/^https?:\/\//, "")}
                  </p>
                  <p className="line-clamp-2 text-sm font-semibold">
                    {watched.ogTitle || watched.title || "Title"}
                  </p>
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {watched.ogDescription || watched.metaDescription || "Description"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button type="submit" disabled={form.formState.isSubmitting} className="flex-1">
              {form.formState.isSubmitting && <Loader2 className="size-4 animate-spin" />}
              {initialData?.id ? "Save changes" : "Create page"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/admin/pages")}>
              Cancel
            </Button>
          </div>
        </aside>
      </form>
    </Form>
  );
}
