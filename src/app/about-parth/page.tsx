import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutPageContent } from "@/components/about/about-page-content";
import { getAboutPageData } from "@/lib/public/about";
import { getPublicMediaByIds } from "@/lib/public/media";

export const metadata: Metadata = {
  title: "About Parth | Think Big AI Systems",
  description:
    "A project-led software and AI systems portfolio connected to Think Big Digital Solutions.",
};

export default async function AboutParthPage() {
  const data = await getAboutPageData();

  const [proofMediaMap, videoMediaMap] = await Promise.all([
    getPublicMediaByIds(
      data.featuredProof
        .map((item) => item.mediaId)
        .filter((id): id is string => Boolean(id)),
    ),
    getPublicMediaByIds(
      data.featuredVideos
        .map((video) => video.thumbnailMediaId)
        .filter((id): id is string => Boolean(id)),
    ),
  ]);

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <AboutPageContent
          milestones={data.milestones}
          featuredProjects={data.featuredProjects}
          featuredProof={data.featuredProof}
          featuredVideos={data.featuredVideos}
          proofMediaMap={proofMediaMap}
          videoMediaMap={videoMediaMap}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
