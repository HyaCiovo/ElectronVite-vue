<template>
  <div id="seePerson">
    <div v-show="data.showContainer" class="face-capture" id="face-capture">
      <p class="tip">请保持人像在取景框内</p>
      <video id="video" :width="data.vwidth" :height="data.vheight" playsinline webkit-playsinline></video>
      <canvas id="refCanvas" :width="data.cwidth" :height="data.cheight"></canvas>
      <!-- <img class="img-cover" :src="getImageUrl('yuan')" alt="" /> -->
      <div class="yuan"></div>
      <p class="contentp">{{ data.scanTip }}</p>
    </div>
    <div v-if="!data.showContainer" class="img-face">
      <img class="imgurl" :src="data.imgUrl" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import axios from "@/utils/request";
import { nanoid } from "nanoid";
import "@/assets/js/tracking-min.js";
import "@/assets/js/face-min.js";
interface reactiveType {
  screenSize: {
    width: any,
    height: any,
  },
  URL: any,
  streamIns: any, // 视频流
  showContainer: boolean, // 显示
  tracker: any,
  tipFlag: boolean, // 提示用户已经检测到
  flag: boolean, // 判断是否已经拍照
  context: any, // canvas上下文
  profile: any[], // 轮廓
  removePhotoID: any, // 停止转换图片
  scanTip: string, // 提示文字
  imgUrl: string,
  canvas: any,
  trackertask: any,
  vwidth: string,
  vheight: string,
  cwidth: string,
  cheight: string,
  userInfo: any,
  orderData: any,
}
const data = reactive<reactiveType>({
  screenSize: {
    width: window.screen.width,
    height: window.screen.height,
  },
  URL: null,
  streamIns: null, // 视频流
  showContainer: true, // 显示
  tracker: null,
  tipFlag: false, // 提示用户已经检测到
  flag: false, // 判断是否已经拍照
  context: null, // canvas上下文
  profile: [], // 轮廓
  removePhotoID: null, // 停止转换图片
  scanTip: "人脸识别中...", // 提示文字
  imgUrl: "",
  canvas: null,
  trackertask: null,
  vwidth: "266",
  vheight: "266",
  cwidth: "266",
  cheight: "266",
  userInfo: {},
  orderData: {},
});
const accessToken = ref<number>()

const fetchToken = async () => {
  const params = {
    client_id: 'zSj9cXM0sPv9EFmvV4H9EAhs',
    client_secret: '4xTlW81w537v21mRbuiLRSN0HKhgQbjH',
    grant_type: 'client_credentials'
  }
  const res: any = await axios.get<any>("/baiduapi/oauth/2.0/token", params);
  accessToken.value = res.access_token
}

const addFace = async () => {
  const params = {
    image: data.imgUrl.substring(22),
    image_type: 'BASE64',
    group_id: 'zhujiruo' + nanoid(),
    user_id: nanoid(),
    quality_control: 'NORMAL'
  }
  const res = await axios.post<any>(
    `/baiduapi/rest/2.0/face/v3/faceset/user/add?accessToken=${accessToken.value}`,
    params)
  console.log(res)
}
//设置video canvas宽高
const setVideoConfig = () => {
  const scale = data.screenSize.width / 375;
  (data.vwidth as any) = 266 * scale;
  (data.vheight as any) = 266 * scale;
  (data.cwidth as any) = 266 * scale;
  (data.cheight as any) = 266 * scale;
  playVideo();
};

const getUserMedia = (constrains: any) => {
  if (navigator.mediaDevices.getUserMedia) {
    //最新标准API
    navigator.mediaDevices
      .getUserMedia(constrains)
      .then((res) => {
        handleSuccess(res);
      })
      .catch((err) => {
        handleError(err);
      });
  } else if ((navigator as any).webkitGetUserMedia) {
    //webkit内核浏览器
    (navigator as any)
      .webkitGetUserMedia(constrains)
      .then((res: any) => {
        handleSuccess(res);
      })
      .catch((err: any) => {
        handleError(err);
      });
  } else if ((navigator as any).mozGetUserMedia) {
    //Firefox浏览器
    (navigator as any)
      .mozGetUserMedia(constrains)
      .then((res: any) => {
        handleSuccess(res);
      })
      .catch((err: any) => {
        handleError(err);
      });
  } else if ((navigator as any).getUserMedia) {
    //旧版API
    (navigator as any)
      .getUserMedia(constrains)
      .then((res: any) => {
        handleSuccess(res);
      })
      .catch((err: any) => {
        handleError(err);
      });
  } else {
    data.scanTip = "你的浏览器不支持访问用户媒体设备";
  }
};
const close = () => {
  data.flag = false;
  data.tipFlag = false;
  data.showContainer = false;
  data.context = null;
  data.scanTip = "人脸识别中...";
  clearTimeout(data.removePhotoID);
  if (data.streamIns) {
    data.streamIns.enabled = false;
    data.streamIns.getTracks()[0].stop();
    data.streamIns.getVideoTracks()[0].stop();
  }
  data.streamIns = null;
  data.trackertask.stop();
  data.tracker = null;
};

