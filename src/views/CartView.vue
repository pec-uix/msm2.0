<template>
  <div class="cart-view">
    <h2>購物車</h2>
    <div class="placeholder-card">
      <p>這是客戶購物車頁面，未來可顯示已選商品與數量。</p>
      <router-link class="confirm-button" to="/cart/confirm">前往確認訂單</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartView'
}
</script>

<style scoped>
.cart-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.placeholder-card {
  padding: 24px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e3eaf5;
}

.confirm-button {
  display: inline-block;
  margin-top: 16px;
  padding: 10px 18px;
  color: #dde4f0;
  background: #1a2540;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 500;
}
</style>
