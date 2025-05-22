<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import VideoPlayer from './components/video.vue'
import { topBar } from './utils/video'

const videoPlayerRef = ref(null)
const showCenter = ref(false)
const barIndex = ref(0)
const videoList = computed(() => {
  return topBar[barIndex.value].list
})

const changeBar = (index: number) => {
  barIndex.value = index
}

const jHandleJumpPlay = (number: number) => {
  videoPlayerRef.value?.jumpPlay(number)
}

const videoListIndex = ref(0)
const videoObg = computed(() => {
  return videoList.value[videoListIndex.value]
})
const changeItemVideo = (item: number) => {
  console.log('dfsssssssss',item)
  videoListIndex.value = item
}


</script>

<template>
  <div class="page">
    <div class="top-label">
      <div class="label" @click="changeBar(index)" v-for="(item, index) in topBar" :key="item.id + index">{{ item.title }}
      </div>
    </div>
    <div class="video-box">
      <VideoPlayer :key="videoObg.id" ref="videoPlayerRef" :src="videoObg.video" :id="'videoPlayer'+videoObg.id" :poster="videoObg.img" />
      <div class="desc">{{videoObg.desc}}</div>
      <div class="play-btn-box">
        <div class="play-btn" @click="jHandleJumpPlay(10)"> 00:10</div>
        <div class="play-btn" @click="jHandleJumpPlay(20)"> 00:20</div>
        <div class="play-btn" @click="jHandleJumpPlay(50)"> 00:50</div>
        <div class="play-btn" @click="jHandleJumpPlay(70)"> 01:10</div>
      </div>

      <div class="save-btn-box">
        <van-button @click="showCenter = true" class="save-btn" round type="success">保存到桌面 观看更多视频</van-button>
      </div>
    </div>
    <div class="video-box">
      <div class="tite">精彩推荐</div>
      <div class="video-list">
        <div v-for="(item, index) in videoList" class="video-item" @click="changeItemVideo(index)">
          <div class="img-box">
            <img class="video-item-img" :src="item.img" alt="">
            <img class="video-item-play" src="./assets/video/play.png" alt="">
          </div>
          <div class="video-desc-box">
            <div class="video-desc">
              {{ item.desc }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-detail">
      <div class="save-card">
        <div class="card-left">
          <img class="left-img" src="./assets/video/card.png" alt="">
          <div class="card-desc">
            <div class="card-title">产品名称</div>
            <div class="card-tip">产品宣传标语/口号</div>
          </div>
        </div>

        <van-button  @click="showCenter = true" class="card-btn" round type="success">保存到桌面</van-button>
      </div>
      <div class="btm-dec">建议使用Chrome/Alook/edge/夸克/uc等浏览器</div>
    </div>
  </div>
  <van-popup class="popup" v-model:show="showCenter" round>
    <div class="popup-title">温馨提示</div>
    <div class="popup-desc">
      <div>永久地址 abcd.com</div>
      <div>APP保存到桌面 快捷入口</div>
    </div>
    <div class="popup-btn-box">
      <van-button @click="showCenter = false" class="btm-btn left-btn" round type="success">保存桌面</van-button>
      <van-button @click="showCenter = false" class="btm-btn right-btn" round type="success">立即下载</van-button>
    </div>
  </van-popup>
</template>
<!-- https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8 -->
<style scoped>
.popup {
  width: 300px;
  height: 220px;
  color: #000;
  /* display: flex; */
  text-align: center;

}

.page {
  width: 100%;
  /* padding: 0 16px; */
  background-color: #181818;
  padding-bottom: 140px;
}

.top-label {
  margin-top: 20px;
  padding: 0 16px;
  /* display: flex; */
  /* justify-content: space-between; */
  /* flex-wrap:wrap; */
  /* gap: 0px; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.label {
  width: 82px;
  height: 33px;
  background-color: #262626;
  text-align: center;
  line-height: 33px;
  margin-bottom: 5px;
  font-size: 12px;
}


.video-box {
  width: 343px;
  /* padding: 0 16px; */
  /* height: 193px; */
  margin: 0 16px;
  margin-top: 10px;
}

.desc {
  margin-top: 20px;
  padding-bottom: 10px;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-bottom: 1px solid #323232;
}

.play-btn-box {
  display: flex;
  gap: 6px;
  font-size: 12px;
  margin-top: 12px;
}

.play-btn {
  width: 62px;
  height: 31px;
  border-radius: 30px;
  background-color: #00D2BE;
  color: #000;
  text-align: center;
  line-height: 31px;
}

.save-btn-box {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
}

.save-btn {
  width: 282px;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
  background-color: #00D2BE;
  color: #000;
}

.tite {
  font-size: 22px;
}

.video-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.video-item {
  width: 168px;
  height: 145px;
  margin-bottom: 6px;
  border-radius: 4px;
  overflow: hidden;
}

.img-box {
  position: relative;
  width: 100%;
  height: 95px;
}

.video-item-play {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.video-item-img {
  width: 100%;
  height: 95px;
}

.video-desc-box {
  height: 55px;
  background-color: #1f1f1f;
  /* background-color: red; */
  padding: 10px;
}

.video-desc {
  font-size: 12px;
  color: #cccccc;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  line-break: anywhere;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
}

.bottom-detail {
  width: 375px;
  height: 135px;
  position: fixed;
  bottom: 0;
  background-color: #252525;
}

.save-card {
  width: 343px;
  height: 70px;
  background-color: #fff;
  border-radius: 6px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000;
  margin-top: 20px;
}

.card-left {
  display: flex;
  align-items: center;
}

.left-img {
  width: 50px;
  height: 50px;
  margin: 10px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
}

.card-tip {
  font-size: 14px;
  font-weight: 600;
  margin-top: 4px;
}

.card-btn {
  width: 102px;
  height: 30px;
  font-size: 14px;
  font-weight: 500;
  background-color: #00D2BE;
  margin-right: 10px;
  /* color: #000; */
}

.btm-dec {
  font-size: 12px;
  text-align: center;
  margin-top: 12px;
}

.popup-title {
  height: 60px;
  font-size: 26px;
  line-height: 60px;
  border-bottom: 1px solid #1b1b1b;
}

.popup-desc {
  font-size: 20px;
  line-height: 30px;
  margin-top: 10px;
}

.popup-btn-box {
  display: flex;
  justify-content: space-around;
  padding: 20px 30px;
}

.btm-btn {
  width: 110px;
  height: 40px;
  background-color: #00D2BE;
  color: #000;
}

.left-btn {
  background-color: #cccccc;
  border: 1px solid #cccccc;
  color: #696969;
}
</style>
