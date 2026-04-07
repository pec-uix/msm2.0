export const promotions = [
  {
    id: 'PROMO001',
    name: '本月箱購滿額贈活動',
    description: '單次購買任意商品累計滿 5 箱，即可獲得品牌帆布袋',
    minTotalQty: 5,
    gifts: [
      { name: '品牌帆布袋', quantity: 1 }
    ]
  },
  {
    id: 'PROMO002',
    name: '台灣啤酒批量優惠方案',
    description: '購買台灣啤酒（罐裝）累計達 3 箱，隨即贈送台啤紀念杯墊組',
    targetProductId: 'P001',
    minQty: 3,
    gifts: [
      { name: '台啤紀念杯墊組', quantity: 1 }
    ]
  }
]
