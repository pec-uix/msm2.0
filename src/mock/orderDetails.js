// 詳細訂單資料，依 orderId 索引
// source 值說明：
//   customer    → 客戶送單
//   sales_add   → 業務新增
//   sales_edit  → 業務修改
//   system_gift → 系統贈品
// 每筆明細必須包含 productId，供 UI 透過 ID 查找圖片與即時資訊
export const orderDetails = {
  'SO-1001': {
    deliveryDate: '2026-03-27',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P001', name: '輕量防水工作鞋', package: '雙入包', qty: 2, unitPrice: 380, isGift: false, source: 'customer' },
      { productId: 'P003', name: '商務抗菌口罩', package: '盒裝', qty: 3, unitPrice: 180, isGift: false, source: 'customer' },
      { productId: 'GIFT001', name: '環保提袋', package: '單件', qty: 1, unitPrice: 0, isGift: true, source: 'system_gift' }
    ],
    reviewedItems: null,
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1002': {
    deliveryDate: '2026-03-25',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P002', name: '企業款保冷背包', package: '單件', qty: 4, unitPrice: 520, isGift: false, source: 'customer' },
      { productId: 'P008', name: '高效能保溫杯', package: '單件', qty: 3, unitPrice: 330, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P002', name: '企業款保冷背包', package: '單件', qty: 4, unitPrice: 520, isGift: false, source: 'customer' },
      { productId: 'P008', name: '高效能保溫杯', package: '單件', qty: 3, unitPrice: 330, isGift: false, source: 'customer' },
      { productId: 'P010', name: '專業導電筆', package: '單件', qty: 2, unitPrice: 140, isGift: false, source: 'sales_add' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1003': {
    deliveryDate: '2026-03-22',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P004', name: '專業工業手套', package: '雙入包', qty: 5, unitPrice: 260, isGift: false, source: 'customer' },
      { productId: 'P009', name: '辦公室桌上收納盒', package: '組合包', qty: 4, unitPrice: 190, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P004', name: '專業工業手套', package: '雙入包', qty: 5, unitPrice: 260, isGift: false, source: 'customer' },
      { productId: 'P009', name: '辦公室桌上收納盒', package: '組合包', qty: 4, unitPrice: 190, isGift: false, source: 'customer' },
      { productId: 'P007', name: '企業款筆記本', package: '本裝', qty: 2, unitPrice: 240, isGift: false, source: 'sales_add' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1004': {
    deliveryDate: null,
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P005', name: '環保無痕膠帶', package: '卷裝', qty: 10, unitPrice: 95, isGift: false, source: 'customer' },
      { productId: 'P008', name: '高效能保溫杯', package: '單件', qty: 2, unitPrice: 330, isGift: false, source: 'customer' }
    ],
    reviewedItems: null,
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1005': {
    deliveryDate: '2026-03-18',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P006', name: '快速充電行動電源', package: '單件', qty: 5, unitPrice: 620, isGift: false, source: 'customer' },
      { productId: 'P007', name: '企業款筆記本', package: '本裝', qty: 8, unitPrice: 240, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P006', name: '快速充電行動電源', package: '單件', qty: 5, unitPrice: 620, isGift: false, source: 'customer' },
      { productId: 'P007', name: '企業款筆記本', package: '本裝', qty: 10, unitPrice: 240, isGift: false, source: 'sales_edit' },
      { productId: 'GIFT001', name: '環保提袋', package: '單件', qty: 2, unitPrice: 0, isGift: true, source: 'system_gift' }
    ],
    transferredOrderId: 'ERP-20260310-0051',
    transferredTime: '2026-03-10 14:25:00'
  },
  'SO-1006': {
    deliveryDate: '2026-03-15',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P002', name: '企業款保冷背包', package: '單件', qty: 3, unitPrice: 520, isGift: false, source: 'customer' },
      { productId: 'P003', name: '商務抗菌口罩', package: '盒裝', qty: 5, unitPrice: 180, isGift: false, source: 'customer' },
      { productId: 'GIFT001', name: '環保提袋', package: '單件', qty: 1, unitPrice: 0, isGift: true, source: 'system_gift' }
    ],
    reviewedItems: null,
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1007': {
    deliveryDate: '2026-03-12',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P008', name: '高效能保溫杯', package: '單件', qty: 4, unitPrice: 330, isGift: false, source: 'customer' },
      { productId: 'P010', name: '專業導電筆', package: '單件', qty: 5, unitPrice: 140, isGift: false, source: 'customer' },
      { productId: 'P007', name: '企業款筆記本', package: '本裝', qty: 3, unitPrice: 240, isGift: false, source: 'sales_add' }
    ],
    reviewedItems: [
      { productId: 'P008', name: '高效能保溫杯', package: '單件', qty: 4, unitPrice: 330, isGift: false, source: 'customer' },
      { productId: 'P010', name: '專業導電筆', package: '單件', qty: 5, unitPrice: 140, isGift: false, source: 'customer' },
      { productId: 'P007', name: '企業款筆記本', package: '本裝', qty: 3, unitPrice: 240, isGift: false, source: 'sales_add' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1008': {
    deliveryDate: '2026-03-11',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P001', name: '輕量防水工作鞋', package: '雙入包', qty: 3, unitPrice: 380, isGift: false, source: 'customer' },
      { productId: 'P004', name: '專業工業手套', package: '雙入包', qty: 4, unitPrice: 260, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P001', name: '輕量防水工作鞋', package: '雙入包', qty: 3, unitPrice: 380, isGift: false, source: 'customer' },
      { productId: 'P004', name: '專業工業手套', package: '雙入包', qty: 4, unitPrice: 260, isGift: false, source: 'customer' },
      { productId: 'P005', name: '環保無痕膠帶', package: '卷裝', qty: 6, unitPrice: 95, isGift: false, source: 'sales_add' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1009': {
    deliveryDate: '2026-03-10',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P001', name: '輕量防水工作鞋', package: '雙入包', qty: 10, unitPrice: 380, isGift: false, source: 'customer' },
      { productId: 'P002', name: '企業款保冷背包', package: '單件', qty: 5, unitPrice: 520, isGift: false, source: 'customer' },
      { productId: 'GIFT002', name: '專業鞋墊組', package: '單件', qty: 1, unitPrice: 0, isGift: true, source: 'system_gift' }
    ],
    reviewedItems: [
      { productId: 'P001', name: '輕量防水工作鞋', package: '雙入包', qty: 10, unitPrice: 380, isGift: false, source: 'customer' },
      { productId: 'P002', name: '企業款保冷背包', package: '單件', qty: 5, unitPrice: 520, isGift: false, source: 'customer' },
      { productId: 'P003', name: '商務抗菌口罩', package: '盒裝', qty: 3, unitPrice: 180, isGift: false, source: 'sales_add' },
      { productId: 'GIFT002', name: '專業鞋墊組', package: '單件', qty: 1, unitPrice: 0, isGift: true, source: 'system_gift' }
    ],
    transferredOrderId: 'ERP-20260302-0089',
    transferredTime: '2026-03-02 09:40:00'
  },
  'SO-1010': {
    deliveryDate: '2026-03-07',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P009', name: '辦公室桌上收納盒', package: '組合包', qty: 6, unitPrice: 190, isGift: false, source: 'customer' },
      { productId: 'P006', name: '快速充電行動電源', package: '單件', qty: 4, unitPrice: 620, isGift: false, source: 'customer' },
      { productId: 'P007', name: '企業款筆記本', package: '本裝', qty: 2, unitPrice: 240, isGift: false, source: 'sales_add' }
    ],
    reviewedItems: [
      { productId: 'P009', name: '辦公室桌上收納盒', package: '組合包', qty: 6, unitPrice: 190, isGift: false, source: 'customer' },
      { productId: 'P006', name: '快速充電行動電源', package: '單件', qty: 4, unitPrice: 620, isGift: false, source: 'customer' },
      { productId: 'P007', name: '企業款筆記本', package: '本裝', qty: 2, unitPrice: 240, isGift: false, source: 'sales_add' },
      { productId: 'GIFT001', name: '環保提袋', package: '單件', qty: 2, unitPrice: 0, isGift: true, source: 'system_gift' }
    ],
    transferredOrderId: 'ERP-20260228-0032',
    transferredTime: '2026-02-28 11:10:00'
  },
  'SO-1011': {
    deliveryDate: '2026-02-27',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P002', name: '企業款保冷背包', package: '單件', qty: 4, unitPrice: 520, isGift: false, source: 'customer' },
      { productId: 'P007', name: '企業款筆記本', package: '本裝', qty: 5, unitPrice: 240, isGift: false, source: 'customer' }
    ],
    reviewedItems: null,
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1012': {
    deliveryDate: '2026-02-25',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P004', name: '專業工業手套', package: '雙入包', qty: 3, unitPrice: 260, isGift: false, source: 'customer' },
      { productId: 'P010', name: '專業導電筆', package: '單件', qty: 6, unitPrice: 140, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P004', name: '專業工業手套', package: '雙入包', qty: 3, unitPrice: 260, isGift: false, source: 'customer' },
      { productId: 'P010', name: '專業導電筆', package: '單件', qty: 6, unitPrice: 140, isGift: false, source: 'customer' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1013': {
    deliveryDate: '2026-02-23',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P005', name: '環保無痕膠帶', package: '卷裝', qty: 8, unitPrice: 95, isGift: false, source: 'customer' },
      { productId: 'P008', name: '高效能保溫杯', package: '單件', qty: 6, unitPrice: 330, isGift: false, source: 'customer' },
      { productId: 'GIFT001', name: '環保提袋', package: '單件', qty: 1, unitPrice: 0, isGift: true, source: 'system_gift' }
    ],
    reviewedItems: [
      { productId: 'P005', name: '環保無痕膠帶', package: '卷裝', qty: 8, unitPrice: 95, isGift: false, source: 'customer' },
      { productId: 'P008', name: '高效能保溫杯', package: '單件', qty: 6, unitPrice: 330, isGift: false, source: 'customer' },
      { productId: 'P003', name: '商務抗菌口罩', package: '盒裝', qty: 2, unitPrice: 180, isGift: false, source: 'sales_add' },
      { productId: 'GIFT001', name: '環保提袋', package: '單件', qty: 1, unitPrice: 0, isGift: true, source: 'system_gift' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1014': {
    deliveryDate: '2026-02-21',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P001', name: '輕量防水工作鞋', package: '雙入包', qty: 4, unitPrice: 380, isGift: false, source: 'customer' },
      { productId: 'P009', name: '辦公室桌上收納盒', package: '組合包', qty: 5, unitPrice: 260, isGift: false, source: 'customer' }
    ],
    reviewedItems: null,
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1015': {
    deliveryDate: null,
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P007', name: '企業款筆記本', package: '本裝', qty: 2, unitPrice: 240, isGift: false, source: 'customer' },
      { productId: 'P010', name: '專業導電筆', package: '單件', qty: 3, unitPrice: 140, isGift: false, source: 'customer' }
    ],
    reviewedItems: null,
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1016': {
    deliveryDate: '2026-02-16',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P006', name: '快速充電行動電源', package: '單件', qty: 6, unitPrice: 620, isGift: false, source: 'customer' },
      { productId: 'P002', name: '企業款保冷背包', package: '單件', qty: 3, unitPrice: 520, isGift: false, source: 'customer' },
      { productId: 'GIFT001', name: '環保提袋', package: '單件', qty: 2, unitPrice: 0, isGift: true, source: 'system_gift' }
    ],
    reviewedItems: [
      { productId: 'P006', name: '快速充電行動電源', package: '單件', qty: 6, unitPrice: 620, isGift: false, source: 'customer' },
      { productId: 'P002', name: '企業款保冷背包', package: '單件', qty: 3, unitPrice: 520, isGift: false, source: 'customer' },
      { productId: 'P008', name: '高效能保溫杯', package: '單件', qty: 4, unitPrice: 330, isGift: false, source: 'sales_add' },
      { productId: 'GIFT001', name: '環保提袋', package: '單件', qty: 2, unitPrice: 0, isGift: true, source: 'system_gift' }
    ],
    transferredOrderId: 'ERP-20260215-0024',
    transferredTime: '2026-02-15 10:30:00'
  },
  'SO-1017': {
    deliveryDate: '2026-02-14',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P003', name: '商務抗菌口罩', package: '盒裝', qty: 5, unitPrice: 180, isGift: false, source: 'customer' },
      { productId: 'P005', name: '環保無痕膠帶', package: '卷裝', qty: 4, unitPrice: 95, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P003', name: '商務抗菌口罩', package: '盒裝', qty: 5, unitPrice: 180, isGift: false, source: 'customer' },
      { productId: 'P005', name: '環保無痕膠帶', package: '卷裝', qty: 4, unitPrice: 95, isGift: false, source: 'customer' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1018': {
    deliveryDate: '2026-02-11',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P009', name: '辦公室桌上收納盒', package: '組合包', qty: 10, unitPrice: 190, isGift: false, source: 'customer' },
      { productId: 'P004', name: '專業工業手套', package: '雙入包', qty: 6, unitPrice: 260, isGift: false, source: 'customer' },
      { productId: 'P007', name: '企業款筆記本', package: '本裝', qty: 4, unitPrice: 240, isGift: false, source: 'sales_add' }
    ],
    reviewedItems: null,
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1019': {
    deliveryDate: '2026-02-09',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P008', name: '高效能保溫杯', package: '單件', qty: 5, unitPrice: 330, isGift: false, source: 'customer' },
      { productId: 'P001', name: '輕量防水工作鞋', package: '雙入包', qty: 2, unitPrice: 380, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P008', name: '高效能保溫杯', package: '單件', qty: 5, unitPrice: 330, isGift: false, source: 'customer' },
      { productId: 'P001', name: '輕量防水工作鞋', package: '雙入包', qty: 2, unitPrice: 380, isGift: false, source: 'customer' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1020': {
    deliveryDate: '2026-02-06',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P006', name: '快速充電行動電源', package: '單件', qty: 8, unitPrice: 620, isGift: false, source: 'customer' },
      { productId: 'P002', name: '企業款保冷背包', package: '單件', qty: 5, unitPrice: 520, isGift: false, source: 'customer' },
      { productId: 'GIFT002', name: '專業鞋墊組', package: '單件', qty: 2, unitPrice: 0, isGift: true, source: 'system_gift' }
    ],
    reviewedItems: [
      { productId: 'P006', name: '快速充電行動電源', package: '單件', qty: 8, unitPrice: 620, isGift: false, source: 'customer' },
      { productId: 'P002', name: '企業款保冷背包', package: '單件', qty: 5, unitPrice: 520, isGift: false, source: 'customer' },
      { productId: 'P003', name: '商務抗菌口罩', package: '盒裝', qty: 3, unitPrice: 180, isGift: false, source: 'sales_add' },
      { productId: 'GIFT002', name: '專業鞋墊組', package: '單件', qty: 2, unitPrice: 0, isGift: true, source: 'system_gift' }
    ],
    transferredOrderId: 'ERP-20260205-0018',
    transferredTime: '2026-02-05 15:20:00'
  },
  'SO-1021': {
    deliveryDate: '2026-02-04',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P010', name: '專業導電筆', package: '單件', qty: 5, unitPrice: 140, isGift: false, source: 'customer' },
      { productId: 'P005', name: '環保無痕膠帶', package: '卷裝', qty: 4, unitPrice: 95, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P010', name: '專業導電筆', package: '單件', qty: 5, unitPrice: 140, isGift: false, source: 'customer' },
      { productId: 'P005', name: '環保無痕膠帶', package: '卷裝', qty: 4, unitPrice: 95, isGift: false, source: 'customer' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1022': {
    deliveryDate: null,
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P007', name: '企業款筆記本', package: '本裝', qty: 8, unitPrice: 240, isGift: false, source: 'customer' },
      { productId: 'P009', name: '辦公室桌上收納盒', package: '組合包', qty: 7, unitPrice: 190, isGift: false, source: 'customer' }
    ],
    reviewedItems: null,
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1023': {
    deliveryDate: '2026-01-29',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P004', name: '專業工業手套', package: '雙入包', qty: 6, unitPrice: 260, isGift: false, source: 'customer' },
      { productId: 'P008', name: '高效能保溫杯', package: '單件', qty: 3, unitPrice: 330, isGift: false, source: 'customer' }
    ],
    reviewedItems: null,
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1024': {
    deliveryDate: '2026-01-26',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P001', name: '輕量防水工作鞋', package: '雙入包', qty: 5, unitPrice: 380, isGift: false, source: 'customer' },
      { productId: 'P006', name: '快速充電行動電源', package: '單件', qty: 5, unitPrice: 620, isGift: false, source: 'customer' },
      { productId: 'GIFT001', name: '環保提袋', package: '單件', qty: 1, unitPrice: 0, isGift: true, source: 'system_gift' }
    ],
    reviewedItems: [
      { productId: 'P001', name: '輕量防水工作鞋', package: '雙入包', qty: 5, unitPrice: 380, isGift: false, source: 'customer' },
      { productId: 'P006', name: '快速充電行動電源', package: '單件', qty: 5, unitPrice: 620, isGift: false, source: 'customer' },
      { productId: 'P007', name: '企業款筆記本', package: '本裝', qty: 3, unitPrice: 240, isGift: false, source: 'sales_add' },
      { productId: 'GIFT001', name: '環保提袋', package: '單件', qty: 1, unitPrice: 0, isGift: true, source: 'system_gift' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1025': {
    deliveryDate: '2026-01-23',
    salesCompany: '環球流通有限公司',
    items: [
      { productId: 'P003', name: '商務抗菌口罩', package: '盒裝', qty: 4, unitPrice: 180, isGift: false, source: 'customer' },
      { productId: 'P010', name: '專業導電筆', package: '單件', qty: 8, unitPrice: 140, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P003', name: '商務抗菌口罩', package: '盒裝', qty: 4, unitPrice: 180, isGift: false, source: 'customer' },
      { productId: 'P010', name: '專業導電筆', package: '單件', qty: 8, unitPrice: 140, isGift: false, source: 'customer' }
    ],
    transferredOrderId: null,
    transferredTime: null
  }
}
