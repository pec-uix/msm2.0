<template>
  <div class="login-page">
    <div class="login-panel">
      <h1>登入系統</h1>
      <form @submit.prevent="submitLogin">
        <label>帳號</label>
        <input v-model="username" autocomplete="username" placeholder="請輸入帳號" />
        <label>密碼</label>
        <input v-model="password" type="password" autocomplete="current-password" placeholder="請輸入密碼" />
        <button type="submit">登入</button>
      </form>
      <p class="hint">測試帳號：customer01 / sales01 / company01 / group01，密碼皆為 123</p>
      <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { users } from '../mock/users'
import { saveCurrentUser, getCurrentUser } from '../services/auth'

export default {
  name: 'LoginView',
  data () {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  created () {
    if (getCurrentUser()) {
      this.$router.replace('/')
    }
  },
  methods: {
    submitLogin () {
      const found = users.find(
        item => item.username === this.username && item.password === this.password
      )
      if (!found) {
        this.errorMessage = '帳號或密碼錯誤，請重新輸入。'
        return
      }
      saveCurrentUser(found)
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f9ff;
  padding: 24px;
}

.login-panel {
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  padding: 32px;
  border-radius: 16px;
}

h1 {
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 500;
  color: #1a2540;
}

label {
  display: block;
  margin-top: 14px;
  margin-bottom: 8px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d9e1f2;
  border-radius: 10px;
  font-size: 14px;
}

button {
  width: 100%;
  margin-top: 22px;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: #1a2540;
  color: #dde4f0;
  font-weight: 500;
  cursor: pointer;
}

.hint {
  margin-top: 18px;
  color: #6f7d91;
  font-size: 13px;
}

.error {
  margin-top: 14px;
  color: #8c2020;
  font-size: 14px;
}
</style>
