<template>
  <div class="orders-page">

    <!-- 頁面標題 -->
    <div class="page-title-block">
      <h2 class="page-title">訂單列表</h2>
    </div>

    <!-- 篩選列 -->
    <div class="filter-bar">
      <select v-if="isGroupAdmin" v-model="filterCompany" class="filter-select">
        <option value="">全部公司</option>
        <option v-for="co in companies" :key="co" :value="co">{{ co }}</option>
      </select>
      <select v-model="filterStatus" class="filter-select">
        <option value="">全部狀態</option>
        <option v-for="opt in availableStatusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
      <div class="date-range">
        <input v-model="dateFrom" type="date" class="date-input" :max="dateTo || undefined" />
        <span class="date-sep">~</span>
        <input v-model="dateTo" type="date" class="date-input" :min="dateFrom || undefined" />
      </div>
    </div>

    <!-- 桌機表格 -->
    <div class="table-wrap">
      <table class="orders-table">
        <thead>
          <tr>
            <th class="col-index">編號</th>
            <th v-if="isGroupAdmin" class="col-company">銷售公司</th>
            <th>訂單編號</th>
            <th v-if="showOrderSource">訂單來源</th>
            <th>訂單日期</th>
            <th v-if="showCustomer">客戶名稱</th>
            <th>訂單狀態</th>
            <th class="col-amount">訂單金額</th>
            <th v-if="isSales" class="col-action"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in pagedOrders"
            :key="order.orderId"
            :class="['table-row', { 'is-pending': isPendingStatus(order.status) }]"
            @click="goToOrder(order.orderId)"
          >
            <td class="col-index">{{ orderSequence(order) }}</td>
            <td v-if="isGroupAdmin" class="col-company">{{ order.companyName }}</td>
            <td class="col-order-id mono">{{ order.orderId }}</td>
            <td v-if="showOrderSource" class="col-order-source">{{ sourceLabel(order.source) }}</td>
            <td>{{ order.date }}</td>
            <td v-if="showCustomer">{{ customerMap[order.customerId] || order.customerId }}</td>
            <td><status-badge :status="order.status" :viewer-role="currentUser.role" /></td>
            <td class="col-amount">$ {{ order.amount.toLocaleString() }}</td>
            <td v-if="isSales" class="col-action" @click.stop>
              <button
                v-if="canBatchTransfer(order)"
                type="button"
                class="review-btn"
                @click="$router.push('/orders/' + order.orderId + '/review')"
              >前往審單</button>
            </td>
          </tr>
          <tr v-if="pagedOrders.length === 0">
            <td :colspan="colSpan" class="empty-cell">沒有符合的訂單</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 手機卡片列表 -->
    <ul class="mobile-list">
      <li
        v-for="order in pagedOrders"
        :key="order.orderId"
        :class="['mobile-card', { 'is-pending': isPendingStatus(order.status) }]"
        @click="goToOrder(order.orderId)"
      >
        <div class="mobile-top">
          <span class="mobile-index">#{{ orderSequence(order) }}</span>
          <status-badge :status="order.status" :viewer-role="currentUser.role" />
          <span class="mobile-order-id mono">{{ order.orderId }}</span>
        </div>
        <div class="mobile-kv">
          <div v-if="isGroupAdmin" class="kv-item">
            <span class="kv-label">銷售公司</span>
            <span class="kv-value">{{ order.companyName }}</span>
          </div>
          <div v-if="showOrderSource" class="kv-item">
            <span class="kv-label">來源</span>
            <span class="kv-value">{{ sourceLabel(order.source) }}</span>
          </div>
          <div class="kv-item">
            <span class="kv-label">日期</span>
            <span class="kv-value">{{ order.date }}</span>
          </div>
          <div v-if="showCustomer" class="kv-item">
            <span class="kv-label">客戶</span>
            <span class="kv-value">{{ customerMap[order.customerId] || order.customerId }}</span>
          </div>
          <div class="kv-item">
            <span class="kv-label">金額</span>
            <span class="kv-value kv-amount">$ {{ order.amount.toLocaleString() }}</span>
          </div>
        </div>
      </li>
      <li v-if="pagedOrders.length === 0" class="mobile-empty">沒有符合的訂單</li>
    </ul>

    <!-- 選擇客戶 Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="customer-modal" role="dialog" aria-modal="true">
        <div class="customer-modal-header">
          <h3 class="customer-modal-title">選擇客戶</h3>
          <button type="button" class="modal-close-btn" @click="closeModal" aria-label="關閉">×</button>
        </div>

        <input
          v-model.trim="modalSearch"
          type="text"
          class="customer-modal-search"
          placeholder="搜尋客戶名稱"
        />

        <div class="customer-modal-tabs" role="tablist" aria-label="客戶來源">
          <button
            type="button"
            :class="['customer-modal-tab', { active: activeCustomerTab === 'schedule' }]"
            @click="activeCustomerTab = 'schedule'"
          >今日班表</button>
          <button
            type="button"
            :class="['customer-modal-tab', { active: activeCustomerTab === 'nearby' }]"
            @click="activeCustomerTab = 'nearby'"
          >附近客戶</button>
        </div>

        <div v-if="activeCustomerTab === 'schedule'" class="customer-modal-section">
          <div class="customer-modal-toolbar">
            <span class="customer-modal-toolbar-label">排序</span>
            <div class="customer-modal-chip-group" role="tablist" aria-label="今日班表排序">
              <button
                type="button"
                :class="['customer-modal-chip', { active: scheduleSortMode === 'default' }]"
                @click="scheduleSortMode = 'default'"
              >預設排序</button>
              <button
                type="button"
                :class="['customer-modal-chip', { active: scheduleSortMode === 'distance' }]"
                @click="applyScheduleSortMode('distance')"
              >由近到遠</button>
              <button
                type="button"
                :class="['customer-modal-chip', { active: scheduleSortMode === 'distance_desc' }]"
                @click="applyScheduleSortMode('distance_desc')"
              >由遠到近</button>
            </div>
          </div>
          <div class="customer-modal-list customer-modal-list--tab">
            <button
              v-for="customer in todayScheduleCustomers"
              :key="'schedule_' + customer.id"
              type="button"
              :class="['customer-modal-item', { selected: selectedCustomerId === customer.id }]"
              @click="selectCustomer(customer.id)"
            >
              <span class="customer-modal-index">{{ todayScheduleCustomers.indexOf(customer) + 1 }}</span>
              <div class="customer-modal-item-main">
                <customer-list-item
                  :name="customer.name"
                  :address="customer.address"
                  :distance="customer.distance"
                />
              </div>
            </button>
            <div v-if="todayScheduleCustomers.length === 0" class="customer-modal-empty">沒有符合的今日班表客戶</div>
          </div>
        </div>

        <div v-else class="customer-modal-section">
          <div class="customer-modal-toolbar">
            <span class="customer-modal-toolbar-label">顯示</span>
            <div class="customer-modal-chip-group" role="tablist" aria-label="附近客戶篩選">
              <button
                type="button"
                :class="['customer-modal-chip', { active: nearbyCustomerScope === 'my' }]"
                @click="nearbyCustomerScope = 'my'"
              >我的客戶</button>
              <button
                type="button"
                :class="['customer-modal-chip', { active: nearbyCustomerScope === 'all' }]"
                @click="nearbyCustomerScope = 'all'"
              >全部客戶</button>
            </div>
          </div>
          <div class="customer-modal-list customer-modal-list--tab">
            <button
              v-for="customer in nearbyCustomers"
              :key="'nearby_' + customer.id"
              type="button"
              :class="['customer-modal-item', { selected: selectedCustomerId === customer.id }]"
              @click="selectCustomer(customer.id)"
            >
              <span class="customer-modal-index">{{ nearbyCustomers.indexOf(customer) + 1 }}</span>
              <customer-list-item
                :name="customer.name"
                :address="customer.address"
                :distance="customer.distance"
              />
            </button>
            <div v-if="nearbyCustomers.length === 0" class="customer-modal-empty">沒有符合的附近客戶</div>
          </div>
        </div>

        <div class="customer-modal-actions">
          <button type="button" class="customer-modal-cancel" @click="closeModal">取消</button>
          <button
            type="button"
            class="customer-modal-confirm"
            :disabled="!selectedCustomerId"
            @click="confirmCustomer"
          >確認</button>
        </div>
      </div>
    </div>

    <!-- 分頁 -->
    <div v-if="totalPages > 1" class="pagination">
      <button
        type="button"
        class="page-btn"
        :disabled="currentPage === 1"
        @click="currentPage = 1"
      >«</button>
      <button
        type="button"
        class="page-btn"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >‹</button>

      <button
        v-for="p in pageNumbers"
        :key="p"
        type="button"
        :class="['page-btn', { active: p === currentPage }]"
        @click="currentPage = p"
      >{{ p }}</button>

      <button
        type="button"
        class="page-btn"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >›</button>
      <button
        type="button"
        class="page-btn"
        :disabled="currentPage === totalPages"
        @click="currentPage = totalPages"
      >»</button>

      <span class="page-info">{{ currentPage }} / {{ totalPages }} 頁，共 {{ filteredOrders.length }} 筆</span>
    </div>

  </div>
