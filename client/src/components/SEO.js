// src/components/SEO.js
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DEFAULT_SEO } from '../seo/metaConfig';

export default function SEO({
    title,
    description,
    keywords = [],
    image,
    url,
    children
}) {
    const metaTitle = title || DEFAULT_SEO.title;
    const metaDescription = description || DEFAULT_SEO.description;
    const metaKeywords = [...DEFAULT_SEO.keywords, ...keywords].join(", ");
    const metaImage = image || DEFAULT_SEO.openGraph.images[0].url;
    const metaUrl = url || window.location.href;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={metaUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={DEFAULT_SEO.openGraph.type} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:locale" content={DEFAULT_SEO.openGraph.locale} />
            <meta property="og:site_name" content={DEFAULT_SEO.openGraph.site_name} />

            {/* Twitter */}
            <meta name="twitter:card" content={DEFAULT_SEO.twitter.cardType} />
            <meta name="twitter:creator" content={DEFAULT_SEO.twitter.handle} />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />

            {/* Geotagging for India */}
            <meta name="geo.region" content="IN" />
            <meta name="geo.placename" content="India" />

            {children}
        </Helmet>
    );
}
