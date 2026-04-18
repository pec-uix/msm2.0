<template>
  <div class="app-snackbar" v-if="message">
    <span :class="['message', typeClass]">{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: 'AppSnackbar',
  props: {
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'success'
    }
  },
  computed: {
    typeClass () {
      return this.type === 'error' ? 'error' : 'success'
    }
  }
}
</script>

<style scoped>
.app-snackbar {
  position: fixed;
  top: 72px;
  right: 20px;
  transform: none;
  padding: 10px 16px;
  border-radius: 8px;
  background: rgba(26, 37, 64, 0.96);
  color: #f7f9ff;
  font-weight: 500;
  font-size: 13px;
  z-index: 9999;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
}

.message.success {
  color: #d7f2d9;
}

.message.error {
  color: #f7c0c0;
}
</style>
