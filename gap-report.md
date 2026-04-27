| # | 項目 | 對應檔案 | 狀態 | 備註 |
|---|------|----------|------|------|
| 1 | 商品卡規格欄位改為下拉式選單，預設值需與二階打單系統一致 | `src/views/Products.vue`<br>`src/views/Cart.vue`<br>`src/views/OrderReview.vue` | 已實作 | 產品卡、購物車與審單皆已使用下拉式包裝選單，預設值取第一個包裝項目。 |
| 2 | 商品卡尺寸縮小，讓同一畫面可顯示更多卡片 | `src/views/Products.vue` | 已實作 | 商品卡與格狀版面已改為較緊湊的卡片尺寸。 |
| 3 | 商品卡上加入促銷商品 icon 標示 | `src/views/Products.vue` | 未實作 | 目前只有收藏愛心，沒有獨立的促銷商品 icon。 |
| 4 | 首頁公告欄拆成兩個區塊：「公告欄」與「促銷商品」，促銷公告放首頁即可 | `src/views/Home.vue`<br>`src/mock/announcements.js`<br>`src/mock/promotions.js` | 已實作 | 首頁已分成公告欄與促銷商品兩區，促銷公告只放首頁。 |
| 5 | 商品目錄頁加入促銷商品公告，需包含目前進行中及未來預告 | `src/views/Products.vue` | 已實作 | 已分成「目前促銷」與「未來方案預告」兩欄。 |
| 6 | 商品目錄頁加入「我的最愛」功能入口 | `src/views/Products.vue`<br>`src/views/Favorites.vue`<br>`src/layouts/DefaultLayout.vue`<br>`src/router/index.js` | 已實作 | 已有收藏入口、收藏頁與導覽列入口。 |
| 7 | 產品目錄頁面下方預留 banner 版位 | `src/views/Products.vue` | 已實作 | 已有 banner placeholder 區塊。 |
| 8 | 商品分類功能暫不開發 | `src/views/Products.vue` | 已實作 | 目前未提供商品分類 UI 或路由，符合暫不開發。 |
| 9 | 購物車中銷售公司名稱後面顯示該公司的品項數量 | `src/views/Cart.vue` | 已實作 | 已顯示 `品項數 / 件數`。 |
| 10 | 促銷活動區塊下方加入 SP 方案公佈欄 | `src/views/Cart.vue` | 已實作 | 已新增 SP 方案公佈欄區塊。 |
| 11 | 包裝別改為下拉式選單，顯示格式為「箱／24罐」 | `src/views/Cart.vue`<br>`src/views/Products.vue`<br>`src/views/OrderReview.vue`<br>`src/mock/products.js` | 已實作 | 下拉式包裝已存在，顯示字串為 `箱/24罐` 這類格式。 |
| 12 | 客戶端訂單不顯示配送單位欄位 | `src/views/OrderDetail.vue` | 已實作 | 客戶端檢視已隱藏配送單位。 |
| 13 | 訂單列表顯示所有來源的訂單，並加上訂單來源欄位 | `src/views/Orders.vue`<br>`src/views/OrderDetail.vue`<br>`src/mock/orders.js` | 已實作 | 列表已顯示來源欄位，且未限制來源類型。 |
| 14 | 訂單來源欄位：客戶端不顯示，業務端顯示 | `src/views/Orders.vue`<br>`src/views/OrderDetail.vue` | 已實作 | 客戶端隱藏來源欄位，業務端顯示。 |
| 15 | 訂單狀態名稱修改：「待審核」→「業務確認中」、「已拋轉」→「訂單處理中」 | `src/components/StatusBadge.vue`<br>`src/views/Orders.vue` | 部分實作 | 業務端 badge 與部分篩選文案已改，但客戶端狀態篩選仍保留舊文案。 |
| 16 | 頁面名稱「業務審核後明細」改為「訂單明細」，只保留最新明細 | `src/views/OrderDetail.vue` | 已實作 | 頁面標題已改為訂單明細，顯示以最新明細為主。 |
| 17 | 訂單來源標示規則：業務審單時修改標為「審單修改」；二階修改不論誰改都標為「二階修改」 | `src/views/OrderReview.vue`<br>`src/views/OrderDetail.vue`<br>`src/mock/orderDetails.js` | 未實作 | 目前仍使用 `客戶送單 / 業務新增 / 系統贈品` 等舊標示，未改成指定規則。 |
| 18 | 業務訂單新增進出貨代號欄位 | `src/mock/orderDetails.js`<br>`src/views/OrderReview.vue`<br>`src/views/OrderDetail.vue` | 部分實作 | 資料層已有 `inOutCode`，但畫面尚未完整呈現。 |
| 19 | 贈品代號的訂單只需核對庫存，不做其他審核 | `src/views/OrderReview.vue` | 部分實作 | 系統贈品列已有獨立處理與禁編輯，但尚未拆成單純庫存核對流程。 |
| 20 | 贈品註記改為勾選方式（checkbox） | `src/views/OrderReview.vue` | 已實作 | 已改成 checkbox 勾選。 |
| 21 | 業務審單頁：拋轉失敗時顯示失敗原因 | `src/views/OrderReview.vue` | 未實作 | 失敗原因目前只在訂單明細頁顯示，審單頁尚未呈現。 |
| 22 | 盤點日期固定為當日，不提供手動修改 | `src/views/InventoryCheckDetail.vue` | 已實作 | 日期欄位已鎖定為當日且不可手動修改。 |
| 23 | 盤點內容加入有效日期欄位（最差日期） | `src/views/InventoryCheckDetail.vue`<br>`src/views/InventoryRecordDetail.vue`<br>`src/mock/inventoryRecords.js` | 已實作 | 盤點輸入與記錄明細都已支援有效日期。 |
| 24 | 支援相機掃描國際條碼（barcode） | `src/views/InventoryCheckDetail.vue`<br>`src/views/InventoryChecks.vue` | 未實作 | 目前只有拍照上傳，沒有 barcode 掃描能力。 |
| 25 | 業務首頁「待審核筆數」旁新增公佈欄區塊 | `src/views/Home.vue` | 已實作 | 業務首頁上排已包含待審核卡與公佈欄。 |
| 26 | 業績圖表新增：當日成交客戶數、當日業績（區分業務下單與客戶下單） | `src/views/Home.vue` | 已實作 | 已補當日成交客戶數、當日業績與來源拆分。 |
| 27 | 已取得訂單的客戶在今日班表上加上註記 | `src/views/Home.vue`<br>`src/mock/schedule.js` | 未實作 | 班表只有時間與 GPS 標示，尚未對已取得訂單客戶加註記。 |
| 28 | 今日班表顯示周行程客戶清單並結合 GPS 排序，點選客戶可跳轉至訂單作業 | `src/views/Home.vue`<br>`src/mock/schedule.js` | 部分實作 | 已有周行程清單與點選跳轉，但尚未依 GPS 排序。 |
| 29 | 今日店家來源合併：GPS 定位附近店家 + 二階周行程客戶名單 | `src/views/Home.vue`<br>`src/views/InventoryChecks.vue`<br>`src/mock/customers.js`<br>`src/mock/schedule.js` | 未實作 | 目前 GPS 附近店家與周行程仍是兩套獨立來源，尚未合併。 |
| 30 | 訂單頁與庫存頁的客戶清單提供兩種排序：業務負責客戶 GPS 排序、全部客戶 GPS 排序 | `src/views/Orders.vue`<br>`src/views/InventoryChecks.vue` | 未實作 | 目前只有單一排序邏輯，尚未提供兩種切換。 |
| 31 | 市場活動「適用店家」清單依 GPS 距離排序 | `src/views/Promotions.vue`<br>`src/mock/promotionActivities.js` | 未實作 | 目前依公司名稱排序，未依 GPS 距離排序。 |
| 32 | 版面顏色主題提供四種選項，業務可自行切換 | `src/App.vue`<br>`src/components/ThemeSwitcher.vue` | 已實作 | 已有四種主題，且可由浮動切換器切換。 |
| 33 | 系統名稱全站改為「MSM2」 | `src/App.vue`<br>`src/layouts/DefaultLayout.vue` | 已實作 | 主要品牌字樣已改為 MSM2。 |

**統計摘要**
- 已實作 21 項
- 部分實作 4 項
- 未實作 8 項