// 拍照
const takePhoto = () => {
  // 在画布上面绘制拍到的照片
  data.context.drawImage(
    document.getElementById("video"),
    0,
    0,
    data.vwidth,
    data.vwidth
  );
  // 保存为base64格式
  data.imgUrl = saveAsPNG(document.getElementById("refCanvas"));
  console.log("data.imgUrl", data.imgUrl);

  //判断图片大小
  imgSize();
  // todo 这里可以调用后端接口将图片上传比对，然后调用close结束进程
  addFace();
  close();
};
const imgSize = () => {
  if (data.imgUrl) {
    // 获取base64图片byte大小
    const equalIndex = data.imgUrl.indexOf("="); // 获取=号下标
    let size;
    if (equalIndex > 0) {
      const str = data.imgUrl.substring(0, equalIndex); // 去除=号
      const strLength = str.length;
      const fileLength = strLength - (strLength / 8) * 2; // 真实的图片byte大小
      size = Math.floor(fileLength / 1024); // 向下取整
      console.log("size", size + "KB");
    } else {
      const strLength = data.imgUrl.length;
      const fileLength = strLength - (strLength / 8) * 2;
      size = Math.floor(fileLength / 1024); // 向下取整
      console.log("size", size + "KB");
    }
    if (size > 1024) {
      // 图片超过1M 按比例压缩
      data.imgUrl = (document as any)
        .getElementById("refCanvas")
        .toDataURL("image/png", 1024 / size);
    }
  }
};
// Base64转文件
// const getBlobBydataURI = (dataURI: any, type: any) => {
//   const binary = window.atob(dataURI.split(",")[1]);
//   const array = [];
//   for (let i = 0; i < binary.length; i++) {
//     array.push(binary.charCodeAt(i));
//   }
//   return new Blob([new Uint8Array(array)], {
//     type: type,
//   });
// };

// 保存为png,base64格式图片
const saveAsPNG = (c: any) => {
  return c.toDataURL("image/png", 0.8);
};

// 人脸捕捉 设置各种参数 实例化人脸捕捉实例对象,注意canvas上面的动画效果。
const initTracker = () => {
  data.context = (document.getElementById("refCanvas") as any)?.getContext("2d"); // 画布
  data.canvas = document.getElementById("refCanvas");
  data.tracker = new (window as any).tracking.ObjectTracker("face"); // tracker实例
  data.tracker.setInitialScale(4);
  data.tracker.setStepSize(2); // 设置步长
  data.tracker.setEdgesDensity(0.1);
  try {
    data.trackertask = (window as any).tracking.track("#video", data.tracker); // 开始追踪
  } catch (e) {
    data.scanTip = "访问用户媒体失败，请重试";
  }
  //开始捕捉方法 一直不停的检测人脸直到检测到人脸
  data.tracker.on("track", (e: any) => {
    //画布描绘之前清空画布
    data.context.clearRect(0, 0, data.canvas?.width, data.canvas?.height);
    if (e.data.length === 0) {
      if (!data.flag)
        data.scanTip = "未检测到人脸";
    } else {
      e.data.forEach((rect: any) => {
        //设置canvas 方框的颜色大小
        data.context.strokeStyle = "#42e365";
        data.context.lineWidth = 2;
        data.context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      });
      if (!data.tipFlag) {
        data.scanTip = "检测成功，正在拍照，请保持不动";
      }
      // 1.5秒后拍照，仅拍一次 给用户一个准备时间
      // falg 限制一直捕捉人脸，只要拍照之后就停止检测
      if (!data.flag) {
        data.scanTip = "拍照中...";
        data.flag = true;
        data.removePhotoID = setTimeout(() => {
          takePhoto();
          (document as any).getElementById("video").pause();
          data.tipFlag = true;
        }, 1500);
      }
    }
  });
};
// 成功回调
const handleSuccess = (stream: any) => {
  data.streamIns = stream;
  const video: any = document.getElementById("video");
  // webkit内核浏览器
  data.URL = <any>window.URL || window.webkitURL;
  if ("srcObject" in video)
    video.srcObject = stream;

  else
    video.src = data.URL.createObjectURL(stream);

  // 苹果手机的系统弹框会阻止js的线程的继续执行 手动0.1秒之后自动执行代码
  setTimeout(() => {
    video.play()
    initTracker() // 人脸捕捉
  }, 100)
};
// 失败回调
const handleError = (err: any) => {
  data.scanTip = "访问用户媒体失败";
};
const playVideo = () => {
  getUserMedia({
    //摄像头拍摄的区域
    video: {
      width: 500,
      height: 500,
      facingMode: "user",
    } /* 前置优先 */,
  });
};
onMounted(() => {
  fetchToken();
  setVideoConfig();
});

</script>

<style scoped lang="less">
#seePerson {
  height: 100%;

  .face-capture {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .img-cover {
      position: fixed;
      top: 63px;
      width: 375px;
      height: 375px;
      object-fit: cover;
      z-index: 3;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

    .yuan {
      position: fixed;
      //   top: 63px;
      top: 100px;
      width: 275px;
      height: 275px;
      object-fit: cover;
      z-index: 3;
      //   background-repeat: no-repeat;
      //   background-size: 100% 100%;
      border: 1px solid #ccc;
      border-radius: 50%;
    }

    .contentp {
      position: fixed;
      top: 398px;
      font-size: 18px;
      font-weight: 500;
      color: #333333;
    }

    .rect {
      border: 2px solid #0aeb08;
      position: fixed;
      z-index: 4;
    }

    video,
    canvas {
      position: fixed;
      top: 101px;
      width: 275px;
      height: 275px;
      object-fit: cover;
      z-index: 1;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      border-radius: 50%;
    }
  }

  .tip {
    position: fixed;
    top: 48px;
    z-index: 5;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 25px;
  }

  .img-face {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .imgurl {
      position: fixed;
      top: 117.5px;
      width: 266px;
      height: 266px;
      border-radius: 133px;
    }
  }
}
</style>
