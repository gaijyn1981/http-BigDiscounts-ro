export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BigDiscounts",
    "url": "https://www.bigdiscounts.uk",
    "description": "Marketplace-ul premium de reduceri din România. Listează-ți produsele la doar £1/lună. Fără comision, fără intermediari.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.bigdiscounts.uk/browse?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BigDiscounts",
    "url": "https://www.bigdiscounts.uk",
    "logo": "https://www.bigdiscounts.uk/favicon.ico",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@bigdiscounts.uk",
      "contactType": "customer service",
      "areaServed": "RO"
    },
    "sameAs": []
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  )
}
