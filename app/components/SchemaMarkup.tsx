export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BigDiscounts",
    "url": "https://www.bigdiscounts.ro",
    "description": "Marketplace-ul premium de reduceri din România. Listează-ți produsele la doar 5 RON/lună. Fără comision, fără intermediari.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.bigdiscounts.ro/browse?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BigDiscounts",
    "url": "https://www.bigdiscounts.ro",
    "logo": "https://www.bigdiscounts.ro/favicon.ico",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@bigdiscounts.ro",
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
