import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vant/lib/index.css'
import {Button,Popup } from 'vant'
import './utils/rem.ts'; //在main.js中引入rem.js





const app=createApp(App)

app.use(Button)
app.use(Popup)
app.mount('#app')
