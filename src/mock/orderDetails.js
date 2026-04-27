// 詳細訂單資料，依 orderId 索引
// source 值說明：
//   customer    → 原始客戶明細
//   sales_add   → 業務審單時新增
//   sales_edit  → 業務審單時修改
//   system_gift → 二階系統贈品 / 二階修改
const rawOrderDetails = {
  'SO-1027': {
    deliveryDate: '2026-04-12',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P001', name: '台灣啤酒（罐裝）', package: '箱/24罐', qty: 8, unitPrice: 580, isGift: false, source: 'customer' },
      { productId: 'P006', name: '黑松沙士（罐裝）', package: '箱/24罐', qty: 10, unitPrice: 400, isGift: false, source: 'customer' },
      { productId: 'P009', name: '可口可樂（罐裝）', package: '箱/24罐', qty: 6, unitPrice: 440, isGift: false, source: 'customer' },
      { productId: 'GFT100', name: '品牌環保袋', package: '單罐', qty: 1, unitPrice: 0, isGift: true, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P001', name: '台灣啤酒（罐裝）', package: '箱/24罐', qty: 8, unitPrice: 580, isGift: false, source: 'customer' },
      { productId: 'P006', name: '黑松沙士（罐裝）', package: '箱/24罐', qty: 10, unitPrice: 400, isGift: false, source: 'customer' },
      { productId: 'P009', name: '可口可樂（罐裝）', package: '箱/24罐', qty: 6, unitPrice: 440, isGift: false, source: 'customer' },
      { productId: 'GFT100', name: '品牌環保袋', package: '單罐', qty: 1, unitPrice: 0, isGift: true, source: 'customer' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1028': {
    deliveryDate: '2026-04-11',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P002', name: '麥香紅茶（利樂包）', package: '箱/24罐', qty: 12, unitPrice: 360, isGift: false, source: 'customer' },
      { productId: 'P005', name: '舒跑運動飲料（瓶裝）', package: '箱/24罐', qty: 10, unitPrice: 460, isGift: false, source: 'customer' },
      { productId: 'P008', name: '光泉鮮乳（瓶裝）', package: '束/6罐', qty: 6, unitPrice: 480, isGift: false, source: 'customer' },
      { productId: 'GIFT001', name: '品牌帆布袋', package: '單罐', qty: 1, unitPrice: 0, isGift: true, isGiftCode: true, source: 'sales_add', sourceLabel: '二階修改' },
      { productId: 'GFT200', name: '品牌環保袋', package: '單罐', qty: 1, unitPrice: 0, isGift: true, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P002', name: '麥香紅茶（利樂包）', package: '箱/24罐', qty: 12, unitPrice: 360, isGift: false, source: 'customer' },
      { productId: 'P005', name: '舒跑運動飲料（瓶裝）', package: '箱/24罐', qty: 10, unitPrice: 460, isGift: false, source: 'customer' },
      { productId: 'P008', name: '光泉鮮乳（瓶裝）', package: '束/6罐', qty: 6, unitPrice: 480, isGift: false, source: 'customer' },
      { productId: 'GIFT001', name: '品牌帆布袋', package: '單罐', qty: 1, unitPrice: 0, isGift: true, isGiftCode: true, source: 'sales_add', sourceLabel: '二階修改' },
      { productId: 'GFT200', name: '品牌環保袋', package: '單罐', qty: 1, unitPrice: 0, isGift: true, source: 'customer' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1029': {
    deliveryDate: '2026-04-13',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P001', name: '台灣啤酒（罐裝）', package: '箱/24罐', qty: 8, unitPrice: 580, isGift: false, source: 'customer' },
      { productId: 'P006', name: '黑松沙士（罐裝）', package: '箱/24罐', qty: 6, unitPrice: 400, isGift: false, source: 'customer' },
      { productId: 'P009', name: '可口可樂（罐裝）', package: '箱/24罐', qty: 10, unitPrice: 440, isGift: false, source: 'customer' },
      { productId: 'GFT300', name: '品牌吊牌', package: '單罐', qty: 1, unitPrice: 0, isGift: true, isGiftCode: false, source: 'sales_add', sourceLabel: '系統贈品' },
      { productId: 'GFT301', name: '品牌環保袋', package: '單罐', qty: 1, unitPrice: 0, isGift: true, isGiftCode: false, source: 'sales_add', sourceLabel: '系統贈品' }
    ],
    reviewedItems: null,
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1001': {
    deliveryDate: '2026-04-10',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P001', name: '台灣啤酒（罐裝）', package: '箱/24罐', qty: 10, unitPrice: 580, isGift: false, source: 'customer' },
      { productId: 'P006', name: '黑松沙士（罐裝）', package: '箱/24罐', qty: 12, unitPrice: 400, isGift: false, source: 'customer' },
      { productId: 'GIFT001', name: '品牌帆布袋', package: '單罐', qty: 1, unitPrice: 0, isGift: true, source: 'system_gift' }
    ],
    reviewedItems: null,
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1002': {
    deliveryDate: '2026-04-08',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P009', name: '可口可樂（罐裝）', package: '箱/24罐', qty: 20, unitPrice: 440, isGift: false, source: 'customer' },
      { productId: 'P002', name: '麥香紅茶（利樂包）', package: '箱/24罐', qty: 15, unitPrice: 360, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P009', name: '可口可樂（罐裝）', package: '箱/24罐', qty: 20, unitPrice: 440, isGift: false, source: 'customer' },
      { productId: 'P002', name: '麥香紅茶（利樂包）', package: '箱/24罐', qty: 15, unitPrice: 360, isGift: false, source: 'customer' },
      { productId: 'P010', name: '百事可樂（寶特瓶）', package: '打/12罐', qty: 5, unitPrice: 390, isGift: false, source: 'sales_add' }
    ],
    transferredOrderId: null,
    transferredTime: null,
    failureReason: '二階回傳失敗，產品代號與庫存資料不一致'
  },
  'SO-1003': {
    deliveryDate: '2026-04-07',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P007', name: '御茶園每朝健康綠茶', package: '箱/24罐', qty: 10, unitPrice: 520, isGift: false, source: 'customer' },
      { productId: 'P004', name: '統一奶茶（寶特瓶）', package: '打/12罐', qty: 8, unitPrice: 380, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P007', name: '御茶園每朝健康綠茶', package: '箱/24罐', qty: 10, unitPrice: 520, isGift: false, source: 'customer' },
      { productId: 'P004', name: '統一奶茶（寶特瓶）', package: '打/12罐', qty: 8, unitPrice: 380, isGift: false, source: 'customer' },
      { productId: 'P003', name: '維他露 O 鋁罐', package: '箱/24罐', qty: 4, unitPrice: 420, isGift: false, source: 'sales_add' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1004': {
    deliveryDate: null,
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P005', name: '舒跑運動飲料（瓶裝）', package: '箱/24罐', qty: 8, unitPrice: 460, isGift: false, source: 'customer' },
      { productId: 'P003', name: '維他露 O 鋁罐', package: '箱/24罐', qty: 5, unitPrice: 420, isGift: false, source: 'customer' }
    ],
    reviewedItems: null,
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1005': {
    deliveryDate: '2026-04-02',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P001', name: '台灣啤酒（罐裝）', package: '箱/24罐', qty: 36, unitPrice: 560, isGift: false, source: 'customer' },
      { productId: 'P006', name: '黑松沙士（罐裝）', package: '箱/24罐', qty: 20, unitPrice: 390, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P001', name: '台灣啤酒（罐裝）', package: '箱/24罐', qty: 40, unitPrice: 560, isGift: false, source: 'sales_edit' },
      { productId: 'P006', name: '黑松沙士（罐裝）', package: '箱/24罐', qty: 20, unitPrice: 390, isGift: false, source: 'customer' },
      { productId: 'GIFT001', name: '品牌帆布袋', package: '單罐', qty: 2, unitPrice: 0, isGift: true, source: 'system_gift' }
    ],
    transferredOrderId: 'ERP-20260402-0051',
    transferredTime: '2026-04-02 14:25:00',
    failureReason: '二階回傳失敗，價格資料尚未同步'
  },
  'SO-1006': {
    deliveryDate: '2026-04-01',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P009', name: '可口可樂（罐裝）', package: '箱/24罐', qty: 18, unitPrice: 440, isGift: false, source: 'customer' },
      { productId: 'P002', name: '麥香紅茶（利樂包）', package: '箱/24罐', qty: 16, unitPrice: 350, isGift: false, source: 'customer' },
      { productId: 'GIFT001', name: '品牌帆布袋', package: '單罐', qty: 1, unitPrice: 0, isGift: true, source: 'system_gift' }
    ],
    reviewedItems: null,
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1007': {
    deliveryDate: '2026-03-30',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P008', name: '光泉鮮乳（瓶裝）', package: '束/6罐', qty: 20, unitPrice: 480, isGift: false, source: 'customer' },
      { productId: 'P007', name: '御茶園每朝健康綠茶', package: '箱/24罐', qty: 12, unitPrice: 520, isGift: false, source: 'customer' },
      { productId: 'P004', name: '統一奶茶（寶特瓶）', package: '箱/24罐', qty: 3, unitPrice: 740, isGift: false, source: 'sales_add' }
    ],
    reviewedItems: [
      { productId: 'P008', name: '光泉鮮乳（瓶裝）', package: '束/6罐', qty: 20, unitPrice: 480, isGift: false, source: 'customer' },
      { productId: 'P007', name: '御茶園每朝健康綠茶', package: '箱/24罐', qty: 12, unitPrice: 520, isGift: false, source: 'customer' },
      { productId: 'P004', name: '統一奶茶（寶特瓶）', package: '箱/24罐', qty: 3, unitPrice: 740, isGift: false, source: 'sales_add' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1008': {
    deliveryDate: '2026-03-28',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P005', name: '舒跑運動飲料（瓶裝）', package: '箱/24罐', qty: 14, unitPrice: 460, isGift: false, source: 'customer' },
      { productId: 'P003', name: '維他露 O 鋁罐', package: '箱/24罐', qty: 16, unitPrice: 420, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P005', name: '舒跑運動飲料（瓶裝）', package: '箱/24罐', qty: 14, unitPrice: 460, isGift: false, source: 'customer' },
      { productId: 'P003', name: '維他露 O 鋁罐', package: '箱/24罐', qty: 16, unitPrice: 420, isGift: false, source: 'customer' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1009': {
    deliveryDate: '2026-03-25',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P001', name: '台灣啤酒（罐裝）', package: '箱/24罐', qty: 44, unitPrice: 560, isGift: false, source: 'customer' },
      { productId: 'P009', name: '可口可樂（罐裝）', package: '箱/24罐', qty: 20, unitPrice: 430, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P001', name: '台灣啤酒（罐裝）', package: '箱/24罐', qty: 44, unitPrice: 560, isGift: false, source: 'customer' },
      { productId: 'P009', name: '可口可樂（罐裝）', package: '箱/24罐', qty: 20, unitPrice: 430, isGift: false, source: 'customer' }
    ],
    transferredOrderId: 'ERP-20260325-0089',
    transferredTime: '2026-03-25 10:12:00',
    failureReason: '二階回傳失敗，客戶主檔暫時無法匹配'
  },
  'SO-1010': {
    deliveryDate: '2026-03-23',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P002', name: '麥香紅茶（利樂包）', package: '箱/24罐', qty: 32, unitPrice: 350, isGift: false, source: 'customer' },
      { productId: 'P010', name: '百事可樂（寶特瓶）', package: '打/12罐', qty: 8, unitPrice: 390, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P002', name: '麥香紅茶（利樂包）', package: '箱/24罐', qty: 32, unitPrice: 350, isGift: false, source: 'customer' },
      { productId: 'P010', name: '百事可樂（寶特瓶）', package: '打/12罐', qty: 8, unitPrice: 390, isGift: false, source: 'customer' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1011': {
    deliveryDate: '2026-03-20',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P006', name: '黑松沙士（罐裝）', package: '箱/24罐', qty: 12, unitPrice: 400, isGift: false, source: 'customer' },
      { productId: 'P007', name: '御茶園每朝健康綠茶', package: '箱/24罐', qty: 8, unitPrice: 520, isGift: false, source: 'customer' }
    ],
    reviewedItems: null,
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1012': {
    deliveryDate: '2026-03-18',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P005', name: '舒跑運動飲料（瓶裝）', package: '箱/24罐', qty: 6, unitPrice: 460, isGift: false, source: 'customer' },
      { productId: 'P004', name: '統一奶茶（寶特瓶）', package: '打/12罐', qty: 10, unitPrice: 380, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P005', name: '舒跑運動飲料（瓶裝）', package: '箱/24罐', qty: 6, unitPrice: 460, isGift: false, source: 'customer' },
      { productId: 'P004', name: '統一奶茶（寶特瓶）', package: '打/12罐', qty: 10, unitPrice: 380, isGift: false, source: 'customer' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1013': {
    deliveryDate: '2026-03-16',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P001', name: '台灣啤酒（罐裝）', package: '箱/24罐', qty: 32, unitPrice: 560, isGift: false, source: 'customer' },
      { productId: 'P008', name: '光泉鮮乳（瓶裝）', package: '打/12罐', qty: 12, unitPrice: 940, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P001', name: '台灣啤酒（罐裝）', package: '箱/24罐', qty: 32, unitPrice: 560, isGift: false, source: 'customer' },
      { productId: 'P008', name: '光泉鮮乳（瓶裝）', package: '打/12罐', qty: 12, unitPrice: 940, isGift: false, source: 'customer' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1014': {
    deliveryDate: null,
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P003', name: '維他露 O 鋁罐', package: '箱/24罐', qty: 14, unitPrice: 420, isGift: false, source: 'customer' },
      { productId: 'P009', name: '可口可樂（罐裝）', package: '箱/24罐', qty: 10, unitPrice: 440, isGift: false, source: 'customer' }
    ],
    reviewedItems: null,
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1015': {
    deliveryDate: null,
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P010', name: '百事可樂（寶特瓶）', package: '打/12罐', qty: 8, unitPrice: 390, isGift: false, source: 'customer' },
      { productId: 'P006', name: '黑松沙士（罐裝）', package: '箱/24罐', qty: 6, unitPrice: 400, isGift: false, source: 'customer' }
    ],
    reviewedItems: null,
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1016': {
    deliveryDate: '2026-03-14',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P001', name: '台灣啤酒（罐裝）', package: '箱/24罐', qty: 40, unitPrice: 560, isGift: false, source: 'customer' },
      { productId: 'P005', name: '舒跑運動飲料（瓶裝）', package: '箱/24罐', qty: 12, unitPrice: 460, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P001', name: '台灣啤酒（罐裝）', package: '箱/24罐', qty: 40, unitPrice: 560, isGift: false, source: 'customer' },
      { productId: 'P005', name: '舒跑運動飲料（瓶裝）', package: '箱/24罐', qty: 12, unitPrice: 460, isGift: false, source: 'customer' }
    ],
    transferredOrderId: 'ERP-20260314-0098',
    transferredTime: '2026-03-14 09:30:00',
    failureReason: '二階回傳失敗，配送單位驗證未通過'
  },
  'SO-1017': {
    deliveryDate: '2026-03-12',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P002', name: '麥香紅茶（利樂包）', package: '箱/24罐', qty: 18, unitPrice: 360, isGift: false, source: 'customer' },
      { productId: 'P007', name: '御茶園每朝健康綠茶', package: '箱/24罐', qty: 14, unitPrice: 520, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P002', name: '麥香紅茶（利樂包）', package: '箱/24罐', qty: 18, unitPrice: 360, isGift: false, source: 'customer' },
      { productId: 'P007', name: '御茶園每朝健康綠茶', package: '箱/24罐', qty: 14, unitPrice: 520, isGift: false, source: 'customer' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1018': {
    deliveryDate: null,
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P008', name: '光泉鮮乳（瓶裝）', package: '束/6罐', qty: 24, unitPrice: 480, isGift: false, source: 'customer' },
      { productId: 'P009', name: '可口可樂（罐裝）', package: '箱/24罐', qty: 14, unitPrice: 440, isGift: false, source: 'customer' }
    ],
    reviewedItems: null,
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1019': {
    deliveryDate: '2026-03-08',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P004', name: '統一奶茶（寶特瓶）', package: '箱/24罐', qty: 6, unitPrice: 740, isGift: false, source: 'customer' },
      { productId: 'P003', name: '維他露 O 鋁罐', package: '箱/24罐', qty: 8, unitPrice: 420, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P004', name: '統一奶茶（寶特瓶）', package: '箱/24罐', qty: 6, unitPrice: 740, isGift: false, source: 'customer' },
      { productId: 'P003', name: '維他露 O 鋁罐', package: '箱/24罐', qty: 8, unitPrice: 420, isGift: false, source: 'customer' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1020': {
    deliveryDate: '2026-03-07',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P001', name: '台灣啤酒（罐裝）', package: '箱/24罐', qty: 50, unitPrice: 560, isGift: false, source: 'customer' },
      { productId: 'P006', name: '黑松沙士（罐裝）', package: '箱/24罐', qty: 30, unitPrice: 390, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P001', name: '台灣啤酒（罐裝）', package: '箱/24罐', qty: 50, unitPrice: 560, isGift: false, source: 'customer' },
      { productId: 'P006', name: '黑松沙士（罐裝）', package: '箱/24罐', qty: 30, unitPrice: 390, isGift: false, source: 'customer' }
    ],
    transferredOrderId: 'ERP-20260307-0122',
    transferredTime: '2026-03-07 16:48:00'
  },
  'SO-1021': {
    deliveryDate: '2026-03-05',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P009', name: '可口可樂（罐裝）', package: '箱/24罐', qty: 10, unitPrice: 440, isGift: false, source: 'customer' },
      { productId: 'P010', name: '百事可樂（寶特瓶）', package: '打/12罐', qty: 12, unitPrice: 390, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P009', name: '可口可樂（罐裝）', package: '箱/24罐', qty: 10, unitPrice: 440, isGift: false, source: 'customer' },
      { productId: 'P010', name: '百事可樂（寶特瓶）', package: '打/12罐', qty: 12, unitPrice: 390, isGift: false, source: 'customer' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1022': {
    deliveryDate: null,
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P007', name: '御茶園每朝健康綠茶', package: '箱/24罐', qty: 24, unitPrice: 520, isGift: false, source: 'customer' },
      { productId: 'P002', name: '麥香紅茶（利樂包）', package: '箱/24罐', qty: 12, unitPrice: 360, isGift: false, source: 'customer' }
    ],
    reviewedItems: null,
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1023': {
    deliveryDate: null,
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P005', name: '舒跑運動飲料（瓶裝）', package: '箱/24罐', qty: 16, unitPrice: 460, isGift: false, source: 'customer' },
      { productId: 'P008', name: '光泉鮮乳（瓶裝）', package: '束/6罐', qty: 8, unitPrice: 480, isGift: false, source: 'customer' }
    ],
    reviewedItems: null,
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1024': {
    deliveryDate: '2026-03-02',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P001', name: '台灣啤酒（罐裝）', package: '箱/24罐', qty: 36, unitPrice: 560, isGift: false, source: 'customer' },
      { productId: 'P004', name: '統一奶茶（寶特瓶）', package: '箱/24罐', qty: 10, unitPrice: 740, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P001', name: '台灣啤酒（罐裝）', package: '箱/24罐', qty: 36, unitPrice: 560, isGift: false, source: 'customer' },
      { productId: 'P004', name: '統一奶茶（寶特瓶）', package: '箱/24罐', qty: 10, unitPrice: 740, isGift: false, source: 'customer' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1025': {
    deliveryDate: '2026-02-28',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P003', name: '維他露 O 鋁罐', package: '箱/24罐', qty: 10, unitPrice: 420, isGift: false, source: 'customer' },
      { productId: 'P006', name: '黑松沙士（罐裝）', package: '箱/24罐', qty: 8, unitPrice: 400, isGift: false, source: 'customer' },
      { productId: 'P009', name: '可口可樂（罐裝）', package: '箱/24罐', qty: 6, unitPrice: 440, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P003', name: '維他露 O 鋁罐', package: '箱/24罐', qty: 10, unitPrice: 420, isGift: false, source: 'customer' },
      { productId: 'P006', name: '黑松沙士（罐裝）', package: '箱/24罐', qty: 8, unitPrice: 400, isGift: false, source: 'customer' },
      { productId: 'P009', name: '可口可樂（罐裝）', package: '箱/24罐', qty: 6, unitPrice: 440, isGift: false, source: 'customer' }
    ],
    transferredOrderId: null,
    transferredTime: null
  },
  'SO-1026': {
    deliveryDate: '2026-02-24',
    salesCompany: '台飲流通股份有限公司',
    items: [
      { productId: 'P001', name: '台灣啤酒（罐裝）', package: '箱/24罐', qty: 12, unitPrice: 560, isGift: false, source: 'customer' },
      { productId: 'P002', name: '麥香紅茶（利樂包）', package: '箱/24罐', qty: 10, unitPrice: 360, isGift: false, source: 'customer' }
    ],
    reviewedItems: [
      { productId: 'P001', name: '台灣啤酒（罐裝）', package: '箱/24罐', qty: 12, unitPrice: 560, isGift: false, source: 'customer' },
      { productId: 'P002', name: '麥香紅茶（利樂包）', package: '箱/24罐', qty: 10, unitPrice: 360, isGift: false, source: 'customer' }
    ],
    transferredOrderId: null,
    transferredTime: null,
    failureReason: '二階回傳失敗，訂單編號未建立或已逾時'
  }
}

function inferOrderSource (detail) {
  const items = [...(Array.isArray(detail.reviewedItems) ? detail.reviewedItems : []), ...(Array.isArray(detail.items) ? detail.items : [])]
  if (detail.transferredOrderId) return 'transfer'
  if (items.some(item => item.source === 'sales_add' || item.source === 'sales_edit')) return 'sales'
  return 'customer'
}

function normalizeItemSourceLabel (source) {
  if (source === 'customer') return '客戶訂單'
  if (source === 'sales_add' || source === 'sales_edit') return '審單修改'
  if (source === 'system_gift') return '系統贈品'
  return '客戶訂單'
}

function normalizeDetailItem (item) {
  const source = item.source || (item.isGift ? 'system_gift' : 'customer')
  const isGiftCode = item.isGiftCode !== undefined
    ? !!item.isGiftCode
    : (source === 'system_gift' || /^GIFT/i.test(item.productId || ''))
  return {
    ...item,
    source,
    isGiftCode,
    sourceLabel: item.sourceLabel || normalizeItemSourceLabel(source)
  }
}

export const orderDetails = Object.fromEntries(
  Object.entries(rawOrderDetails).map(([orderId, detail]) => {
    const latestItems = Array.isArray(detail.reviewedItems) && detail.reviewedItems.length > 0
      ? detail.reviewedItems.map(normalizeDetailItem)
      : (Array.isArray(detail.items) ? detail.items.map(normalizeDetailItem) : [])
    return [
      orderId,
      {
        ...detail,
        orderSource: inferOrderSource(detail),
        inOutCode: detail.transferredOrderId || `IO-${orderId}`,
        latestItems
      }
    ]
  })
)
