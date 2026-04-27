export function haversineKm (lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function sortByDistance (items, currentLocation, getLocation) {
  if (!currentLocation || !Array.isArray(items)) return Array.isArray(items) ? [...items] : []
  return items
    .map((item, index) => {
      const location = typeof getLocation === 'function' ? getLocation(item) : null
      const distance = location && typeof location.lat === 'number' && typeof location.lng === 'number'
        ? haversineKm(currentLocation.lat, currentLocation.lng, location.lat, location.lng)
        : Number.POSITIVE_INFINITY
      return { item, distance, index }
    })
    .sort((a, b) => {
      if (a.distance !== b.distance) return a.distance - b.distance
      return a.index - b.index
    })
    .map(entry => entry.item)
}

export function formatDistanceLabel (distanceKm) {
  if (typeof distanceKm !== 'number' || Number.isNaN(distanceKm)) return ''
  if (distanceKm < 1) {
    const meters = Math.max(1, Math.round(distanceKm * 1000))
    return `${meters} m`
  }
  return `${distanceKm.toFixed(1)} km`
}
