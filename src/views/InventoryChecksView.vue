<template>
  <div class="inventory-view">
    <h2>庫存盤點</h2>
    <div class="inventory-list">
      <div class="inventory-card" v-for="item in checks" :key="item.id">
        <div>
          <strong>{{ item.name }}</strong>
          <div class="meta">盤點負責：{{ item.owner }}</div>
        </div>
        <router-link :to="`/inventory-checks/${item.id}`" class="link-button">檢視</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InventoryChecksView',
  data () {
    return {
      checks: [
        { id: 'IC-01', name: '倉庫 A 盤點', owner: '李主管' },
        { id: 'IC-02', name: '倉庫 B 盤點', owner: '王主管' },
        { id: 'IC-03', name: '外倉 C 盤點', owner: '張主管' }
      ]
    }
  }
}
</script>

<style scoped>
.inventory-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.inventory-list {
  display: grid;
  gap: 16px;
}

.inventory-card {
  padding: 18px;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e3eaf5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.meta {
  color: #5f6f8f;
  margin-top: 6px;
}

.link-button {
  padding: 10px 16px;
  background: #1a2540;
  color: #dde4f0;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
}
</style>
