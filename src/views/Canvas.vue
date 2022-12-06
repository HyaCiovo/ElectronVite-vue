<template>
  <div class="content">
    <div class="dom" ref="pageWrapper" v-if="!finalImg">
      <h1>Canvas练习</h1>
      <h2>html2canvas</h2>
      <img class="bgimg" :src="imgSrc + '?' + new Date().getTime()" alt="background">
    </div>
    <img class="finalImg" :src="finalImg" v-else>
  </div>
  <div class="bottom">
    <el-button class="screenshotBtn button" type="text" @click="save">
      保存图片
    </el-button>
  </div>
</template>

<script setup lang="ts">
import html2canvas from "html2canvas";
import { ref, nextTick, onMounted } from "vue";
const imgSrc = "https://nft-prod-d5b5f1b.oss-cn-hangzhou.aliyuncs.com/activity/anniversary/anniversary_fail.png"
const pageWrapper = ref<any>(null)
const finalImg = ref<string>()
onMounted(() => {
  nextTick(() => {
    prtSrc()
  })
})
const save = () => {
  if (finalImg.value) {
    const aTag = document.createElement("a");
    aTag.href = finalImg.value;
    aTag.setAttribute("download", "true");
    aTag.click();
  } else
    console.log('证书生成失败')
}
const prtSrc = () => {
  console.log(pageWrapper.value)
  html2canvas(pageWrapper.value, {
    logging: false,
    allowTaint: true,
    // scale: window.devicePixelRatio,
    scale: 3,
    // width: shareContent.clientWidth, //dom 原始宽度
    // height: shareContent.clientHeight,
    scrollY: 0,
    scrollX: 0,
    useCORS: true,
    backgroundColor: "#ffffff",
  }).then((canvas) => {
    // console.log(canvas);
    let imgUrl = canvas.toDataURL("image/png");
    finalImg.value = imgUrl
  })
}
</script>

<style scoped lang="less">
.content {
  position: relative;
  height: 90vh;
  width: 100vw;
  overflow: hidden;
}

.finalImg {
  position: absolute;
  top: 0;
  left: 0;
  height: 90vh;
  width: 100vw;
}

.bottom {
  height: 10vh;
  width: 100vw;
  background-color: antiquewhite;
}

.dom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  h1,
  h2 {
    font-weight: bold;
    color: greenyellow;
  }

  .bgimg {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 90vh;
  }
}
</style>
