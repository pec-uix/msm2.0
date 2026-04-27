<template>
  <div class="promotions-page">
    <aside class="company-panel" :class="{ 'is-hidden-mobile': mobileShowDetail }">
      <div class="panel-header">
        <span class="panel-eyebrow">MARKET ACTIVITY</span>
        <h2 class="panel-title">市場活動</h2>
        <p class="panel-desc">先選公司，再看公司底下的活動，最後查看該活動的項目。</p>
      </div>

      <div class="panel-search">
        <input
          v-model.trim="companySearch"
          type="text"
          class="search-input"
          placeholder="搜尋公司名稱或地址"
        />
      </div>

      <div class="company-list">
        <button
          v-for="company in filteredCompanies"
          :key="company.customerId"
          type="button"
          :class="['company-card', { 'is-selected': selectedCompanyId === company.customerId }]"
          @click="selectCompany(company.customerId)"
        >
          <div class="company-top">
            <span class="company-name">{{ company.name }}</span>
            <span class="company-count">{{ company.activityCount }} 活動</span>
          </div>
          <div class="company-address">{{ company.address }}</div>
          <div class="company-progress-row">
            <span class="company-progress-text">{{ company.doneTodos }} / {{ company.totalTodos }} 項完成</span>
            <span class="company-progress-pct">{{ company.progress }}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" :style="{ width: company.progress + '%' }"></div>
          </div>
        </button>
        <div v-if="filteredCompanies.length === 0" class="empty-state">無符合條件的公司</div>
      </div>
    </aside>

    <section class="detail-panel" :class="{ 'is-visible-mobile': mobileShowDetail }">
      <button v-if="mobileShowDetail" class="mobile-back-btn" @click="mobileShowDetail = false">
        ← 返回公司列表
      </button>

      <template v-if="selectedCompany">
        <div class="detail-scroll">
          <div class="detail-head">
            <div>
              <h2 class="detail-title">{{ selectedCompany.name }}</h2>
              <div class="detail-subtitle">{{ selectedCompany.address }}</div>
            </div>
            <span class="summary-chip">{{ selectedCompany.activityCount }} 個活動</span>
          </div>

          <div class="section-divider"></div>

          <div class="filter-tabs">
            <button
              v-for="tab in TABS"
              :key="tab.value"
              type="button"
              :class="['tab-btn', { active: activeTab === tab.value }]"
              @click="activeTab = tab.value"
            >{{ tab.label }}</button>
          </div>

          <div class="activity-list">
            <button
              v-for="activity in filteredCompanyActivities"
              :key="activity.id"
              type="button"
              :class="['activity-card', { 'is-selected': selectedActivityId === activity.id }]"
              @click="selectActivity(activity.id)"
            >
              <div class="activity-top">
                <span class="activity-name">{{ activity.name }}</span>
                <span :class="['status-badge', statusClass(activity.status)]">{{ statusLabel(activity.status) }}</span>
              </div>
              <div class="activity-period">{{ activity.startDate }} ～ {{ activity.endDate }}</div>
              <div class="activity-progress-row">
                <span>{{ activity.progress.done }} / {{ activity.progress.total }} 項目</span>
                <span class="company-progress-pct">{{ activity.progress.percent }}%</span>
              </div>
              <div class="progress-track">
                <div
                  class="progress-fill"
                  :class="{ done: activity.progress.percent >= 100 }"
                  :style="{ width: activity.progress.percent + '%' }"
                ></div>
              </div>
            </button>
            <div v-if="filteredCompanyActivities.length === 0" class="empty-state">無符合條件的活動</div>
          </div>

          <template v-if="selectedActivity">
            <div class="section-divider"></div>
            <div class="detail-head">
              <div>
                <h2 class="detail-title">{{ selectedActivity.name }}</h2>
                <div class="detail-subtitle">{{ selectedActivity.startDate }} ～ {{ selectedActivity.endDate }}</div>
              </div>
              <span :class="['status-badge', statusClass(selectedActivity.status)]">{{ statusLabel(selectedActivity.status) }}</span>
            </div>
            <p class="detail-desc">{{ selectedActivity.description }}</p>

            <div class="store-head">
              <div>
                <div class="section-label">項目</div>
                <div class="store-meta">{{ selectedActivityItemCount }} 項項目</div>
              </div>
              <input
                v-model.trim="todoSearch"
                type="text"
                class="search-input search-input--small"
                placeholder="搜尋項目"
              />
            </div>

            <div class="store-card">
              <div class="store-progress-row store-progress-row--single">
                <span class="progress-summary">
                  <span class="progress-summary-done">{{ selectedActivityProgressText }}</span>
                  <span class="progress-summary-rest">{{ selectedActivityRemainingText }}</span>
                </span>
                <span class="company-progress-pct">{{ selectedActivityProgress }}%</span>
              </div>
              <div class="progress-track">
                <div
                  class="progress-fill"
                  :class="{ done: selectedActivityProgress >= 100 }"
                  :style="{ width: selectedActivityProgress + '%' }"
                ></div>
              </div>

              <div class="todo-list">
                <div
                  v-for="item in filteredActivityItems"
                  :key="item.id"
                  class="todo-item"
                >
                  <input
                    :id="'todo-' + item.id"
                    v-model="item.todo.completed"
                    type="checkbox"
                    class="todo-check"
                  />
                  <div class="todo-body">
                    <label
                      :for="'todo-' + item.id"
                      :class="['todo-text', { done: item.todo.completed }]"
                    >{{ item.todo.text }}</label>

                    <div class="todo-meta">{{ item.storeName }} / {{ item.storeAddress }}</div>

                    <div v-if="item.todo.requiresPhoto" class="photo-area">
                      <div v-if="item.todo.photos && item.todo.photos.length" class="photo-thumbs">
                        <img
                          v-for="(url, pi) in item.todo.photos"
                          :key="pi"
                          :src="url"
                          class="photo-thumb"
                          alt="回傳照片"
                          @click="previewUrl = url"
                        />
                      </div>
                      <label class="upload-label">
                        <camera-icon :size="13" :stroke-width="1.5" />
                        {{ item.todo.photos && item.todo.photos.length ? '繼續上傳' : '上傳回傳照片' }}
                        <input
                          type="file"
                          accept="image/*"
                          class="file-input"
                          @change="e => onPhotoUpload(e, selectedActivity, item)"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div v-if="filteredActivityItems.length === 0" class="empty-state">無符合搜尋條件的項目</div>
              </div>
            </div>
          </template>

          <div v-else class="no-selection">
            <image-icon :size="32" :stroke-width="1.5" class="no-icon" />
            <p class="no-text">請先選擇一個活動</p>
          </div>
        </div>
      </template>

      <div v-else class="no-selection">
        <image-icon :size="32" :stroke-width="1.5" class="no-icon" />
        <p class="no-text">請先選擇一個公司</p>
      </div>
    </section>

    <div v-if="previewUrl" class="preview-overlay" @click="previewUrl = null">
      <img :src="previewUrl" class="preview-img" alt="照片預覽" />
      <span class="preview-close">點擊任意處關閉</span>
    </div>
  </div>
