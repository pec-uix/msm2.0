<template>
  <section class="promotion-notice-section" aria-label="促銷公告">
    <div class="panel-head">
      <div>
        <p class="panel-eyebrow">PROMOTION NOTICE</p>
        <h3 class="panel-title">促銷公告</h3>
      </div>
    </div>

    <div class="promotion-notice-grid">
      <section class="promotion-notice-column">
        <div class="promotion-notice-column-head">
          <h4 class="promotion-notice-column-title">Active Promotions</h4>
        </div>
        <ul class="promotion-notice-list">
          <li v-if="!activePromotions.length" class="promotion-notice-empty">
            No current promotions
          </li>
          <li v-for="promo in activePreviewPromotions" :key="promo.id">
            <button
              type="button"
              class="promotion-notice-card promotion-notice-card--button"
              @click="openPromotionNoticeModal(promo)"
            >
              <div class="promotion-notice-item-head">
                <span class="promotion-notice-name">{{ promo.name }}</span>
                <span class="promo-badge">PROMO</span>
              </div>
              <p class="promotion-notice-desc">{{ promo.description }}</p>
              <ul v-if="promo.gifts && promo.gifts.length" class="promotion-notice-gifts">
                <li v-for="gift in promo.gifts" :key="gift.name">
                  {{ gift.name }} × {{ gift.quantity }}
                </li>
              </ul>
            </button>
          </li>
        </ul>
        <button
          v-if="activeOverflowCount > 0"
          type="button"
          class="promotion-notice-more"
          @click="openPromotionNoticeModal('active')"
        >
          查看其餘 {{ activeOverflowCount }} 個活動 ...
        </button>
      </section>

      <section class="promotion-notice-column">
        <div class="promotion-notice-column-head">
          <h4 class="promotion-notice-column-title">Coming Soon</h4>
        </div>
        <ul class="promotion-notice-list">
          <li v-if="!upcomingPromotions.length" class="promotion-notice-empty">
            No upcoming promotions
          </li>
          <li v-for="promo in upcomingPreviewPromotions" :key="promo.id">
            <button
              type="button"
              class="promotion-notice-card promotion-notice-card--button"
              @click="openPromotionNoticeModal(promo)"
            >
              <div class="promotion-notice-item-head">
                <span class="promotion-notice-name">{{ promo.name }}</span>
                <span class="promo-badge">PROMO</span>
              </div>
              <p class="promotion-notice-desc">{{ promo.description }}</p>
              <ul v-if="promo.gifts && promo.gifts.length" class="promotion-notice-gifts">
                <li v-for="gift in promo.gifts" :key="gift.name">
                  {{ gift.name }} × {{ gift.quantity }}
                </li>
              </ul>
            </button>
          </li>
        </ul>
        <button
          v-if="upcomingOverflowCount > 0"
          type="button"
          class="promotion-notice-more"
          @click="openPromotionNoticeModal('upcoming')"
        >
          查看其餘 {{ upcomingOverflowCount }} 個活動 ...
        </button>
      </section>
    </div>

    <PromotionModal
      :open="promotionNoticeModal.open"
      :title="promotionNoticeModal.title"
      :subtitle="promotionNoticeModal.subtitle"
      :items="promotionNoticeModal.items"
      :empty-text="promotionNoticeModal.emptyText"
      @close="closePromotionNoticeModal"
    />
  </section>
</template>

<script>
import PromotionModal from './PromotionModal.vue'
import { classifyPromotions, promotionHasDetailContent } from '../utils/promotionUtils'

