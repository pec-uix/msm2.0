import { haversineKm, sortByDistance } from './distance'

export function getCustomerPoint (customer) {
  if (!customer) return null
  if (customer.location && typeof customer.location.lat === 'number' && typeof customer.location.lng === 'number') {
    return customer.location
  }
  if (typeof customer.lat === 'number' && typeof customer.lng === 'number') {
    return { lat: customer.lat, lng: customer.lng }
  }
  return null
}

export function buildSelectableCustomers ({
  customers = [],
  currentUserId = '',
  mode = 'my',
  currentLocation = null,
  keyword = ''
} = {}) {
  const normalizedKeyword = keyword.trim().toLowerCase()
  const isMyMode = mode === 'my'
  const filtered = customers.filter(customer => {
    const belongsToCurrentUser = customer.assignedTo === currentUserId
    if (isMyMode) return belongsToCurrentUser
    return !belongsToCurrentUser
  })

  const searched = normalizedKeyword
    ? filtered.filter(customer =>
        (customer.name || '').toLowerCase().includes(normalizedKeyword) ||
        (customer.address || '').toLowerCase().includes(normalizedKeyword)
      )
    : filtered

  const ordered = sortByDistance(
    searched,
    currentLocation,
    customer => getCustomerPoint(customer)
  )

  return ordered.map(customer => {
    const point = getCustomerPoint(customer)
    const distance = currentLocation && point
      ? haversineKm(currentLocation.lat, currentLocation.lng, point.lat, point.lng)
      : null

    return {
      ...customer,
      distance
    }
  })
}
