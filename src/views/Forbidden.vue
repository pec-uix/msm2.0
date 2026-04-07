<template>
  <div class="forbidden-page">
    <div class="forbidden-card">
      <div class="error-code">403</div>
      <h1 class="error-title">您沒有存取此頁面的權限</h1>
      <p class="error-desc">請確認您的帳號角色，或聯繫系統管理員</p>
      <router-link to="/" class="home-btn">返回首頁</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForbiddenPage'
}
</script>

<style scoped>
.forbidden-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fb;
  padding: 24px;
}

.forbidden-card {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
}

.error-code {
  font-size: 80px;
  font-weight: 500;
  color: #d0ddf0;
  line-height: 1;
}

.error-title {
  font-size: 18px;
  font-weight: 500;
  color: #334155;
  margin: 0;
}

.error-desc {
  font-size: 13px;
  font-weight: 400;
  color: #8b95a8;
  margin: 0;
}

.home-btn {
  display: inline-block;
  margin-top: 8px;
  padding: 10px 28px;
  background: var(--c-primary);
  color: #ffffff;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
}
</style>
