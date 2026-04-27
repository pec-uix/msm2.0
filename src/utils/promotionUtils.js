function parseDateToMs (dateStr) {
  if (!dateStr) return Number.NaN
  const ms = new Date(`${dateStr}T00:00:00`).getTime()
  return Number.isNaN(ms) ? Number.NaN : ms
}

export function matchesProductPromotion (promo, productId) {
  if (!promo || !productId) return false
  if (promo.targetProductId) return promo.targetProductId === productId
  return true
}

export function filterPromotionsForProduct (promotions, productId) {
  return (Array.isArray(promotions) ? promotions : []).filter(promo => matchesProductPromotion(promo, productId))
}

export function sortPromotionsByStartDate (promotions) {
  return [...(Array.isArray(promotions) ? promotions : [])].sort((a, b) => {
    const aMs = parseDateToMs(a && a.startDate)
    const bMs = parseDateToMs(b && b.startDate)
    if (Number.isNaN(aMs) && Number.isNaN(bMs)) return 0
    if (Number.isNaN(aMs)) return 1
    if (Number.isNaN(bMs)) return -1
    return aMs - bMs
  })
}

export function classifyPromotions (promotions, today = new Date()) {
  const todayStart = new Date(today)
  todayStart.setHours(0, 0, 0, 0)
  const todayMs = todayStart.getTime()
  const active = []
  const upcoming = []

  sortPromotionsByStartDate(promotions).forEach(promo => {
    const startMs = parseDateToMs(promo && promo.startDate)
    const endMs = parseDateToMs(promo && promo.endDate)
    const isCurrent = !Number.isNaN(startMs) && !Number.isNaN(endMs) && startMs <= todayMs && endMs >= todayMs
    const isUpcoming = !Number.isNaN(startMs) && startMs > todayMs
    if (isCurrent) active.push(promo)
    else if (isUpcoming) upcoming.push(promo)
  })

  return {
    active,
    upcoming
  }
}

export function promotionDescriptionText (promo) {
  return promo && promo.description ? String(promo.description).trim() : ''
}

export function promotionConditionText (promo) {
  if (!promo) return ''
  if (promo.minTotalQty !== undefined && promo.minTotalQty !== null) {
    return `任意商品累計滿 ${promo.minTotalQty} 箱`
  }
  if (promo.targetProductId && promo.minQty !== undefined && promo.minQty !== null) {
    return `指定商品累計滿 ${promo.minQty} 箱`
  }
  return ''
}

export function promotionHasDetailContent (promo) {
  if (!promo) return false
  const hasDescription = !!promotionDescriptionText(promo)
  const hasCondition = !!promotionConditionText(promo)
  const hasGifts = Array.isArray(promo.gifts) && promo.gifts.length > 0
  return hasDescription || hasCondition || hasGifts
}
