<template>
  <div class="review-view">
    <h2>訂單審核：{{ orderId }}</h2>
    <div class="review-card">
      <p>此頁面僅限銷售人員查看，您可以快速檢視並完成審核。</p>
      <div class="status-row">
        <span>審核結果：</span>
        <button class="action-button">確認</button>
        <button class="action-button secondary">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderReviewView',
  props: ['orderId']
}
</script>

<style scoped>
.review-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-card {
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e3eaf5;
}

.status-row {
  display: flex;
  gap: 12px;
  margin-top: 18px;
}

.action-button {
  padding: 10px 18px;
  border: none;
  border-radius: 12px;
  background: #1a2540;
  color: #dde4f0;
  font-weight: 500;
  cursor: pointer;
}

.action-button.secondary {
  background: #d9e1f2;
  color: #1a2540;
}
</style>