</template>

<script>
import { customers, customerById } from '../mock/customers'
import { buildTodaySchedule } from '../mock/schedule'
import { getCurrentUser } from '../services/auth'
import { getCustomerPoint } from '../utils/customerSelection'
import { sortByDistance, haversineKm } from '../utils/distance'
import CustomerListItem from '../components/CustomerListItem.vue'

const customerMap = Object.fromEntries(customers.map(c => [c.id, c.name]))
const FALLBACK_SORT_LOCATION = {
  lat: 25.033,
  lng: 121.565
}

const PAGE_SIZE = 10

export default {
  name: 'OrdersPage',
  components: { CustomerListItem },
  data () {
    return {
      customerMap,
      filterStatus: '',
      filterCompany: '',
      dateFrom: '',
      dateTo: '',
      currentPage: 1,
      customers,
      showModal: false,
      modalSearch: '',
      activeCustomerTab: 'schedule',
      scheduleSortMode: 'default',
      nearbyCustomerScope: 'my',
      selectedCustomerId: null,
      selectionLocation: null
    }
  },
  computed: {
    currentUser () {
      return getCurrentUser() || { role: '' }
    },
    showCustomer () {
      return ['sales', 'company_admin', 'group_admin'].includes(this.currentUser.role)
    },
    showOrderSource () {
      return this.currentUser.role !== 'customer'
    },
    isGroupAdmin () {
      return this.currentUser.role === 'group_admin'
    },
    isSales () {
      return this.currentUser.role === 'sales'
    },
    availableStatusOptions () {
      if (this.currentUser.role === 'customer') {
        return [
          { value: 'pending', label: '業務確認中' },
          { value: 'transferred', label: '訂單處理中' },
          { value: 'shipped', label: '已出貨' }
        ]
      }
      return [
        { value: 'pending', label: '業務確認中' },
        { value: 'transferred', label: '訂單處理中' },
        { value: 'error', label: '拋轉失敗' },
        { value: 'shipped', label: '已出貨' }
      ]
    },
    colSpan () {
      let cols = 4
      if (this.showOrderSource) cols++
      cols++
      if (this.isGroupAdmin) cols++
      if (this.showCustomer) cols++
      if (this.isSales) cols++
      return cols
    },
    companies () {
      const all = this.$store.state.orders.map(o => o.companyName).filter(Boolean)
      return [...new Set(all)].sort()
    },
    todayScheduleCustomers () {
      const keyword = this.modalSearch.trim().toLowerCase()
      const filtered = buildTodaySchedule(customerById)
        .map(item => ({
          id: item.customerId,
          name: item.customer,
          address: item.address,
          location: item.location,
          time: item.time
        }))
        .filter(customer => {
          if (!keyword) return true
          return (customer.name || '').toLowerCase().includes(keyword) ||
            (customer.address || '').toLowerCase().includes(keyword)
        })

      let ordered = filtered
      if (this.scheduleSortMode === 'distance') {
        ordered = sortByDistance(filtered, this.selectionLocation, customer => customer.location)
      } else if (this.scheduleSortMode === 'distance_desc') {
        ordered = sortByDistance(filtered, this.selectionLocation, customer => customer.location).reverse()
      }

      return ordered.map(customer => this.decorateCustomerDistance(customer))
    },
    nearbyCustomers () {
      const keyword = this.modalSearch.trim().toLowerCase()
      const filtered = this.customers
        .filter(customer => {
          if (this.nearbyCustomerScope === 'my') {
            return customer.assignedTo === this.currentUser.id
          }
          return true
        })
        .filter(customer => {
          if (!keyword) return true
          return (customer.name || '').toLowerCase().includes(keyword) ||
            (customer.address || '').toLowerCase().includes(keyword)
        })

      const ordered = sortByDistance(filtered, this.selectionLocation, customer => getCustomerPoint(customer))
      return ordered.map(customer => this.decorateCustomerDistance(customer))
    },
    filteredOrders () {
      return this.$store.state.orders.filter(order => {
        if (this.filterCompany && order.companyName !== this.filterCompany) return false
        const displayStatus = this.normalizeStatus(order.status)
        if (this.filterStatus && displayStatus !== this.filterStatus) return false
        if (this.dateFrom && order.date < this.dateFrom) return false
        if (this.dateTo && order.date > this.dateTo) return false
        return true
      })
    },
    totalPages () {
      return Math.max(1, Math.ceil(this.filteredOrders.length / PAGE_SIZE))
    },
    pagedOrders () {
      const start = (this.currentPage - 1) * PAGE_SIZE
      return this.filteredOrders.slice(start, start + PAGE_SIZE)
    },
    pageNumbers () {
      const range = []
      const delta = 2
      const left = Math.max(1, this.currentPage - delta)
      const right = Math.min(this.totalPages, this.currentPage + delta)
      for (let i = left; i <= right; i++) {
        range.push(i)
      }
      return range
    }
  },
  created () {
    if (this.$route.query.filter) {
      this.filterStatus = this.$route.query.filter
    }
    if (this.$route.query.launch === 'new' && this.isSales) {
      this.$nextTick(() => this.openModal())
    }
  },
  watch: {
    filterCompany () { this.currentPage = 1 },
    filterStatus () { this.currentPage = 1 },
    dateFrom () { this.currentPage = 1 },
    dateTo () { this.currentPage = 1 }
  },
  methods: {
    loadSelectionLocation (targetMode = null) {
      if (!navigator.geolocation) {
        this.selectionLocation = { ...FALLBACK_SORT_LOCATION }
        if (targetMode) this.scheduleSortMode = targetMode
        return
      }
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.selectionLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }
          if (targetMode) {
            this.scheduleSortMode = targetMode
          }
        },
        () => {
          this.selectionLocation = { ...FALLBACK_SORT_LOCATION }
          if (targetMode) this.scheduleSortMode = targetMode
        },
        { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
      )
    },
    canBatchTransfer (order) {
      if (!order) return false
      const s = order.status
      return s === 'pending' || s === 'error'
    },
    normalizeStatus (status) {
      const shippedRaw = ['confirmed', 'processing', 'cancelled', 'shipped']
      if (shippedRaw.includes(status)) return 'shipped'
      if (this.currentUser.role === 'customer' && status === 'error') return 'pending'
      return status
    },
    isPendingStatus (status) {
      return this.normalizeStatus(status) === 'pending'
    },
    orderSequence (order) {
      const idx = this.filteredOrders.findIndex(item => item.orderId === order.orderId)
      return idx === -1 ? '—' : idx + 1
    },
    goToOrder (orderId) {
      const order = this.$store.state.orders.find(item => item.orderId === orderId)
      if (this.isSales && this.canBatchTransfer(order)) {
        this.$router.push(`/orders/${orderId}/review`)
        return
      }
      this.$router.push(`/orders/${orderId}`)
    },
    sourceLabel (source) {
      const map = {
        customer: '客戶送單',
        sales: '業務下單',
        transfer: '二階回傳'
      }
      return map[source] || source || '—'
    },
    openModal () {
      this.modalSearch = ''
      this.activeCustomerTab = 'schedule'
      this.scheduleSortMode = 'default'
      this.nearbyCustomerScope = 'my'
      this.selectionLocation = null
      this.selectedCustomerId = null
      this.showModal = true
      this.loadSelectionLocation()
    },
    closeModal () {
      this.showModal = false
      this.modalSearch = ''
      this.activeCustomerTab = 'schedule'
      this.scheduleSortMode = 'default'
      this.nearbyCustomerScope = 'my'
      this.selectionLocation = null
      this.selectedCustomerId = null
    },
    selectCustomer (customerId) {
      this.selectedCustomerId = customerId
    },
    applyScheduleSortMode (mode) {
      if (mode === 'default') {
        this.scheduleSortMode = 'default'
        return
      }
      if (this.selectionLocation) {
        this.scheduleSortMode = mode
        return
      }
      this.loadSelectionLocation(mode)
    },
    decorateCustomerDistance (customer) {
      const point = getCustomerPoint(customer)
      const distance = this.selectionLocation && point
        ? haversineKm(this.selectionLocation.lat, this.selectionLocation.lng, point.lat, point.lng)
        : null

      return {
        ...customer,
        distance
      }
    },
    confirmCustomer () {
      if (!this.selectedCustomerId) return
      const customer = this.customers.find(c => c.id === this.selectedCustomerId)
      this.closeModal()
      const query = {
        customerId: this.selectedCustomerId
      }
      const point = getCustomerPoint(customer)
      if (point) {
        query.customerLat = String(point.lat)
        query.customerLng = String(point.lng)
      }
      this.$router.push({ path: '/orders/new/review', query })
    }
  }
}
</script>

