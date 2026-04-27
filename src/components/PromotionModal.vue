<template>
  <transition name="modal-fade">
    <div
      v-if="open"
      class="promotion-modal-overlay"
      @click.self="close"
    >
      <div class="promotion-modal" role="dialog" aria-modal="true">
        <button
          type="button"
          class="promotion-modal-close"
          aria-label="關閉"
          @click="close"
        >×</button>
        <div class="promotion-modal-head">
          <p class="promotion-modal-eyebrow">PROMOTION DETAILS</p>
          <h3 class="promotion-modal-title">{{ title }}</h3>
          <p v-if="subtitle" class="promotion-modal-subtitle">{{ subtitle }}</p>
        </div>

        <div v-if="hasContent" class="promotion-modal-list">
          <article v-for="promo in items" :key="promo.id" class="promotion-modal-card">
            <div class="promotion-modal-card-head">
              <h4 class="promotion-modal-name">{{ promo.name }}</h4>
              <span class="promo-badge">PROMO</span>
            </div>
            <div class="promotion-modal-period">
              促銷期間：{{ promo.startDate || '—' }} ～ {{ promo.endDate || '—' }}
            </div>
            <p v-if="promotionDescriptionText(promo)" class="promotion-modal-desc">
              {{ promotionDescriptionText(promo) }}
            </p>
            <div v-if="promotionConditionText(promo)" class="promotion-modal-condition">
              <span class="promotion-modal-label">條件</span>
              <span class="promotion-modal-text">{{ promotionConditionText(promo) }}</span>
            </div>
            <div v-if="promo.gifts && promo.gifts.length" class="promotion-modal-gifts">
              <span class="promotion-modal-label">贈品</span>
              <ul>
                <li v-for="gift in promo.gifts" :key="gift.name">
                  {{ gift.name }} × {{ gift.quantity }}
                </li>
              </ul>
            </div>
          </article>
        </div>
        <div v-else class="promotion-modal-empty">
          {{ emptyText }}
        </div>

        <div class="promotion-modal-footer">
          <button type="button" class="promotion-modal-btn" @click="close">關閉</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { promotionConditionText, promotionDescriptionText, promotionHasDetailContent } from '../utils/promotionUtils'

export default {
  name: 'PromotionModal',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'PROMOTION DETAILS'
    },
    subtitle: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    },
    emptyText: {
      type: String,
      default: '目前沒有可顯示的促銷資訊。'
    }
  },
  computed: {
    hasContent () {
      return this.items.some(promo => promotionHasDetailContent(promo))
    }
  },
  methods: {
    promotionDescriptionText,
    promotionConditionText,
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.promotion-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: rgba(15, 23, 42, 0.42);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

.promotion-modal {
  position: relative;
  width: min(760px, 100%);
  max-height: min(86vh, 880px);
  overflow: auto;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.24);
  padding: 28px 26px 22px;
}

.promotion-modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.06);
  color: #334155;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}

.promotion-modal-head {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-right: 40px;
}

.promotion-modal-eyebrow {
  margin: 0;
  color: #64748b;
  font-size: 12px;
  letter-spacing: 0.14em;
}

.promotion-modal-title {
  margin: 0;
  color: #0f172a;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.3;
}

.promotion-modal-subtitle {
  margin: 0;
  color: #64748b;
  font-size: 12px;
}

.promotion-modal-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.promotion-modal-card {
  border: 0.5px solid #dbe3ef;
  border-radius: 14px;
  padding: 16px 18px;
  background: #ffffff;
}

.promotion-modal-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.promotion-modal-name {
  margin: 0;
  color: #0f172a;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
}

.promotion-modal-period,
.promotion-modal-desc,
.promotion-modal-condition,
.promotion-modal-gifts {
  margin-top: 8px;
  color: #334155;
  font-size: 13px;
  line-height: 1.65;
}

.promotion-modal-label {
  display: inline-block;
  min-width: 38px;
  margin-right: 8px;
  color: #64748b;
  font-size: 12px;
}

.promotion-modal-text {
  color: #334155;
}

.promotion-modal-gifts ul {
  margin: 6px 0 0;
  padding-left: 18px;
}

.promotion-modal-footer {
  margin-top: 20px;
}

.promotion-modal-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 44px;
  border: none;
  border-radius: 12px;
  background: #334155;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.promotion-modal-empty {
  margin-top: 18px;
  padding: 18px;
  border-radius: 12px;
  background: #f8fafc;
  color: #64748b;
  font-size: 13px;
  line-height: 1.6;
}

@media (max-width: 767px) {
  .promotion-modal {
    width: 100%;
    padding: 22px 18px 18px;
    border-radius: 16px;
  }

  .promotion-modal-title {
    font-size: 19px;
  }
}
</style>
