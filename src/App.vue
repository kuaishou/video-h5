<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

import Video from './components/video.vue'
const url = 'https://stream7.iqilu.com/10339/article/202002/18/02319a81c80afed90d9a2b9dc47f85b9.mp4'


const playerOptions = computed(() => {
  const playerOptionsObj = {
    //  playbackRates: [0.5, 1.0, 1.5, 2.0], //可选择的播放速度
    //     autoplay: false, //如果true,浏览器准备好时开始回放。
    //     muted: false, // 默认情况下将会消除任何音频。
    //     loop: false, // 视频一结束就重新开始。
    //     preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
    //     language: "zh-CN",
    //     aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
    //     fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
    //     sources: [
    //       {
    //         type: "",
    //         src: "https://stream7.iqilu.com/10339/article/202002/18/02319a81c80afed90d9a2b9dc47f85b9.mp4", //url地址
    //       },
    //     ],
    //     poster: "", //你的封面地址
    //     // width: document.documentElement.clientWidth,
    //     notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
    //     controlBar: {
    //       timeDivider: true, //当前时间和持续时间的分隔符
    //       durationDisplay: true, //显示持续时间
    //       remainingTimeDisplay: false, //是否显示剩余时间功能
    //       fullscreenToggle: true, //全屏按钮
    //     },
    //       // playbackRates: [0.7, 1.0, 1.5, 2.0], //视频播放速度
    autoplay: false, // 如果true，浏览器准备好时开始回放。
    muted: false, // 默认情况下将会消除任何音频。
    loop: false, // 导致视频一结束就重新开始。
    // preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）。
    language: 'zh-CN',
    // aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）。
    fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
    sources: [{
      type: '',	// 资源格式写法：'video/mp4'，否则控制台会出现notSupportedMessage设置的错误。
      src: url // 视频url地址
    }],
    // poster: this.mp4Pic, // 视频封面地址
    // width: document.documentElement.clientWidth,
    width: 300,
    // height: this.fileAreaHeight,	// 设置高度，fluid需要设置成flase
    notSupportedMessage: '此视频暂无法播放...', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
    controlBar: {
      timeDivider: true, // 当前时间和持续时间的分隔符
      durationDisplay: true,  // 显示持续时间
      remainingTimeDisplay: false,  // 是否显示剩余时间功能
      fullscreenToggle: true  //全屏按钮
    }
  }
  return playerOptionsObj

})
</script>

<template>
  <div class="page">
    <div class="top-label">
      <div class="label">标题标题</div>
      <div class="label">标题标题</div>
      <div class="label">标题标题</div>
      <div class="label">标题标题</div>
      <div class="label">标题标题</div>
      <div class="label">标题标题</div>
      <div class="label">标题标题</div>
      <div class="label">标题标题</div>
      <div class="label">标题标题</div>
      <div class="label">标题标题</div>
      <div class="label">标题标题</div>
      <div class="label">标题标题</div>

    </div>
    <div class="input_video">
      <video-player class="video-player vjs-custom-skin" ref="videoPlayer" src="./assets/video/video1.mp4"
        poster="./assets/video/video.png" controls :loop="true" :volume="0.6"></video-player>

    </div>
    <video src="./assets/video/video1.mp4"></video>

      <h2 class="mb10">Video 播放器基本使用</h2>
    <Video :src="src" :poster="poster" />
    <h2 class="mt30 mb10">自动播放</h2>
    <Video autoplay :src="src" :poster="poster" />
    <h2 class="mt30 mb10">自动截取视频指定帧作为视频封面</h2>
    <Video :src="src" :second="3" />
  </div>

</template>

<style scoped>
.page {
  width: 100%;
  /* padding: 0 16px; */
  background-color: #181818;
}

.top-label {
  margin-top: 20px;

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


.input_video {
  width: 300px;
  /* padding: 0 16px; */
  height: 400px;
  margin: 0 16px;
}
</style>
