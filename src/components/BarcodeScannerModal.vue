<template>
  <div v-if="visible" class="scanner-overlay" @click.self="handleClose">
    <div class="scanner-modal" role="dialog" aria-modal="true">
      <div class="scanner-header">
        <div>
          <h3 class="scanner-title">{{ title }}</h3>
          <p class="scanner-hint">{{ hint }}</p>
        </div>
        <button type="button" class="scanner-close-btn" @click="handleClose" aria-label="關閉">×</button>
      </div>

      <div class="scanner-preview">
        <video ref="video" class="scanner-video" autoplay muted playsinline></video>
        <div v-if="isStarting" class="scanner-overlay-state">啟動相機中...</div>
        <div v-else class="scanner-overlay-state scanner-overlay-state--guide">
          將 EAN-13 條碼置於畫面中央
        </div>
      </div>

      <p v-if="message" class="scanner-message">{{ message }}</p>
      <p v-if="errorMessage" class="scanner-error">{{ errorMessage }}</p>

      <div class="scanner-actions">
        <button type="button" class="scanner-cancel-btn" @click="handleClose">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library'

export default {
  name: 'BarcodeScannerModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '條碼掃描'
    },
    hint: {
      type: String,
      default: '讀取相機畫面中的國際條碼（EAN-13）'
    }
  },
  data () {
    return {
      reader: null,
      controls: null,
      isStarting: false,
      message: '',
      errorMessage: ''
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler (val) {
        if (val) {
          this.startScanning()
        } else {
          this.stopScanning()
        }
      }
    }
  },
  beforeDestroy () {
    this.stopScanning()
  },
  methods: {
    startScanning () {
      this.stopScanning()
      this.errorMessage = ''
      this.message = '請將條碼靠近鏡頭'
      this.isStarting = true

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        this.isStarting = false
        this.errorMessage = '您的瀏覽器不支援相機掃描'
        return
      }

      this.reader = new BrowserMultiFormatReader()

      this.$nextTick(() => {
        const videoEl = this.$refs.video
        if (!videoEl) {
          this.isStarting = false
          this.errorMessage = '相機初始化失敗'
          return
        }

        this.reader.decodeFromVideoDevice(undefined, videoEl, (result, err, controls) => {
          this.controls = controls || this.controls
          if (result) {
            const code = result.getText()
            this.message = `已掃描：${code}`
            this.$emit('scanned', code)
            this.handleClose(false)
            return
          }

          if (err && !(err instanceof NotFoundException)) {
            this.errorMessage = '無法讀取條碼，請重新對準鏡頭'
          }

          this.isStarting = false
        })
      })
    },
    stopScanning () {
      if (this.controls && typeof this.controls.stop === 'function') {
        try {
          this.controls.stop()
        } catch (error) {
          console.warn('[BarcodeScannerModal] stop controls failed', error)
        }
      }
      if (this.reader && typeof this.reader.reset === 'function') {
        try {
          this.reader.reset()
        } catch (error) {
          console.warn('[BarcodeScannerModal] reset reader failed', error)
        }
      }
      this.controls = null
      this.reader = null
      this.isStarting = false
    },
    handleClose (emitClose = true) {
      this.stopScanning()
      if (emitClose) this.$emit('close')
    }
  }
}
</script>

<style scoped>
.scanner-overlay {
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.scanner-modal {
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  border-radius: 14px;
  border: 0.5px solid #e2e8f0;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.scanner-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.scanner-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
}

.scanner-hint {
  margin: 4px 0 0;
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
}

.scanner-close-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 999px;
  background: #f8fafc;
  color: #64748b;
  font-size: 18px;
  cursor: pointer;
}

.scanner-preview {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #0f172a;
  min-height: 300px;
}

.scanner-video {
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
  background: #111827;
}

.scanner-overlay-state {
  position: absolute;
  inset: auto 12px 12px 12px;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.76);
  color: #ffffff;
  font-size: 12px;
  text-align: center;
}

.scanner-overlay-state--guide {
  top: 12px;
  bottom: auto;
}

.scanner-message {
  margin: 0;
  font-size: 13px;
  color: #334155;
}

.scanner-error {
  margin: 0;
  font-size: 13px;
  color: #b42318;
}

.scanner-actions {
  display: flex;
  justify-content: flex-end;
}

.scanner-cancel-btn {
  height: 40px;
  padding: 0 16px;
  border: 0.5px solid #e2e8f0;
  border-radius: 8px;
  background: transparent;
  color: #475569;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}
</style>
