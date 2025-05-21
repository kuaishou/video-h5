<script setup lang="ts">
import { ref, onMounted } from 'vue'
interface Props {
    src: string // 视频文件地址，支持网络地址 https 和相对地址
    poster?: string // 视频封面地址，支持网络地址 https 和相对地址
    second?: number // 在未设置封面时，自动截取视频第 second 秒对应帧作为视频封面
    width?: number // 视频播放器宽度，单位px
    height?: number // 视频播放器高度，单位px
    autoplay?: boolean // 视频就绪后是否马上播放，优先级高于preload
    controls?: boolean // 是否向用户显示控件，比如进度条，全屏等
    loop?: boolean // 视频播放完成后，是否循环播放
    muted?: boolean // 是否静音
    preload?: 'auto' | 'metadata' | 'none' // 是否在页面加载后载入视频，如果设置了autoplay属性，则preload将被忽略
    showPlay?: boolean // 播放暂停时是否显示播放器中间的暂停图标
    fit?: 'none' | 'fill' | 'contain' | 'cover' // video的poster默认图片和视频内容缩放规则
}
const props = withDefaults(defineProps<Props>(), {
    src: '',
    poster: '',
    second: 0.5,
    width: 800,
    height: 450,
    autoplay: false,
    controls: true,
    loop: false,
    muted: false,
    preload: 'auto',
    showPlay: true,
    fit: 'contain'
})
// 参考文档：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video
const veoPoster = ref(props.poster)
const originPlay = ref(true)
const hidden = ref(false) // 是否隐藏播放器中间的播放按钮
// 为模板引用标注类型
const veo = ref()
// const veo = ref<HTMLVideoElement | null>(null) // 声明一个同名的模板引用

/*
  loadeddata 事件在媒体当前播放位置的视频帧（通常是第一帧）加载完成后触发
  preload为none时不会触发
*/
function getPoster() { // 在未设置封面时，自动截取视频0.5s对应帧作为视频封面
    // 由于不少视频第一帧为黑屏，故设置视频开始播放时间为0.5s，即取该时刻帧作为封面图
    veo.value.currentTime = props.second
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = veo.value.videoWidth
    canvas.height = veo.value.videoHeight
    ctx?.drawImage(veo.value, 0, 0, canvas.width, canvas.height)
    veoPoster.value = canvas.toDataURL('image/png')
}
function onPlay() {
    if (originPlay.value) {
        veo.value.currentTime = 0
        originPlay.value = false
    }
    if (props.autoplay) {
        veo.value?.pause()
    } else {
        hidden.value = true
        veo.value?.play()
    }
}
function onPause() {
    hidden.value = false
}
function onPlaying() {
    hidden.value = true
}
onMounted(() => {
    if (props.autoplay) {
        hidden.value = true
        originPlay.value = false
    }
    /*
      自定义设置播放速度，经测试：
      在vue2中需设置：this.$refs.veo.playbackRate = 2
      在vue3中需设置：veo.value.defaultPlaybackRate = 2
    */
    // veo.value.defaultPlaybackRate = 2
})
</script>
<template>
    <div class="m-video" :class="{ 'u-video-hover': !hidden }" :style="`width: ${width}px; height: ${height}px;`">
        <video ref="veo" :style="`object-fit: ${fit};`" :src="src" :poster="veoPoster" :width="width" :height="height"
            :autoplay="autoplay" :controls="!originPlay && controls" :loop="loop" :muted="autoplay || muted"
            :preload="preload" crossorigin="anonymous" @loadeddata="poster ? () => false : getPoster()"
            @pause="showPlay ? onPause() : () => false" @playing="showPlay ? onPlaying() : () => false"
            @click.prevent.once="onPlay" v-bind="$attrs">
            您的浏览器不支持video标签。
        </video>
        <span v-show="originPlay || showPlay" class="m-icon-play" :class="{ 'hidden': hidden }">
            <svg class="u-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34">
                <path d="M28.26,11.961L11.035,0.813C7.464-1.498,3,1.391,3,6.013v21.974c0,4.622,4.464,7.511,8.035,5.2L28.26,22.039
          C31.913,19.675,31.913,14.325,28.26,11.961z"></path>
            </svg>
        </span>
    </div>
</template>
<style lang="less" scoped>
.m-video {
    display: inline-block;
    position: relative;
    background: #000;
    cursor: pointer;

    .m-icon-play {
        display: inline-block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgba(0, 0, 0, .7);
        pointer-events: none;
        opacity: 0.8;
        transition: opacity .3s;

        .u-svg {
            display: inline-block;
            fill: #FFF;
            width: 29px;
            height: 34px;
            margin-top: 23px;
            margin-left: 27px;
        }
    }

    .hidden {
        opacity: 0;
    }
}

.u-video-hover {
    &:hover {
        .m-icon-play {
            opacity: 1;
        }
    }
}
</style>