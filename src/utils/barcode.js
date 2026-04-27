export function normalizeBarcode (code) {
  return String(code || '').trim()
}

export function findProductByBarcode (products = [], code = '') {
  const target = normalizeBarcode(code)
  if (!target) return null
  return products.find(product => normalizeBarcode(product.barcode) === target) || null
}
