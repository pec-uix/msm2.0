<template>
  <div class="customer-list-item" :class="{ selected: selected }">
    <div class="customer-list-item__top">
      <div class="customer-list-item__name-wrap">
        <span class="customer-list-item__name item-name">{{ name }}</span>
        <span v-if="hasOrder" class="customer-list-item__badge item-badge">已下單</span>
      </div>
      <div v-if="distanceLabel" class="customer-list-item__distance item-distance">
        <map-pin-icon :size="11" :stroke-width="1.5" class="customer-list-item__distance-icon item-distance-icon" />
        <span>{{ distanceLabel }}</span>
      </div>
    </div>
    <div class="customer-list-item__address item-address">{{ address }}</div>
  </div>
</template>

<script>
import { MapPin as MapPinIcon } from 'lucide-vue'
import { formatDistanceLabel } from '../utils/distance'

export default {
  name: 'CustomerListItem',
  components: { MapPinIcon },
  props: {
    name: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    distance: {
      type: Number,
      default: null
    },
    hasOrder: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    distanceLabel () {
      return formatDistanceLabel(this.distance)
    }
  }
}
</script>

<style scoped>
.customer-list-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  min-width: 0;
}

.customer-list-item__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  min-width: 0;
}

.customer-list-item__name-wrap {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  flex: 1;
}

.customer-list-item__name {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.35;
  min-width: 0;
  word-break: break-word;
}

.customer-list-item__badge {
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 7px;
  border-radius: 999px;
  background: #ecfdf5;
  color: #047857;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
  flex-shrink: 0;
}

.customer-list-item__distance {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  color: #94a3b8;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.customer-list-item__distance-icon {
  color: #94a3b8;
  flex-shrink: 0;
}

.customer-list-item__address {
  font-size: 12px;
  font-weight: 400;
  color: #8b95a8;
  line-height: 1.4;
  word-break: break-word;
}

.customer-list-item.selected .customer-list-item__name,
.customer-list-item.selected .item-name {
  color: #ffffff !important;
}

.customer-list-item.selected .customer-list-item__address,
.customer-list-item.selected .item-address {
  color: rgba(255, 255, 255, 0.75) !important;
}

.customer-list-item.selected .customer-list-item__distance,
.customer-list-item.selected .customer-list-item__distance-icon,
.customer-list-item.selected .item-distance,
.customer-list-item.selected .item-distance-icon {
  color: #ffffff !important;
}

.customer-list-item.selected .customer-list-item__badge,
.customer-list-item.selected .item-badge {
  background: rgba(255, 255, 255, 0.2) !important;
  color: #ffffff !important;
}
</style>
