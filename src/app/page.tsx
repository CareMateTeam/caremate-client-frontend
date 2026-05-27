"use client";

import { useRouter } from "next/navigation";
import { useI18n } from "@/libs/i18n/i18n-provider";
import IntroBackground from "@/components/intro/intro-background";
import IntroHeader from "@/components/intro/intro-header";
import IntroContent from "@/components/intro/intro-content";
import IntroFeatureGrid from "@/components/intro/intro-feature-grid";
import IntroFooter from "@/components/intro/intro-footer";
import IntroHeroVisual from "@/components/intro/intro-hero-visual";

export default function IntroPage() {
  const router = useRouter();
  const { t } = useI18n();

  const features = [
    {
      icon: "🧬",
      label: t.intro.smartCare,
    },
    {
      icon: "🛡️",
      label: t.common.secure,
    },
    {
      icon: "⚡",
      label: t.intro.fastAccess,
    },
  ];

  return (
    <IntroBackground>
      <section className="mx-auto flex min-h-screen max-w-md flex-col justify-between py-8">
        <IntroHeader appName={t.common.appName} tagline={t.common.tagline} />

        <div className="flex flex-1 flex-col justify-center">
          <IntroHeroVisual
            aiCare={t.intro.aiCare}
            secureLogin={t.intro.secureLogin}
          />
          <IntroContent
            badge={t.intro.badge}
            headline1={t.intro.headline1}
            headline2={t.intro.headline2}
          />
          <IntroFeatureGrid features={features} />
          <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-start indent-6 text-slate-600">
            {t.intro.description}
          </p>
        </div>

        <IntroFooter
          loginButton={t.intro.loginButton}
          loginFooter={t.intro.loginFooter}
          onLogin={() => router.push("/login")}
        />
      </section>
    </IntroBackground>
  );
}
