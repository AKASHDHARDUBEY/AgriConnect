// src/pages/Home.js
import React from 'react';
import LandingHero from '../components/LandingHero';
import FeaturesSection from '../components/Home/FeaturesSection';
import FAQSection from '../components/Home/FAQSection';
import Marketplace from './Marketplace';
import { generateOrganizationSchema, generateWebSiteSchema } from '../seo/schema';

export default function Home({ searchTerm }) {
    const orgSchema = generateOrganizationSchema();
    const siteSchema = generateWebSiteSchema();

    return (
        <main>
            <script type="application/ld+json">
                {JSON.stringify(orgSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(siteSchema)}
            </script>

            <LandingHero />
            <FeaturesSection />

            {/* Marketplace Preview Section */}
            <section id="marketplace-preview" className="py-12 bg-white dark:bg-slate-950">
                <Marketplace searchTerm={searchTerm} isPreview={true} />
            </section>

            <FAQSection />
        </main>
    );
}
