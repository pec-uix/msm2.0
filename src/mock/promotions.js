export const promotions = [
  {
    id: 'PROMO001',
    name: '買五件送禮活動',
    description: '單次購買任意商品累計滿 5 件，即可獲得精美贈品',
    minTotalQty: 5,
    gifts: [
      { name: '環保提袋', quantity: 1 }
    ]
  },
  {
    id: 'PROMO002',
    name: '工作鞋指定優惠方案',
    description: '購買輕量防水工作鞋累計達 3 雙，隨即贈送專業鞋墊組',
    targetProductId: 'P001',
    minQty: 3,
    gifts: [
      { name: '專業鞋墊組', quantity: 1 }
    ]
  }
]
