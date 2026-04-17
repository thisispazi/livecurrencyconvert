import { MetadataRoute } from 'next'

const CURRENCIES = ['USD','EUR','GBP','AED','SAR','INR','PKR','PHP','BDT','TRY','MXN','THB','JPY','CNY','KRW','CHF','CAD','AUD','SGD','HKD','NOK','SEK','DKK','PLN','CZK','HUF','NGN','KES','GHS','BRL']

const AMOUNTS = [1, 5, 10, 25, 50, 100, 200, 500, 1000, 2000, 5000, 10000]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://livecurrencyconvert.com'
  const urls: MetadataRoute.Sitemap = []

  urls.push({ url: baseUrl, changeFrequency: 'daily', priority: 1 })

  for (const from of CURRENCIES) {
    for (const to of CURRENCIES) {
      if (from === to) continue
      urls.push({
        url: `${baseUrl}/convert/${from.toLowerCase()}-to-${to.toLowerCase()}`,
        changeFrequency: 'daily',
        priority: 0.8,
      })
      for (const amount of AMOUNTS) {
        urls.push({
          url: `${baseUrl}/convert/${from.toLowerCase()}-to-${to.toLowerCase()}/${amount}`,
          changeFrequency: 'daily',
          priority: 0.6,
        })
      }
    }
  }

  return urls
}