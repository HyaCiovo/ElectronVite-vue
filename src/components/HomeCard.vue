<script lang="ts" setup>
const list = [
  {
    img: "https://www.hzide.com/images/home/api.svg",
    colorimg: "https://www.hzide.com/images/home/api-colorful.svg",
    title: "API接口",
    description:
      "标准化数据API服务，通过数据清洗、脱敏和格式转换等处理，为社会机构提供一致性对比、分析报告和数据补全等服务",
  },
  {
    img: "https://www.hzide.com/images/home/data-auth.svg",
    colorimg: "https://www.hzide.com/images/home/data-auth-colorful.svg",
    title: "数据使用权",
    description:
      "为政府和社会机构提供部分加密数据计算权，使用方通过隐私计算进行模型训练，获取计算结果，数据源可用不可见",
  },
  {
    img: "https://www.hzide.com/images/home/data-model.svg",
    colorimg: "https://www.hzide.com/images/home/data-model-colorful.svg",
    title: "数据模型",
    description:
      "通过机器学习、深度学习等人工智能技术训练建模，为社会机构提供算法模型，为金融风控、智慧城市和医疗健康等领域提供解决方案",
  },
  {
    img: "https://www.hzide.com/images/home/truth-service.svg",
    colorimg: "https://www.hzide.com/images/home/truth-service-colorful.svg",
    title: "可信计算服务",
    description:
      "应用可信计算、联邦学习和多方安全计算等技术，为政府部门、金融和医疗机构提供联合建模、联合预测、分析决策等服务",
  },
];
</script>

<template>
  <div class="home-card">
    <div v-for="(item, index) in list" :key="index" class="card-item">
      <div class="normal">
        <img :src="item.colorimg" class="colorimg" />
        <div class="msg">
          <p class="title">{{ item.title }}</p>
          <p class="desc nowrap text-label">{{ item.description }}</p>
        </div>
      </div>
      <div class="more">
        <div style="margin: 20px 18px">
          <img :src="item.img" class="colorimg" />
          <div class="msg">
            <p class="title">{{ item.title }}</p>
            <p class="desc">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-card {
  position: relative;
  padding: auto;
  align-items: center;
  background-image: linear-gradient(180deg, #fff, #fff);
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 5%);
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  width: 100%;
  height: 120px;

  .card-item {
    cursor: pointer;
    width: 270px;

    &:hover {
      .more {
        height: 220px;
      }

      .normal {
        height: 0;
      }
    }

    .normal {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;

      .msg {
        margin-left: 15px;
        width: 200px;

        .title {
          font-weight: 500;
          font-size: 18px;
          line-height: 22px;
        }

        .desc {
          font-size: 14px;
          margin-top: 5px;
        }
      }
    }

    .more {
      position: relative;
      color: #fff;
      height: 0;
      transform: translateY(calc(60px - 50%));
      overflow: hidden;
      background-image: linear-gradient(225deg, #0e77f8, #0f58e3);
      box-shadow: 0 0 8px 0 rgb(0 0 0 / 20%);
      border-radius: 6px 6px 0 0;
      z-index: 15;

      .title {
        margin-top: 15px;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
      }

      .desc {
        margin-top: 5px;
        font-size: 14px;
        margin-top: 5px;
        color: hsla(0, 0%, 100%, 0.8);
      }
    }
  }

  .colorimg {
    width: 40px;
    height: 40px;
  }
}
</style>
