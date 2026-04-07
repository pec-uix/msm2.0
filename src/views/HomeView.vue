<template>
  <div class="home-view">
    <section class="hero">
      <h2>歡迎使用 B2B 訂單管理系統</h2>
      <p>快速查看訂單、產品、庫存與促銷專區。</p>
    </section>
    <section class="overview-cards">
      <div class="card">角色：{{ currentUser.role }}</div>
      <div class="card">公司：{{ currentUser.company }}</div>
      <div class="card">帳號：{{ currentUser.name }}</div>
      <div class="card">操作提示：請使用上方分頁導覽。</div>
    </section>
  </div>
</template>

<script>
import { getCurrentUser } from '../services/auth'

export default {
  name: 'HomeView',
  computed: {
    currentUser () {
      return getCurrentUser() || { role: '訪客', company: '', name: '' }
    }
  }
}
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero {
  padding: 24px;
  border-radius: 16px;
  background: #ffffff;
}

.hero h2 {
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: 500;
}

.hero p {
  color: #5f6f8f;
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.card {
  padding: 18px;
  border-radius: 16px;
  background: #ffffff;
  font-weight: 500;
  color: #1a2540;
}

@media (max-width: 760px) {
  .overview-cards {
    grid-template-columns: 1fr;
  }
}
</style>