</template>

<script>
import { promotionActivities as rawData } from '../mock/promotionActivities'
import { Camera as CameraIcon, Image as ImageIcon } from 'lucide-vue'

const TABS = [
  { label: '全部', value: 'all' },
  { label: '進行中', value: 'active' },
  { label: '未開始', value: 'upcoming' },
  { label: '已結束', value: 'ended' }
]

const STATUS_LABELS = { active: '進行中', upcoming: '未開始', ended: '已結束' }
const STATUS_CLASSES = { active: 'badge-active', upcoming: 'badge-upcoming', ended: 'badge-ended' }

function deepClone (val) {
  return JSON.parse(JSON.stringify(val))
}

export default {
  name: 'PromotionsPage',
  components: { CameraIcon, ImageIcon },
  data () {
    return {
      TABS,
      activeTab: 'all',
      activities: deepClone(rawData),
      selectedCompanyId: null,
      selectedActivityId: null,
      companySearch: '',
      todoSearch: '',
      mobileShowDetail: false,
      previewUrl: null
    }
  },
  computed: {
    companyList () {
      const map = new Map()
      this.activities.forEach(activity => {
        activity.stores.forEach(store => {
          if (!map.has(store.customerId)) {
            map.set(store.customerId, {
              customerId: store.customerId,
              name: store.name,
              address: store.address,
              activityCount: 0,
              totalTodos: 0,
              doneTodos: 0
            })
          }
          const entry = map.get(store.customerId)
          entry.activityCount += 1
          entry.totalTodos += store.todos.length
          entry.doneTodos += store.todos.filter(t => t.completed).length
        })
      })
      return [...map.values()]
        .map(entry => ({
          ...entry,
          progress: entry.totalTodos === 0 ? 0 : Math.round((entry.doneTodos / entry.totalTodos) * 100)
        }))
        .sort((a, b) => a.name.localeCompare(b.name, 'zh-TW'))
    },
    filteredCompanies () {
      const kw = this.companySearch.trim().toLowerCase()
      if (!kw) return this.companyList
      return this.companyList.filter(company =>
        company.name.toLowerCase().includes(kw) || company.address.toLowerCase().includes(kw)
      )
    },
    selectedCompany () {
      return this.companyList.find(company => company.customerId === this.selectedCompanyId) || this.filteredCompanies[0] || null
    },
    companyActivities () {
      if (!this.selectedCompanyId) return []
      const list = this.activities
        .filter(activity => activity.stores.some(store => store.customerId === this.selectedCompanyId))
        .map(activity => {
          const store = activity.stores.find(s => s.customerId === this.selectedCompanyId)
          const done = store ? store.todos.filter(t => t.completed).length : 0
          const total = store ? store.todos.length : 0
          return {
            ...activity,
            progress: {
              done,
              total,
              percent: total === 0 ? 0 : Math.round((done / total) * 100)
            }
          }
        })
      if (this.activeTab === 'all') return list
      return list.filter(activity => activity.status === this.activeTab)
    },
    filteredCompanyActivities () {
      return this.companyActivities
    },
    selectedActivity () {
      return this.companyActivities.find(activity => activity.id === this.selectedActivityId) || this.companyActivities[0] || null
    },
    selectedActivityItems () {
      if (!this.selectedActivity) return []
      if (Array.isArray(this.selectedActivity.items)) return this.selectedActivity.items
      return (Array.isArray(this.selectedActivity.stores) ? this.selectedActivity.stores : []).flatMap((store, storeIndex) => {
        const todos = Array.isArray(store.todos) ? store.todos : []
        return todos.map((todo, todoIndex) => ({
          id: todo.id || `${this.selectedActivity.id}-${store.customerId}-${todoIndex}`,
          storeCustomerId: store.customerId,
          storeName: store.name,
          storeAddress: store.address,
          storeIndex,
          todoIndex,
          todo
        }))
      })
    },
    selectedActivityItemCount () {
      return this.selectedActivityItems.length
    },
    selectedActivityDoneCount () {
      return this.selectedActivityItems.filter(item => item.todo && item.todo.completed).length
    },
    selectedActivityRemainingCount () {
      return Math.max(0, this.selectedActivityItemCount - this.selectedActivityDoneCount)
    },
    selectedActivityProgress () {
      if (!this.selectedActivityItemCount) return 0
      return Math.round((this.selectedActivityDoneCount / this.selectedActivityItemCount) * 100)
    },
    selectedActivityProgressText () {
      return `已完成 ${this.selectedActivityDoneCount} 項`
    },
    selectedActivityRemainingText () {
      if (this.selectedActivityRemainingCount === 0) {
        return '，全部處理完畢'
      }
      return `，剩餘 ${this.selectedActivityRemainingCount} 項待處理`
    },
    filteredActivityItems () {
      const kw = this.todoSearch.trim().toLowerCase()
      if (!kw) return this.selectedActivityItems
      return this.selectedActivityItems.filter(item => {
        const text = item.todo && item.todo.text ? item.todo.text.toLowerCase() : ''
        return text.includes(kw) || (item.storeName && item.storeName.toLowerCase().includes(kw))
      })
    }
  },
  watch: {
    filteredCompanies: {
      immediate: true,
      handler (list) {
        if (!list.length) {
          this.selectedCompanyId = null
          this.selectedActivityId = null
          return
        }
        if (!list.some(company => company.customerId === this.selectedCompanyId)) {
          this.selectedCompanyId = list[0].customerId
        }
      }
    },
    companyActivities: {
      immediate: true,
      handler () {
        const list = this.companyActivities
        if (!list.length) {
          this.selectedActivityId = null
          return
        }
        if (!list.some(activity => activity.id === this.selectedActivityId)) {
          this.selectedActivityId = list[0].id
        }
      }
    },
    activeTab () {
      const list = this.companyActivities
      if (!list.length) {
        this.selectedActivityId = null
        return
      }
      if (!list.some(activity => activity.id === this.selectedActivityId)) {
        this.selectedActivityId = list[0].id
      }
    }
  },
  mounted () {
    if (this.filteredCompanies.length > 0) {
      this.selectedCompanyId = this.filteredCompanies[0].customerId
    }
  },
  methods: {
    statusLabel (status) {
      return STATUS_LABELS[status] || status
    },
    statusClass (status) {
      return STATUS_CLASSES[status] || ''
    },
    doneTodosCount (store) {
      return store.todos.filter(t => t.completed).length
    },
    selectCompany (customerId) {
      this.selectedCompanyId = customerId
      this.todoSearch = ''
      const firstActivity = this.filteredCompanyActivities[0]
      this.selectedActivityId = firstActivity ? firstActivity.id : null
      this.mobileShowDetail = true
    },
    selectActivity (activityId) {
      this.selectedActivityId = activityId
      this.todoSearch = ''
      this.mobileShowDetail = true
    },
    onPhotoUpload (e, activity, item) {
      const file = e.target.files[0]
      if (!file) return
      const url = URL.createObjectURL(file)
      const targetActivity = activity || this.selectedActivity
      if (!targetActivity || !Array.isArray(targetActivity.stores)) return
      const store = targetActivity.stores.find(s => s.customerId === item.storeCustomerId)
      if (!store || !Array.isArray(store.todos)) return
      const todo = store.todos[item.todoIndex]
      if (!todo) return
      if (!Array.isArray(todo.photos)) {
        this.$set(todo, 'photos', [])
      }
      todo.photos.push(url)
      e.target.value = ''
    }
  }
}
</script>

