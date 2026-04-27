const rawAnnouncements = [
  {
    id: 1,
    date: '2026-04-01',
    category: '促銷活動',
    title: '4 月份促銷活動正式開跑，滿 5 件即送贈品',
    body: '親愛的客戶您好，4 月份促銷活動自即日起正式啟動。凡單筆訂單達 5 件（任意品項）即自動附贈精選贈品一份，數量有限，先到先得。如需確認活動細則，請至「市場活動」頁面查看完整說明，或聯繫您的業務窗口。',
    isUrgent: true,
    link: { label: '立即前往查看活動', path: '/promotions' }
  },
  {
    id: 2,
    date: '2026-03-25',
    category: '系統公告',
    title: '系統維護公告：3/29 凌晨 2:00–4:00 暫停服務',
    body: '為提升整體服務品質，系統將於 2026 年 3 月 29 日（日）凌晨 02:00 至 04:00 進行例行維護，維護期間將暫停所有訂單提交與查詢服務。建議您提前完成訂單送出作業。如有緊急需求，請聯繫您的業務窗口。',
    isUrgent: false,
    link: null
  },
  {
    id: 3,
    date: '2026-03-18',
    category: '新品上架',
    title: '新品上架：輕量防水工作鞋雙入包限量供應中',
    body: '全新系列輕量防水工作鞋（型號 WS-2026L）現已正式上架，以雙入組限量供應。採用第三代防水膜技術，重量較上一代減輕 18%，適合長時間站立作業環境。庫存有限，歡迎儘早下單確保貨源。',
    isUrgent: false,
    link: { label: '前往產品目錄', path: '/products' }
  }
]

export const announcements = rawAnnouncements.map(item => ({
  ...item,
  kind: 'announcement',
  placement: ['home'],
  audience: ['customer', 'sales']
}))
