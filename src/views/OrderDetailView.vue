<template>
  <div class="order-detail-view">
    <h2>訂單 {{ orderId }}</h2>
    <div class="order-card">
      <div class="row"><span>客戶：</span> {{ customerName }}</div>
      <div class="row"><span>狀態：</span> <status-badge :status="order.status" /></div>
      <div class="row"><span>日期：</span> {{ order.date }}</div>
      <div class="row"><span>金額：</span> NT$ {{ order.amount }}</div>
    </div>
    <router-link class="link-button" :to="reviewLink">前往審核</router-link>
  </div>
</template>

<script>
import { customers } from '../mock/customers'
const customerMap = Object.fromEntries(customers.map(c => [c.id, c.name]))
export default {
  name: 'OrderDetailView',
  props: ['orderId'],
  computed: {
    order () {
      return this.$store.state.orders.find(item => item.orderId === this.orderId) || {}
    },
    customerName () {
      return customerMap[this.order.customerId] || this.order.customerId || '—'
    },
    reviewLink () {
      return `/orders/${this.orderId}/review`
    }
  }
}
</script>

<style scoped>
.order-detail-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.order-card {
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e3eaf5;
  display: grid;
  gap: 14px;
}

.row {
  display: flex;
  gap: 10px;
  color: #4a556a;
}

.link-button {
  align-self: flex-start;
  padding: 10px 16px;
  background: #1a2540;
  color: #dde4f0;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
}
</style>
