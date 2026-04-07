<template>
  <div class="forbidden-view">
    <div class="content-card">
      <h2>403 無權限</h2>
      <p>您目前沒有瀏覽此頁面的權限，請聯絡系統管理員或切換正確角色後再試。</p>
      <router-link class="back-button" to="/">回到首頁</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForbiddenView'
}
</script>

<style scoped>
.forbidden-view {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.content-card {
  max-width: 520px;
  padding: 30px;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e3eaf5;
  text-align: center;
}

h2 {
  margin-bottom: 16px;
  color: #1a2540;
}

p {
  margin-bottom: 20px;
  color: #5f6f8f;
}

.back-button {
  display: inline-block;
  padding: 10px 18px;
  border-radius: 12px;
  background: #1a2540;
  color: #dde4f0;
  text-decoration: none;
  font-weight: 500;
}
</style>
