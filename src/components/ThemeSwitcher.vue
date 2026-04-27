<template>
  <div v-if="mode !== 'init'" class="theme-switcher" :class="[`theme-switcher--${mode}`]" aria-label="背景色切換器">
    <button
      v-for="theme in themes"
      :key="theme.key"
      type="button"
      class="theme-option"
      :class="{ active: currentTheme === theme.key }"
      :aria-pressed="currentTheme === theme.key"
      @click="setTheme(theme.key)"
    >
      <span class="theme-swatch" :style="{ backgroundColor: theme.bg }">
        <svg v-if="currentTheme === theme.key" class="theme-check" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12.5l4.2 4.2L19 7.9" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <span class="theme-label">{{ theme.label }}</span>
    </button>
  </div>
</template>

<script>
const STORAGE_KEY = 'page-bg-theme'
const LEGACY_KEYS = ['theme', 'theme-key', 'themeVars']
const THEME_OPTIONS = [
  { key: 'businessBlue', label: '商務深藍', bg: '#F4F7F6' },
  { key: 'morningWhite', label: '晨霧白', bg: '#F8F9FA' },
  { key: 'warmSand', label: '暖沙米', bg: '#FAF7F2' },
  { key: 'lightRock', label: '淺岩灰', bg: '#ECEFF1' }
]

export default {
  name: 'ThemeSwitcher',
  props: {
    mode: {
      type: String,
      default: 'panel',
      validator: value => ['panel', 'init'].includes(value)
    }
  },
  data () {
    return {
      currentTheme: THEME_OPTIONS[0].key,
      themes: THEME_OPTIONS
    }
  },
  created () {
    const savedTheme = localStorage.getItem(STORAGE_KEY)
    if (savedTheme && this.themes.some(theme => theme.key === savedTheme)) {
      this.currentTheme = savedTheme
    } else {
      this.currentTheme = this.themes[0].key
    }
    this.applyTheme()
  },
  methods: {
    setTheme (key) {
      if (this.currentTheme === key) return
      this.currentTheme = key
      this.applyTheme()
    },
    applyTheme () {
      const theme = this.themes.find(item => item.key === this.currentTheme) || this.themes[0]
      document.documentElement.style.setProperty('--color-background-page', theme.bg)
      document.body.style.backgroundColor = theme.bg
      localStorage.setItem(STORAGE_KEY, theme.key)
      LEGACY_KEYS.forEach(key => localStorage.removeItem(key))
    }
  }
}
</script>

<style scoped>
.theme-switcher {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.theme-switcher--panel {
  width: 100%;
  max-width: none;
  padding: 12px 4px 4px;
  border-radius: 16px;
  background: transparent;
  backdrop-filter: none;
  border: none;
  box-shadow: none;
}

.theme-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

.theme-swatch {
  position: relative;
  width: 40px;
  height: 40px;
  border: 2px solid #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.12);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.theme-option:hover .theme-swatch {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.18);
}

.theme-option.active .theme-swatch {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.92), 0 4px 14px rgba(15, 23, 42, 0.2);
}

.theme-check {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 20px;
  height: 20px;
  color: #1f2937;
  filter: drop-shadow(0 1px 2px rgba(15, 23, 42, 0.25));
}

.theme-label {
  font-size: 12px;
  color: #8b95a8;
  line-height: 1.2;
  white-space: nowrap;
  text-align: center;
}

@media (max-width: 640px) {
  .theme-switcher {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .theme-switcher--panel {
    padding: 12px 0 4px;
  }
}

@media (max-width: 420px) {
  .theme-switcher {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px 8px;
  }

  .theme-swatch {
    width: 36px;
    height: 36px;
  }

  .theme-label {
    font-size: 11px;
  }
}
</style>
