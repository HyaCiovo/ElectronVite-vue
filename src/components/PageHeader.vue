<script lang="ts" setup>
import { ref, computed } from "vue";
import MenuTab from "@/components/MenuTab.vue";
const now = ref(new Date().getHours() || 0);
const time = computed(() => {
  let _time;
  if ((now.value >= 0 && now.value <= 4) || now.value >= 18) _time = "晚上";
  else if (now.value < 9) _time = "早上";
  else if (now.value < 11) _time = "上午";
  else if (now.value < 13) _time = "中午";
  else _time = "下午";
  return _time;
});
</script>

<template>
  <header>
    <div class="hello">
      <span>{{
        `${time}好，欢迎来到杭州国际数字交易有限公司（杭数交）！`
      }}</span>
      <div class="actions">
        <div class="action">登录</div>
        <div class="action register">注册</div>
      </div>
    </div>
    <MenuTab />
  </header>
</template>

<style scoped lang="less">
header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100vw;
}

.hello {
  padding: 0 24px;
  height: 30px;
  background-color: rgb(7, 84, 178);
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
}

.actions {
  width: 7%;
  display: flex;
  justify-content: space-around;
}

.action {
  cursor: pointer;
}

.register {
  padding: 1px 5px;
  border-radius: 2px;
  background-color: rgb(97, 170, 231);
}
</style>
