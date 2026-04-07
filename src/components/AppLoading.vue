<template>
  <div class="app-loading" v-if="show">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: 'AppLoading',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.app-loading {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
}

.loader {
  width: 42px;
  height: 42px;
  border: 4px solid #dde4f0;
  border-top-color: #1a2540;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