<style scoped>
.promotions-page {
  display: flex;
  height: calc(100vh - 60px);
  margin: -32px;
  overflow: hidden;
  background: var(--c-bg);
}

.company-panel {
  width: 340px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--c-surface);
  border-right: 0.5px solid var(--c-border);
  overflow: hidden;
}

.panel-header {
  padding: 20px 20px 14px;
  border-bottom: 0.5px solid var(--c-border);
}

.panel-eyebrow {
  display: block;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: #94a3b8;
  margin-bottom: 4px;
}

.panel-title,
.detail-title {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 500;
  color: #0f172a;
}

.panel-desc,
.detail-desc {
  margin: 6px 0 0;
  font-size: 13px;
  color: #64748b;
  line-height: 1.6;
}

.panel-search {
  padding: 12px 20px;
  border-bottom: 0.5px solid var(--c-border);
}

.search-input {
  width: 100%;
  height: 36px;
  padding: 0 10px;
  border: 0.5px solid var(--c-border);
  border-radius: 6px;
  background: #fff;
  color: #334155;
  font-size: 13px;
  outline: none;
}

.company-list {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
}

.list-body,
.detail-scroll {
  overflow-y: auto;
  flex: 1;
}

.company-card,
.activity-card,
.store-card {
  border: none;
  width: 100%;
  text-align: left;
  background: #fff;
}

