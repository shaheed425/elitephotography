import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  author = 'Elite Studio'
}) => {
  const siteName = 'Elite Studio';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Creative Photography & Videography`;
  const metaDescription = description || "Elite Studio offers professional photography and videography services for weddings, events, portraits, cinematic shoots and commercial productions.";
  const metaKeywords = keywords || "Elite Studio, photography studio, videography, wedding photography, cinematic video, creative studio, portraits, event photography, Kerala photography, Calicut photography";
  const siteUrl = 'https://elitestudio.com'; // Should be replaced with actual domain
  const canonicalUrl = url ? `${siteUrl}${url}` : siteUrl;
  const ogImage = image || `${siteUrl}/og-image.jpg`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data / JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'product' ? 'Product' : 'PhotographyBusiness',
          "name": siteName,
          "url": siteUrl,
          "logo": `${siteUrl}/logo.png`,
          "description": metaDescription,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Calicut",
            "addressRegion": "Kerala",
            "addressCountry": "IN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-000-000-0000",
            "contactType": "customer service"
          },
          "sameAs": [
            "https://facebook.com/elitestudio",
            "https://instagram.com/elitestudio",
            "https://twitter.com/elitestudio"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
