<template>
    <div v-bind="$attrs" class="videoPlayer">
        <video class="video-js" :id="id" style="width: 100%; height: 100%" :poster="poster">
            <source v-if="src" :src="src" />
        </video>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch, ref } from 'vue'
import 'video.js/dist/video-js.css'
import videojs from 'video.js'

const overrideNative = ref(false)
const props = defineProps({
    id: { type: String, default: 'vd' },
    src: { type: String, default: '' },
    poster: { type: String, default: '' }
})

const emit = defineEmits([
    'videoCanplaythrough',
    'videoPlay',
    'videoPlaying',
    'videoPause'
])

// VideoJs更多选项配置可以参考中文文档：
// https://gitcode.gitcode.host/docs-cn/video.js-docs-cn/docs/guides/options.html
function options() {
    return {
        html5: {
            hls: {
                overrideNative: overrideNative
            },
            nativeVideoTracks: !overrideNative,
            nativeAudioTracks: !overrideNative,
            nativeTextTracks: !overrideNative
        },
        autoplay: true, // true,浏览器准备好时开始播放。
        muted: false, // 默认情况下将会消除音频。
        loop: false, // 导致视频一结束就重新开始。
        controls: true,
        preload: 'auto', // auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        fluid: true, // 当true时，将按比例缩放以适应其容器。
        type: 'application/x-mpegURl',
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 无法播放媒体源时显示的默认信息。
        textTrackDisplay: false
    }
}

let player: any

//定义一个方法
const jumpPlay = (number:number) => {
    console.log('dddddddddd',number)
   player.play()
   player.currentTime(number)
}

onMounted(() => {
    try {
        player = videojs(props.id, options(), () => {
            videojs.log('播放器已经准备好了!')
            player.pause()
            player.on('canplaythrough', function (event: any) {
                emit('videoCanplaythrough', event.target.player.cache_?.duration)
            })
            player.on('play', function () {
                videojs.log('视频准备播放')
                emit('videoPlay')
            })
            player.on('playing', function () {
                videojs.log('视频已开始播放')
                emit('videoPlaying')
            })
            player.on('pause', function (event: any) {
                emit('videoPause', event.target.player.cache_?.currentTime)
            })
            player.ready(function () {
                videojs.log('视频跳转到某个时间播放')
                // 指定时间播放，例如跳转到第30秒
              
            });
        })
    } catch (error) {
        console.log('catch--->', error)
    }
})

// watch(props,()=>{
//         player = videojs(props.id, options(), () => {
//             videojs.log('播放器已经准备好了!')
//             player.pause()
//             player.on('canplaythrough', function (event: any) {
//                 emit('videoCanplaythrough', event.target.player.cache_?.duration)
//             })
//             player.on('play', function () {
//                 videojs.log('视频准备播放')
//                 emit('videoPlay')
//             })
//             player.on('playing', function () {
//                 videojs.log('视频已开始播放')
//                 emit('videoPlaying')
//             })
//             player.on('pause', function (event: any) {
//                 emit('videoPause', event.target.player.cache_?.currentTime)
//             })
//             player.ready(function () {
//                 videojs.log('视频跳转到某个时间播放')
//                 // 指定时间播放，例如跳转到第30秒
              
//             });
//         })
// })
onBeforeUnmount(() => {
    if (player) {
        player.dispose()
    }
})

//暴露state和play方法
defineExpose({
  jumpPlay,
})
</script>

<style scoped>
.videoPlayer {
    width: 100%;
    /* max-width: 640px; */
    height: 193px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
}

.video-js {
    padding-top: 0 !important;
}

:deep(.video-js .vjs-big-play-button) {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    border: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

}

:deep(.vjs-icon-placeholder:before) {

    /* font-size: 40px;
    margin-top: 6px; */
}
</style>
