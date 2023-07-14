<script setup lang="ts">
import HomeCard from "@/components/HomeCard.vue";
import AutoTable from "@/components/AutoTable.vue";
import { useRouter } from "vue-router";
// import { onMounted } from "vue";
import { inject } from "vue";
import { closeSocket, createSocket } from "../hooks/useWebSocket";
const onMessageList: any = inject("onMessageList"); // 接收注入
const socketMessage = (res: any) => {
  // const data = JSON.parse(res.data);
  // do something
};
onMessageList?.push(socketMessage); // 将自定义处理事件插入onMessge集合

const router = useRouter();
// onMounted(() => { router.replace({ name: 'canvas' }) })
</script>

<template>
  <el-tooltip placement="left" effect="light">
    <template #content>
      <div style="width: 190px; height: 85px; padding: 10px 6px">
        <p class="title">商务咨询请联系</p>
        <div class="content">
          <p class="phone">客服电话: 0571-87918692</p>
          <p class="worktime">工作时间: 周一至周五 9:00-17:30</p>
        </div>
      </div>
    </template>
    <div class="contact">
      <el-icon>
        <Phone />
      </el-icon>
    </div>
  </el-tooltip>
  <el-tooltip placement="left" content="返回顶部" effect="light">
    <!-- <el-backtop right="{50}" bottom="200" visibilityHeight="40" class="back" /> -->
  </el-tooltip>
  <main>
    <button @click="createSocket">开启连接</button>
    <button @click="closeSocket">关闭连接</button>
    <div class="main" @click="router.push({ name: 'partner' })" />
    <HomeCard />
    <!-- <AutoTable /> -->
    <div style="height: 1000px">
      <div class="ex">123123</div>
      <a class="ex">111</a>
      <a class="ea">24234</a>
    </div>
  </main>
</template>

<style scoped lang="less">
a .ex {
  color: red;
}

.contact {
  background-color: #fff;
  position: fixed;
  right: 50px;
  bottom: 260px;
  width: 40px;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  font-size: 20px;
  box-shadow: var(--el-box-shadow-lighter);
  height: 40px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    color: #fff;
    background: var(--primary-color);
  }
}

.title {
  font-weight: 500;
  font-size: 14px;
}

.content {
  color: #b3b3b3;
  margin-top: 3px;
  font-weight: 400;
  font-size: 10px;
}

.back {
  color: var(--primary-color);

  &:hover {
    color: #fff;
    background: var(--primary-color);
  }
}

main {
  margin-top: 102px;
}

.main {
  width: 100vw;
  height: 80vh;
  background-position: 50%;
  cursor: pointer;
  background-size: cover;
  background-image: url("https://public-hzide.oss-cn-hangzhou.aliyuncs.com/images/688009ad-21df-431f-bfb4-4a52ecc59e9b.jpg?x-oss-process=image/format,jpg/interlace,1");
}
</style>
