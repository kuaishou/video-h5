import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vant/lib/index.css'
import {Button} from 'vant'
import './utils/rem.ts'; //在main.js中引入rem.js

import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
// import 'video.js/dist/video-js.css'



const app=createApp(App)

app.use(Button)
app.use(VueVideoPlayer)
app.mount('#app')
