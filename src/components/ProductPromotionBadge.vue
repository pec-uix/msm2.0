<template>
  <span v-if="matchedPromotions.length" class="product-promo-badge-wrap">
    <button
      type="button"
      class="promo-badge promo-badge--icon"
      aria-label="查看促銷資訊"
      @click.stop="openModal"
    >
      <tag-icon :size="12" :stroke-width="2" />
      <span>促銷</span>
    </button>

    <PromotionModal
      :open="modalOpen"
      :title="modalTitle"
      :subtitle="modalSubtitle"
      :items="matchedPromotions"
      :empty-text="emptyText"
      @close="closeModal"
    />
  </span>
</template>

<script>
import { Tag as TagIcon } from 'lucide-vue'
import PromotionModal from './PromotionModal.vue'
import { filterPromotionsForProduct, promotionHasDetailContent } from '../utils/promotionUtils'

export default {
  name: 'ProductPromotionBadge',
  components: { PromotionModal, TagIcon },
  props: {
    productId: {
      type: String,
      required: true
    },
    productName: {
      type: String,
      default: ''
    },
    promotions: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      modalOpen: false
    }
  },
  computed: {
    matchedPromotions () {
      return filterPromotionsForProduct(this.promotions, this.productId)
    },
    modalTitle () {
      return this.productName || '促銷資訊'
    },
    modalSubtitle () {
      return this.productId || ''
    },
    emptyText () {
      return '這個商品目前沒有可顯示的促銷資訊。'
    }
  },
  methods: {
    openModal () {
      this.modalOpen = true
    },
    closeModal () {
      this.modalOpen = false
    },
    promotionHasDetailContent
  }
}
</script>

<style scoped>
.product-promo-badge-wrap {
  display: inline-flex;
  align-items: center;
}
</style>