.company-card {
  padding: 12px 18px 12px 20px;
  border-bottom: 0.5px solid #f1f5f9;
  box-shadow: inset 3px 0 0 0 transparent;
  cursor: pointer;
}

.company-card.is-selected {
  background: #eef3fb;
  box-shadow: inset 3px 0 0 0 var(--c-primary);
}

.company-top,
.activity-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.company-name,
.activity-name {
  font-size: 14px;
  font-weight: 500;
  color: #334155;
  line-height: 1.4;
}

.company-count {
  font-size: 11px;
  color: #64748b;
  white-space: nowrap;
}

.company-address,
.activity-period,
.detail-subtitle,
.store-meta {
  font-size: 12px;
  color: #8b95a8;
  line-height: 1.5;
}

.store-head .section-label {
  margin-bottom: 12px;
}

.store-head .store-meta {
  margin-top: 16px;
}

.company-progress-row,
.activity-progress-row,
.store-progress-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 6px;
}

.store-progress-row--single {
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding: 0 16px;
}

.progress-summary {
  display: inline-flex;
  align-items: baseline;
  gap: 0;
  min-width: 0;
  font-size: 12px;
  line-height: 1.5;
}

.progress-summary-done {
  color: #94a3b8;
  font-weight: 500;
}

.progress-summary-rest {
  color: var(--c-primary);
  font-weight: 700;
}

.company-progress-text {
  font-size: 12px;
  color: #64748b;
}

.company-progress-pct {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
}

.progress-track {
  width: 100%;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
  margin: 8px 0 16px;
}

.progress-fill {
  height: 100%;
  background: var(--c-primary);
}

.progress-fill.done {
  background: #1a5c38;
}

.detail-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--c-bg);
}

.mobile-back-btn {
  display: none;
}

.detail-scroll {
  padding: 24px;
}

.detail-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.summary-chip {
  display: inline-flex;
  align-items: center;
  padding: 0 10px;
  height: 24px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.1);
  color: var(--c-primary);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.section-divider {
  height: 0.5px;
  background: var(--c-divider);
  margin: 16px 0;
}

