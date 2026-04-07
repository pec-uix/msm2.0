<template>
  <div class="inventory-detail-view">
    <h2>庫存盤點：{{ checkId }}</h2>
    <div class="detail-card">
      <div class="row"><span>盤點說明：</span>此盤點項目為系統示範內容。</div>
      <div class="row"><span>負責人：</span>王主管</div>
      <div class="row"><span>狀態：</span>待確認</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InventoryCheckDetailView',
  props: ['checkId']
}
</script>

<style scoped>
.inventory-detail-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-card {
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e3eaf5;
  display: grid;
  gap: 12px;
}

.row {
  display: flex;
  gap: 10px;
  color: #4a556a;
}
</style>
