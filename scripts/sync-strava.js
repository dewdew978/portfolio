import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataFilePath = path.join(__dirname, '../public/data/strava-activities.json')

const STRAVA_WIDGET_URL = 'https://www.strava.com/athletes/195893006/latest-rides/056e78b3002b2eb8d6a7c45bc7aa4eacb7d11c82'

// Helper to convert time format to seconds
function parseTimeToSeconds(timeStr) {
  if (!timeStr) return 0
  const parts = timeStr.trim().split(':').map(Number)
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2]
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1]
  }
  return 0
}

// Helper to calculate average pace (min'sec"/km)
function calculatePace(distanceKm, timeSeconds) {
  if (!distanceKm || distanceKm <= 0 || !timeSeconds || timeSeconds <= 0) {
    return "0'00\" /km"
  }
  const paceSecondsPerKm = timeSeconds / distanceKm
  const paceMin = Math.floor(paceSecondsPerKm / 60)
  const paceSec = Math.round(paceSecondsPerKm % 60).toString().padStart(2, '0')
  return `${paceMin}'${paceSec}" /km`
}

// Categorize run time of day from title
function determineTimeOfDay(title) {
  const t = (title || '').toLowerCase()
  if (t.includes('morning') || t.includes('เช้า')) return 'morning'
  if (t.includes('afternoon') || t.includes('บ่าย') || t.includes('เที่ยง')) return 'afternoon'
  return 'evening'
}

async function scrapeStravaWidget() {
  console.log('🔄 Scraping Live Strava Activities from:', STRAVA_WIDGET_URL)

  try {
    const res = await fetch(STRAVA_WIDGET_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch Strava widget. Status: ${res.status} ${res.statusText}`)
    }

    const html = await res.text()

    // Each activity starts with a class='map-thumb' anchor
    const rawBlocks = html.split(/<a class=['"]map-thumb['"]/i).slice(1)
    const activities = []

    for (let i = 0; i < rawBlocks.length; i++) {
      const block = rawBlocks[i]

      // Extract Activity ID
      const idMatch = block.match(/\/activities\/(\d+)/)
      // Extract Activity Title
      const titleMatch = block.match(/title=['"]([^'"]+)['"]/)
      // Extract Map image URL (favor 2x from srcset or fallback to src)
      const mapSrcsetMatch = block.match(/srcset=['"]([^'"]+)['"]/)
      const mapSrcMatch = block.match(/src=['"]([^'"]+)['"]/)
      let mapImageUrl = null
      if (mapSrcsetMatch) {
        const urls = mapSrcsetMatch[1].split(',').map(s => s.trim().split(' ')[0])
        mapImageUrl = urls[urls.length - 1]
      } else if (mapSrcMatch) {
        mapImageUrl = mapSrcMatch[1]
      }

      // Extract stats
      const statItems = [...block.matchAll(/<li>([^<]+)<\/li>/gi)].map(m => m[1].trim())
      // Extract date
      const dateMatch = block.match(/<p class=['"]timestamp['"]>([^<]+)<\/p>/)

      if (idMatch && statItems.length >= 3) {
        const id = idMatch[1]
        const title = titleMatch ? titleMatch[1] : 'Evening Run'
        const distanceKm = parseFloat(statItems[0].replace(/[^0-9.]/g, '')) || 0
        const movingTime = statItems[1]
        const elevationGainM = parseInt(statItems[2].replace(/[^0-9]/g, ''), 10) || 0
        const dateRaw = dateMatch ? dateMatch[1].trim() : 'Recently'

        const timeSeconds = parseTimeToSeconds(movingTime)
        const avgPace = calculatePace(distanceKm, timeSeconds)
        const timeOfDay = determineTimeOfDay(title)

        activities.push({
          id,
          title,
          timeOfDay,
          date: dateRaw,
          distanceKm,
          movingTime,
          avgPace,
          elevationGainM,
          calories: Math.round(distanceKm * 65),
          cadence: 156,
          tag: i === 0 ? 'Latest Run 🏃' : undefined,
          mapImageUrl,
          stravaUrl: `https://www.strava.com/activities/${id}`
        })
      }
    }

    if (activities.length === 0) {
      console.warn('⚠️ No activities parsed. Keeping existing file.')
      return
    }

    // Compute Aggregated Totals
    const totalDistanceKm = +(activities.reduce((sum, a) => sum + a.distanceKm, 0)).toFixed(1)
    const longestRunKm = +(Math.max(...activities.map(a => a.distanceKm))).toFixed(1)
    const totalSeconds = activities.reduce((sum, a) => sum + parseTimeToSeconds(a.movingTime), 0)
    const totalMovingTimeHours = +(totalSeconds / 3600).toFixed(1)
    const totalElevationGainM = activities.reduce((sum, a) => sum + a.elevationGainM, 0)

    const payload = {
      athlete: {
        name: "Dew .",
        username: "dewdew978",
        location: "Bangkok, Thailand",
        profileUrl: "https://www.strava.com/athletes/195893006",
        lastSynced: new Date().toISOString()
      },
      summary: {
        year: new Date().getFullYear(),
        totalDistanceKm,
        totalActivities: activities.length,
        longestRunKm,
        avgPace: "9'30\" /km",
        totalElevationGainM,
        totalMovingTimeHours
      },
      activities
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(payload, null, 2), 'utf8')
    console.log(`✅ Auto-scraped ${activities.length} Strava activities successfully!`)
    console.log('📊 Summary:', payload.summary)
    console.log('💾 File saved to:', dataFilePath)
  } catch (error) {
    console.error('❌ Error during Strava auto-sync:', error.message)
  }
}

scrapeStravaWidget()
