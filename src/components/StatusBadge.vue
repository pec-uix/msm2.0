<template>
  <span class="status-badge" :class="statusClass">{{ label }}</span>
</template>

<script>
export default {
  name: 'StatusBadge',
  props: {
    status: {
      type: String,
      default: 'pending'
    }
  },
  computed: {
    statusClass () {
      return `status--${this.status}`
    },
    label () {
      const labels = {
        draft: '草稿',
        pending: '待審核',
        confirmed: '已確認',
        processing: '處理中',
        cancelled: '已取消',
        transferred: '已拋轉'
      }
      return labels[this.status] || this.status
    }
  }
}
</script>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 8px;
  border-radius: 2px;
  border: none;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  white-space: nowrap;
  line-height: 1;
}

/* 草稿 — 極淡灰 / 中性文字，不搶眼 */
.status--draft {
  background: #F8FAFC;
  color: #64748B;
  border: 0.5px solid #E2E8F0;
}

/* 待審核 — 深鋼青 / 帶邊框強化實體感 */
.status--pending {
  background: #F1F5F9;
  color: #334155;
  font-weight: 600;
  border: 0.5px solid var(--c-border);
}

/* 已確認 — 極淡藍 / 系統主色文字 */
.status--confirmed {
  background: #E0E7FF;
  color: var(--c-primary);
}

/* 處理中 — 極淡米黃 / 深棕色文字 */
.status--processing {
  background: #FEF3C7;
  color: #92400E;
}

/* 已取消 — 極淡粉紅 / 深磚紅文字 */
.status--cancelled {
  background: #FEE2E2;
  color: #991B1B;
}

/* 已拋轉 — 極淡灰 / 帶邊框確保邊界 */
.status--transferred {
  background: #F8FAFC;
  color: #475569;
  font-weight: 500;
  border: 0.5px solid var(--c-border);
}
</style>
