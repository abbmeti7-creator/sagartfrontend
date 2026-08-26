// src/components/seo/OrganizationJsonLd.tsx
import { SITE_URL } from "@/lib/utils";

interface OrganizationJsonLdProps {
  socialProfiles?: string[];
  contactPhone?: string;
}

export default function OrganizationJsonLd({
  socialProfiles = [],
  contactPhone,
}: OrganizationJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "ساگارت",
        alternateName: ["Sagart", "Sagart Co", "فروشگاه ساگارت"],
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          url: `${SITE_URL}/icon-512.png`,
          contentUrl: `${SITE_URL}/icon-512.png`,
          width: 512,
          height: 512,
          caption: "لوگوی رسمی ساگارت",
        },
        image: {
          "@id": `${SITE_URL}/#logo`,
        },
        description:
          "فروشگاه لوکس زعفران، زرشک و عناب اصیل قائنات با الهام از پیشکش‌های باستانی ساگارتیان.",
        ...(socialProfiles.length > 0 && { sameAs: socialProfiles }),
        ...(contactPhone && {
          contactPoint: {
            "@type": "ContactPoint",
            telephone: contactPhone,
            contactType: "customer service",
            areaServed: "IR",
            availableLanguage: ["Persian", "fa"],
          },
        }),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "ساگارت",
        alternateName: "Sagart",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: "fa-IR",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}