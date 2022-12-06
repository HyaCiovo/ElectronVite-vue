<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
// defineProps<{
//   msg: string;
// }>();
const router = useRouter();
const route = useRoute();
const list = [
  { title: "首页", path: "/" },
  { title: "数据要素", path: "/data-exchange" },
  { title: "数据资产", path: "/showape" },
  { title: "合作伙伴", path: "/partner" },
  { title: "新闻资讯", path: "/news" },
  { title: "帮助中心", path: "/help" },
  { title: "关于我们", path: "/about" },
];
const activeTab = computed(() => {
  let index = list.findIndex((item) => {
    return item.path === route.path;
  });
  return index !== -1 ? list[index].path : "/";
});
const go = (path: string) => {
  router.push({ path: path });
};
</script>

<template>
  <el-menu
    :default-active="activeTab"
    class="el-menu-demo"
    router
    mode="horizontal"
    :ellipsis="false"
  >
    <img
      src="https://public-hzide.oss-cn-hangzhou.aliyuncs.com/portal/logo.svg"
      height="45"
      class="logo"
      @click="go('/')"
    />
    <div class="flex-grow" />
    <el-menu-item v-for="(item, index) in list" :key="index" :index="item.path"
      >{{ item.title }}
    </el-menu-item>
    <div class="flex-grow" />
    <el-tooltip effect="dark" content="进入用户中心" placement="bottom">
      <div class="icon_container">
        <el-icon size="18" class="icon">
          <User />
        </el-icon>
      </div>
    </el-tooltip>
    <el-tooltip effect="dark" content="进入商家后台" placement="bottom">
      <div class="icon_container" style="margin-left: 15px">
        <el-icon size="18" class="icon">
          <Monitor />
        </el-icon>
      </div>
    </el-tooltip>
  </el-menu>
</template>

<style scoped lang="less">
.box-item {
  width: 110px;
  margin-top: 10px;
}

.icon_container {
  margin: auto;
  width: 40px;
  border: 1px solid #e2e2e2;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    color: var(--primary-color);
  }
}

.logo {
  margin: auto;
  cursor: pointer;
}

.el-menu-demo {
  padding: 0 20px;
  height: 72px;
}

.el-menu-item {
  font-size: 18px;
}

.el-menu-item.is-active {
  border-bottom: 2px solid var(--primary-color);
  color: var(--primary-color) !important;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
  background-color: transparent;
  color: #000;
}

.el-menu-item:not(.is-disabled):hover {
  color: var(--primary-color);
  background-color: transparent;
}

.item_0 {
  margin: auto;
}

.flex-grow {
  flex-grow: 1;
}
</style>
