const rawPromotions = [
  {
    id: 'PROMO001',
    name: '本月箱購滿額贈活動',
    description: '單次購買任意商品累計滿 5 箱，即可獲得品牌帆布袋',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    minTotalQty: 5,
    gifts: [
      { name: '品牌帆布袋', quantity: 1 }
    ]
  },
  {
    id: 'PROMO002',
    name: '台灣啤酒批量優惠方案',
    description: '購買台灣啤酒（罐裝）累計達 3 箱，隨即贈送台啤紀念杯墊組',
    startDate: '2026-04-10',
    endDate: '2026-05-15',
    targetProductId: 'P001',
    minQty: 3,
    gifts: [
      { name: '台啤紀念杯墊組', quantity: 1 }
    ]
  }
]

export const promotions = rawPromotions.map(item => ({
  ...item,
  kind: 'promotion',
  placement: ['cart'],
  audience: ['customer', 'sales']
}))