.filter-tabs {
  display: flex;
  gap: 0;
  border-bottom: 0.5px solid var(--c-border);
  margin-bottom: 12px;
  overflow-x: auto;
}

.tab-btn {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 10px 12px;
  font-size: 13px;
  color: #8b95a8;
  cursor: pointer;
  white-space: nowrap;
}

.tab-btn.active {
  color: var(--c-primary);
  border-bottom-color: var(--c-primary);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.activity-card {
  padding: 12px 14px;
  border: 0.5px solid var(--c-border);
  border-radius: 10px;
  cursor: pointer;
}

.activity-card.is-selected {
  border-color: var(--c-primary);
  box-shadow: inset 0 0 0 1px rgba(37, 99, 235, 0.08);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

.badge-active {
  background: #e2eae6;
  color: #2d5a3d;
}

.badge-upcoming {
  background: #e0e7ff;
  color: var(--c-primary);
}

.badge-ended {
  background: #f1f5f9;
  color: #94a3b8;
}

.store-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 12px 0 0;
  padding: 0 16px;
}

.store-list-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 14px 0 8px;
}

.store-sort-note {
  font-size: 11px;
  color: #94a3b8;
  white-space: nowrap;
}

.store-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.store-list-item {
  width: 100%;
  border: 0.5px solid var(--c-border);
  border-radius: 10px;
  background: #fff;
  padding: 10px 12px;
  text-align: left;
  cursor: pointer;
}

.store-list-item.is-selected {
  border-color: var(--c-primary);
  background: #eef3fb;
}

.store-list-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.store-list-name {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
  line-height: 1.4;
}

.store-distance {
  font-size: 11px;
  font-weight: 600;
  color: var(--c-primary);
  white-space: nowrap;
}

.store-list-address {
  margin-top: 4px;
  font-size: 12px;
  color: #8b95a8;
  line-height: 1.5;
}

.section-label {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #334155;
}

.search-input--small {
  max-width: 220px;
}

.store-card {
  border: 0.5px solid var(--c-border);
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
  margin-bottom: 16px;
  padding: 0 16px;
}

.store-row--single {
  padding: 14px;
}

.todo-list {
  border-top: 0.5px solid var(--c-border);
}

.todo-item {
  display: flex;
  gap: 10px;
  padding: 10px 14px;
  border-bottom: 0.5px solid #f1f5f9;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-check {
  width: 15px;
  height: 15px;
  margin-top: 2px;
  accent-color: var(--c-primary);
}

.todo-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.todo-text {
  font-size: 13px;
  color: #334155;
  line-height: 1.5;
  cursor: pointer;
}

.todo-text.done {
  text-decoration: line-through;
  color: #8b95a8;
}

.todo-meta {
  font-size: 11px;
  color: #94a3b8;
  line-height: 1.4;
}

.photo-area {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
}

.photo-thumbs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.photo-thumb {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
  border: 0.5px solid #e2e8f0;
  cursor: pointer;
}

.upload-label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border: 0.5px solid var(--c-primary);
  border-radius: 4px;
  color: var(--c-primary);
  font-size: 12px;
  cursor: pointer;
}

.file-input {
  display: none;
}

.empty-state,
.no-selection {
  padding: 22px;
  text-align: center;
  color: #8b95a8;
  font-size: 13px;
}

.no-selection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  min-height: 280px;
}

.no-icon {
  color: var(--c-border);
}

.preview-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
}

.preview-img {
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
}

.preview-close {
  margin-top: 14px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 820px) {
  .promotions-page {
    margin: -20px -16px;
    height: calc(100vh - 60px);
  }
}

@media (max-width: 768px) {
  .promotions-page {
    height: auto;
    overflow: visible;
    flex-direction: column;
    margin: -16px;
  }

  .company-panel {
    width: 100%;
    border-right: none;
    border-bottom: 0.5px solid var(--c-border);
  }

  .company-panel.is-hidden-mobile {
    display: none;
  }

  .detail-panel {
    display: none;
    min-height: calc(100vh - 52px);
  }

  .detail-panel.is-visible-mobile {
    display: flex;
  }

  .mobile-back-btn {
    display: block;
    width: 100%;
    padding: 12px 16px;
    border: none;
    border-bottom: 0.5px solid var(--c-border);
    background: #fff;
    color: var(--c-primary);
    font-size: 14px;
    font-weight: 500;
    text-align: left;
  }

  .detail-scroll {
    padding: 16px;
  }

  .store-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-input--small {
    width: 100%;
    max-width: none;
  }

  .detail-head {
    flex-direction: column;
  }
}
</style>
