import { LogoMark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { OrganisationsProps } from "@/app/(app)/explore/page";
import OrgCard from "./shared/orgcard";

export default function ExploreOrgs({
  organisations,
}: {
  organisations?: OrganisationsProps;
}) {
  return (
    <div className="container max-w-7xl mt-4">
      <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-20 rounded-2xl border bg-[radial-gradient(ellipse_30%_60%_at_100%_50%,hsla(var(--primary)_/_20%),#ffffff00)] py-8 sm:pl-16 lg:flex-row lg:bg-[radial-gradient(ellipse_50%_50%_at_50%_120%,hsla(var(--primary)_/_20%),#ffffff00)] lg:pl-20">
        <div className="mx-auto flex-[2] w-full px-4 text-center md:px-0 lg:mx-0 lg:text-left">
          <p className="inline-flex items-center gap-2 px-5 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary mb-8 animate-fade-in text-xs">
            Top social communities
          </p>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Explore the social investors
          </h2>
          <p className="text-sm text-muted-foreground">
            Donate to the top social communities and help them grow. You can
            also create your own community and get funded by the community
            members.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Button>Get Started</Button>
            <Button variant="ghost">
              <Play className="w-6 h-6" />
              Watch demo
            </Button>
          </div>
        </div>
        <div className="flex-1 pl-4 sm:pl-0 relative">
          <LogoMark className="absolute w-56 bottom-0 right-0 z-10 drop-shadow-2xl" />
        </div>
      </div>
      {/* Tabs */}
      <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {organisations &&
          organisations.treePlantingOrgs.map((org) => (
            <OrgCard key={org.id} org={org} />
          ))}
      </div>
    </div>
  );
}
