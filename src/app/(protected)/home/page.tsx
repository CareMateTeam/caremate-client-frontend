"use client";

import { useI18n } from "@/libs/i18n/i18n-provider";
import { UserInformation, UserProfileResponse } from "@/dto/user";
import { useEffect, useState } from "react";
import {
  mapUserProfileToTopInformation,
  unwrapApiData,
} from "@/libs/user/map-user-profile";
import HomeImageCarousel from "@/components/home/image-carousel";
import HomeHeroSection from "@/components/home/home-hero-section";
import HomeHeader from "@/components/home/home-header";
import HomeUserSummary from "@/components/home/home-user-summary";
import HomeQuickActions from "@/components/home/home-quick-actions";
import HomeAboutCard from "@/components/home/home-about-card";
import HomeCareFeatures from "@/components/home/home-care-features";
import HomeHowItWorks from "@/components/home/home-how-it-works";
import HomeHealthTips from "@/components/home/home-health-tips";
import HomeCtaSection from "@/components/home/home-cta-section";

const quickActionsMeta = [
  { href: "/services", icon: "🩺", color: "from-cyan-500 to-emerald-500" },
  { href: "/members", icon: "👨‍👩‍👧", color: "from-emerald-500 to-teal-500" },
  { href: "/profile/addresses", icon: "📍", color: "from-sky-500 to-cyan-500" },
  { href: "/notifications", icon: "🔔", color: "from-violet-500 to-cyan-500" },
];

export default function HomePage() {
  const { t } = useI18n();

  const [currentUser, setCurrentUser] = useState<UserInformation | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        setLoadingUser(true);

        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(data?.message ?? "Failed to fetch user profile");
        }

        const profile = unwrapApiData<UserProfileResponse>(data);
        const mappedUser = mapUserProfileToTopInformation(profile);

        setCurrentUser(mappedUser);
      } catch (error) {
        console.error("Fetch user profile error:", error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchMe();
  }, []);

  const quickActions = t.home.quickActions.map((item, idx) => ({
    ...item,
    ...quickActionsMeta[idx],
  }));

  const careHighlights = t.home.careHighlights;
  const healthTips = t.home.healthTips;
  const careSteps = t.home.careStepsExtended;
  const ctaLines = t.home.ctaHeadline.split("\n");

  return (
    <div className="z-10 space-y-6">
      <HomeHeader appName={t.common.appName} />

      <HomeUserSummary loadingUser={loadingUser} currentUser={currentUser} />

      <HomeHeroSection />

      <HomeImageCarousel />

      <HomeQuickActions
        quickActions={quickActions}
        quickActionTap={t.home.quickActionTap}
      />

      <HomeAboutCard
        aboutBadge={t.home.aboutBadge}
        aboutTitle={t.home.aboutTitle}
        aboutDescription={t.home.aboutDescription}
      />

      <HomeCareFeatures
        careFeaturesBadge={t.home.careFeaturesBadge}
        careFeaturesTitle={t.home.careFeaturesTitle}
        careHighlights={careHighlights}
      />

      <HomeHowItWorks
        howItWorksBadge={t.home.howItWorksBadge}
        howItWorksTitle={t.home.howItWorksTitle}
        careSteps={careSteps}
      />

      <HomeHealthTips tipsTitle={t.home.tipsTitle} healthTips={healthTips} />

      <HomeCtaSection
        ctaBadge={t.home.ctaBadge}
        ctaLines={ctaLines}
        ctaDescription={t.home.ctaDescription}
        ctaManageMembers={t.home.ctaManageMembers}
        ctaSeeServices={t.home.ctaSeeServices}
      />

      <div className="h-6" />
    </div>
  );
}