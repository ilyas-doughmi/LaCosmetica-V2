<template>
  <div v-if="notification.visible" :class="['toast-box', notification.type]">
    {{ notification.message }}
  </div>
</template>

<script setup>
const { notification } = useNotification()
</script>

<style scoped>
.toast-box { 
  position: fixed; 
  top: 20px; 
  right: 20px; 
  padding: 15px 25px; 
  border-radius: 8px; 
  color: white; 
  font-weight: bold;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.success { background-color: #4CAF50; } 
.error { background-color: #F44336; }   
</style>