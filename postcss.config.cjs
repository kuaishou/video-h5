module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 37.5, // 表示根元素字体大小或根据input参数返回根元素字体大小
            propList: ['*'], // 可以从px更改为rem的属性, 通配符*表示启用所有属性
            selectorBlackList: ['.norem'], // 过滤掉.norem开头的class，不进行rem转换
            // 若想设置部分样式不转化 可以在配置项中写出
            // eg: 除 border和font-size外 所有px均转化为rem
            // propList: ["*", "!border","!font-size"], 
            "exclude": /node_modules/i, // 这里表示不处理node_modules文件下的css
            "selectorBlackList": ["ignore-"], // 忽略的选择器前缀
            "mediaQuery": false, // 是否在媒体查询中也转换 px
            "minPixelValue": 1, // 最小的 px 值才转换为 rem
            "replace": true, // 是否更换属性值，而不是添加一个rem的新属性
            "unitPrecision": 5 // 单位转换后的精度
        }
    }
}