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
  left: 50%;
  bottom: 22px;
  transform: translateX(-50%);
  padding: 12px 18px;
  border-radius: 20px;
  background: rgba(26, 37, 64, 0.96);
  color: #f7f9ff;
  font-weight: 500;
  z-index: 9999;
}

.message.success {
  color: #d7f2d9;
}

.message.error {
  color: #f7c0c0;
}
</style>
