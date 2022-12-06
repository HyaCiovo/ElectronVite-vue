<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import axios from "@/utils/request";

const tableHead = [
  {
    prop: "shopName",
    label: "数据要素供应方",
  },
  {
    prop: "productType",
    label: "要素类型",
  },
  {
    prop: "itemName",
    label: "要素名称",
  },
  {
    prop: "blockHash",
    label: "数据产品凭证",
  },
  {
    prop: "time",
    label: "凭证生成时间",
  },
];
const data = reactive<{ list: any[] }>({ list: [] });
const autotable = ref<any>(null);
const tableNode = ref<any>("autotable");
const fetchData = async () => {
  const res = await axios.get<any>("/api/fetchData");
  data.list = res.data;
};
const autoScroll = () => {
  if (data.list && data.list.length > 6) {
    tableNode.value = (document as any)
      .querySelector(".auto-table")
      .querySelector(".el-table__body-wrapper");
  }
};
onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <div class="container">
    <el-table height="300" tooltip-effect="dark" :data="data.list" stripe ref="autotable" class="auto-table">
      <el-table-column v-for="item in tableHead" show-overflow-tooltip :prop="item.prop" :label="item.label"
        :key="item.prop" />
    </el-table>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 100%;
  display: flex;
  justify-content: center;

  :deep(.el-table) {
    .el-table__body-wrapper .el-scrollbar__bar {
      display: none;
    }
  }
}

.auto-table {
  margin-top: 20px;
  width: 90%;
}
</style>