<style scoped>
.page-title-block {
  margin-bottom: 24px;
}

.page-title {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 500;
  color: var(--c-text-title);
  margin: 0;
  letter-spacing: 0.02em;
}

/* ── 篩選列 ────────────────── */
.orders-page {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* ── 篩選列 ─────────────────────────── */
.filter-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-select {
  height: 36px;
  padding: 0 32px 0 10px;
  border: 0.5px solid var(--c-border);
  border-radius: 6px;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
  appearance: none;
  -webkit-appearance: none;
  color: #334155;
  font-size: 14px;
  font-weight: 400;
  line-height: 36px;
  outline: none;
  cursor: pointer;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-input {
  height: 38px;
  padding: 0 10px;
  border: 0.5px solid var(--c-border);
  border-radius: 6px;
  background: #ffffff;
  color: #334155;
  font-size: 14px;
  font-weight: 400;
  outline: none;
}

.date-sep {
  font-size: 14px;
  font-weight: 400;
  color: #8b95a8;
}

/* ── 桌機表格 ────────────────────────── */
.table-wrap {
  border: 0.5px solid var(--c-border);
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table thead tr {
  background: #F8FAFC;
}

.orders-table th {
  padding: 14px 16px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--c-text-muted);
  text-align: left;
  border-bottom: var(--border);
  text-transform: uppercase;
}

.col-index {
  width: 64px;
  text-align: center;
}

.orders-table td.col-index {
  text-align: center;
  color: #64748b;
  font-family: var(--font-mono);
}

.col-amount {
  text-align: right;
}

.orders-table th.col-amount,
.orders-table td.col-amount {
  text-align: right;
}

.col-company {
  color: var(--c-text-sub);
  font-size: 13px;
  white-space: nowrap;
}

.col-order-source {
  color: var(--c-text-sub);
  font-size: 13px;
  white-space: nowrap;
}

.orders-table td {
  padding: 14px 16px;
  font-size: 14px;
  font-weight: 400;
  color: var(--c-text-body);
  border-bottom: 0.5px solid var(--c-divider);
}

.orders-table tbody tr:last-child td {
  border-bottom: none;
}

.orders-table tbody tr:nth-child(even) td {
  background: #F9FBFE;
}

.table-row {
  cursor: pointer;
  transition: background 0.1s;
}

.table-row:hover td {
  background: #EEF3FB !important;
}

.col-order-id {
  color: var(--c-primary) !important;
  font-family: var(--font-mono) !important;
  font-weight: 500 !important;
  letter-spacing: 0.04em !important;
}

.col-action {
  text-align: right;
  white-space: nowrap;
  width: 1%;
}

/* ── pending 列藍色直條 ──────────────── */
tr.is-pending td:first-child {
  border-left: 4px solid var(--c-primary);
}

/* ── 審單按鈕 ────────────────────────── */
.review-btn {
  padding: 6px 12px;
  border: 0.5px solid var(--c-primary);
  border-radius: 6px;
  background: transparent;
  color: var(--c-primary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}

.empty-cell {
  text-align: center;
  color: #8b95a8;
  padding: 32px 0 !important;
  font-size: 14px;
}

/* ── 手機卡片（隱藏於桌機） ─────────── */
.mobile-list {
  display: none;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-direction: column;
  gap: 10px;
}

.mobile-card {
  border: 0.5px solid var(--c-border);
  border-radius: 8px;
  background: #ffffff;
  padding: 14px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.mobile-index {
  font-family: var(--font-mono);
  font-size: 12px;
  color: #64748b;
}

.mobile-order-id {
  font-size: 14px;
  font-weight: 500;
  color: var(--c-primary);
}

.mobile-kv {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.kv-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.kv-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.customer-modal-index {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: #eef3fb;
  color: var(--c-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.kv-value {
  font-size: 14px;
  font-weight: 500;
  color: var(--c-primary);
}

.kv-amount {
  font-weight: 500;
}

.mobile-card.is-pending {
  border-left: 4px solid var(--c-primary);
}

.mobile-empty {
  text-align: center;
  color: #8b95a8;
  font-size: 14px;
  padding: 24px 0;
}

/* ── 分頁 ────────────────────────────── */
.pagination {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.page-btn {
  min-width: 34px;
  height: 34px;
  padding: 0 8px;
  border: 0.5px solid var(--c-border);
  border-radius: 6px;
  background: #ffffff;
  color: var(--c-primary);
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
}

.page-btn:disabled {
  color: #c0c8d4;
  cursor: default;
}

.page-btn.active {
  background: var(--c-primary);
  color: #ffffff;
  border-color: var(--c-primary);
  font-weight: 500;
}

.page-info {
  margin-left: 6px;
  font-size: 13px;
  font-weight: 400;
  color: #8b95a8;
}

/* ── Modal ───────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}

.customer-modal {
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  border: 0.5px solid var(--c-border);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: min(80vh, 640px);
}

.customer-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.customer-modal-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
}

.modal-close-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 999px;
  background: #f8fafc;
  color: #64748b;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}

.customer-modal-search {
  height: 46px;
  padding: 0 16px;
  border: 0.5px solid var(--c-border);
  border-radius: 12px;
  background: #ffffff;
  color: #334155;
  font-size: 15px;
  outline: none;
}

.customer-modal-tabs {
  display: flex;
  gap: 0;
  align-items: flex-end;
  border-bottom: 0.5px solid var(--c-divider);
  padding-bottom: 0;
}

.customer-modal-tab {
  position: relative;
  flex: 1;
  min-height: 44px;
  padding: 0 10px 12px;
  border: none;
  border-radius: 0;
  background: transparent;
  color: #8b95a8;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.18s ease;
}

.customer-modal-tab::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.5px;
  height: 4px;
  border-radius: 999px 999px 0 0;
  background: transparent;
  transition: background-color 0.18s ease;
}

.customer-modal-tab.active {
  color: var(--c-primary);
}

.customer-modal-tab.active::after {
  background: var(--c-primary);
}

.customer-modal-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
}

.customer-modal-toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.customer-modal-toolbar-label {
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
}

.customer-modal-chip-group {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px;
  border: 0.5px solid var(--c-border);
  border-radius: 999px;
  background: #f8fafc;
}

.customer-modal-chip {
  min-height: 34px;
  padding: 0 14px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: #475569;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}

.customer-modal-chip.active {
  background: var(--c-primary);
  color: #ffffff;
}

.customer-modal-chip:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.customer-modal-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-y: auto;
  max-height: 320px;
  border: 0.5px solid var(--c-border);
  border-radius: 10px;
  background: #ffffff;
}

.customer-modal-list--tab {
  flex: 1;
  max-height: min(48vh, 420px);
}

.customer-modal-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  border: none;
  border-bottom: 0.5px solid var(--c-divider);
  background: #ffffff;
  text-align: left;
  cursor: pointer;
}

.customer-modal-item-main {
  flex: 1;
  min-width: 0;
}

.customer-modal-item:last-child {
  border-bottom: none;
}

.customer-modal-item:hover {
  background: #f8fafc;
}

.customer-modal-item.selected {
  background: #eef3fb;
}

.customer-modal-meta-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 54px;
  height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  background: #f1f5f9;
  color: #475569;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.customer-modal-empty {
  padding: 20px;
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
}

.customer-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.customer-modal-cancel {
  height: 40px;
  padding: 0 16px;
  border: 0.5px solid var(--c-border);
  border-radius: 8px;
  background: transparent;
  color: #475569;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.customer-modal-confirm {
  height: 40px;
  padding: 0 18px;
  border: none;
  border-radius: 8px;
  background: var(--c-primary);
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.customer-modal-confirm:disabled {
  background: #9ca7ba;
  cursor: not-allowed;
}

/* ── RWD ─────────────────────────────── */
@media (max-width: 768px) {
  .table-wrap {
    display: none;
  }

  .mobile-list {
    display: flex;
  }

  .date-range {
    flex-wrap: wrap;
  }

  .filter-select,
  .date-input {
    min-height: 44px;
    height: 44px;
    line-height: 44px;
  }

  .customer-modal-chip-group {
    width: 100%;
  }

  .customer-modal-chip {
    flex: 1;
    min-width: 0;
  }

  .customer-modal-item {
    flex-wrap: wrap;
  }

  .customer-modal-meta-badge {
    margin-left: 0;
  }

  .customer-modal-tabs {
    gap: 0;
  }
}
</style>
