const rawCustomers = [
  { id: 'C001', name: '7-Eleven 信義旗艦店', contact: '王店長', phone: '0912-345-678', address: '台北市信義區松高路11號', assignedTo: 'sales01' },
  { id: 'C002', name: '全家便利商店 板橋民生店', contact: '林主任', phone: '0922-766-500', address: '新北市板橋區民生路一段200號', assignedTo: 'sales01' },
  { id: 'C003', name: '全聯福利中心 中壢中正店', contact: '張經理', phone: '0933-123-890', address: '桃園市中壢區中正路456號', assignedTo: 'sales01' },
  { id: 'C004', name: 'OK超商 台中市政總店', contact: '陳店長', phone: '0944-555-321', address: '台中市西屯區市政路89號', assignedTo: 'sales01' },
  { id: 'C005', name: '萊爾富 高雄前鎮店', contact: '吳主任', phone: '0955-800-998', address: '高雄市前鎮區中山二路78號', assignedTo: 'sales01' },
  { id: 'C006', name: '大潤發 中山民生店', contact: '黃副總', phone: '0966-234-876', address: '台北市中山區民生東路三段99號', assignedTo: 'sales02' },
  { id: 'C007', name: '好市多 新莊量販店', contact: '許協理', phone: '0977-111-432', address: '新北市新莊區中正路300號', assignedTo: 'sales02' },
  { id: 'C008', name: '家樂福 台中北屯店', contact: '蔡採購', phone: '0988-654-321', address: '台中市北區崇德路一段201號', assignedTo: 'sales02' },
  { id: 'C009', name: '愛買大賣場 仁武店', contact: '謝廠長', phone: '0911-789-654', address: '高雄市仁武區工業路45號', assignedTo: 'sales02' },
  { id: 'C010', name: '頂好超市 台南永康店', contact: '鄭採購', phone: '0928-456-789', address: '台南市永康區中正南路188號', assignedTo: 'sales02' }
]

export const customerLocations = {
  C001: { lat: 25.040, lng: 121.565 },
  C002: { lat: 25.014, lng: 121.462 },
  C003: { lat: 24.954, lng: 121.224 },
  C004: { lat: 24.163, lng: 120.647 },
  C005: { lat: 22.612, lng: 120.301 },
  C006: { lat: 25.062, lng: 121.520 },
  C007: { lat: 25.035, lng: 121.440 },
  C008: { lat: 24.164, lng: 120.673 },
  C009: { lat: 22.725, lng: 120.309 },
  C010: { lat: 23.026, lng: 120.221 }
}

export const customerById = rawCustomers.reduce((map, customer) => {
  map[customer.id] = customer
  return map
}, {})

export function getCustomerLocation (customerId) {
  return customerLocations[customerId] ? { ...customerLocations[customerId] } : null
}

export const customers = rawCustomers.map(customer => {
  const location = getCustomerLocation(customer.id)
  return {
    ...customer,
    lat: location ? location.lat : null,
    lng: location ? location.lng : null,
    location: location ? { ...location } : null
  }
})