export default {
  name: 'PromotionNotice',
  components: { PromotionModal },
  props: {
    promotions: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      promotionNoticeModal: {
        open: false,
        title: '',
        subtitle: '',
        items: [],
        emptyText: '目前沒有可顯示的促銷資訊。'
      }
    }
  },
  computed: {
    classifiedPromotions () {
      return classifyPromotions(this.promotions)
    },
    activePromotions () {
      return this.classifiedPromotions.active
    },
    upcomingPromotions () {
      return this.classifiedPromotions.upcoming
    },
    activePreviewPromotions () {
      return this.activePromotions.slice(0, 3)
    },
    upcomingPreviewPromotions () {
      return this.upcomingPromotions.slice(0, 3)
    },
    activeOverflowCount () {
      return Math.max(0, this.activePromotions.length - this.activePreviewPromotions.length)
    },
    upcomingOverflowCount () {
      return Math.max(0, this.upcomingPromotions.length - this.upcomingPreviewPromotions.length)
    }
  },
  methods: {
    promotionHasDetailContent,
    openPromotionNoticeModal (target) {
      if (target && typeof target === 'object') {
        this.promotionNoticeModal.open = true
        this.promotionNoticeModal.title = target.name || 'PROMOTION DETAILS'
        this.promotionNoticeModal.subtitle = target.id || ''
        this.promotionNoticeModal.items = [target]
        this.promotionNoticeModal.emptyText = '這則促銷目前沒有可顯示的促銷資訊。'
        return
      }

      if (target !== 'active' && target !== 'upcoming') return
      const items = target === 'active' ? this.activePromotions : this.upcomingPromotions
      this.promotionNoticeModal.open = true
      this.promotionNoticeModal.title = target === 'active' ? 'Active Promotions' : 'Coming Soon'
      this.promotionNoticeModal.subtitle = target === 'active'
        ? `目前進行中，共 ${items.length} 筆`
        : `尚未開始，共 ${items.length} 筆`
      this.promotionNoticeModal.items = items
      this.promotionNoticeModal.emptyText = target === 'active'
        ? 'No current promotions'
        : 'No upcoming promotions'
    },
    closePromotionNoticeModal () {
      this.promotionNoticeModal.open = false
      this.promotionNoticeModal.title = ''
      this.promotionNoticeModal.subtitle = ''
      this.promotionNoticeModal.items = []
      this.promotionNoticeModal.emptyText = '目前沒有可顯示的促銷資訊。'
    }
  }
}
</script>

<style scoped>
.promotion-notice-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.panel-eyebrow {
  margin: 0 0 6px;
  color: var(--c-text-faint);
  font-size: 11px;
  letter-spacing: 0.16em;
}

.panel-title {
  margin: 0;
  color: var(--c-text-title);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
}

.promotion-notice-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.promotion-notice-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 0.5px solid var(--c-border);
  border-radius: 14px;
  background: var(--c-surface);
}

.promotion-notice-column-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.promotion-notice-column-title {
  margin: 0;
  color: var(--c-text-title);
  font-size: 16px;
  font-weight: 700;
}

.promotion-notice-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.promotion-notice-empty {
  padding: 14px 0;
  color: var(--c-text-muted);
  font-size: 13px;
}

.promotion-notice-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  border: 0.5px solid #dbe3ef;
  border-radius: 12px;
  background: #ffffff;
  padding: 14px 15px;
  text-align: left;
}

.promotion-notice-card--button {
  cursor: pointer;
  transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease;
}

.promotion-notice-card--button:hover {
  border-color: var(--c-primary);
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
}

.promotion-notice-item-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.promotion-notice-name {
  color: var(--c-text-title);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.45;
}

.promotion-notice-desc {
  margin: 0;
  color: var(--c-text-body);
  font-size: 13px;
  line-height: 1.55;
}

.promotion-notice-gifts {
  margin: 0;
  padding-left: 18px;
  color: var(--c-text-body);
  font-size: 12px;
  line-height: 1.55;
}

.promotion-notice-more {
  align-self: flex-start;
  border: none;
  background: none;
  color: var(--c-primary);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

@media (max-width: 767px) {
  .promotion-notice-grid {
    grid-template-columns: 1fr;
  }
}
</style>
