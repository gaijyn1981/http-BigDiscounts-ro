/**
 * Generate a dynamic OG image URL using Cloudinary transformations.
 * Overlays the price and BigDiscounts branding on the product photo.
 */
export function generateOgImageUrl(cloudinaryUrl: string, price: number, title: string): string {
  if (!cloudinaryUrl || !cloudinaryUrl.includes('cloudinary.com')) return cloudinaryUrl

  const uploadIndex = cloudinaryUrl.indexOf('/upload/')
  if (uploadIndex === -1) return cloudinaryUrl

  const baseUrl = cloudinaryUrl.substring(0, uploadIndex + 8)
  const publicId = cloudinaryUrl.substring(uploadIndex + 8)

  const priceText = `${price.toFixed(2).replace('.', '%2E')}%20RON`
  const transforms = [
    'w_1200,h_630,c_fill,g_center',
    'e_brightness:-20',
    `l_text:Arial_52_bold:${priceText},co_rgb:fcd968,g_south_west,x_40,y_40`,
    `l_text:Arial_28:BigDiscounts.ro,co_rgb:ffffff,g_north_east,x_40,y_40`,
  ].join('/')

  return `${baseUrl}${transforms}/${publicId}`
}
