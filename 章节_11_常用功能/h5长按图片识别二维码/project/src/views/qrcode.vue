<template>
  <div class="image-preview">
    <img class="img" ref="image" src="../../static/222.png" />
  </div>
</template>

<script>
// 练手项目，未改eslint
/* eslint-disable */
import jsQR from 'jsqr'
export default {
  name: "qrcode",
  data() {
    return {
      url: "",
    };
  },
  mounted(){
    const image = this.$refs.image
    console.log(image,image.width)
    const canvas = document.createElement('canvas')
    // 要保证宽高可以完全包裹住图片的宽高（踩过坑）
    canvas.width = 300
    canvas.height = 300
    const ctx = canvas.getContext('2d')
    // 将图片画到 canvas 上
    ctx.drawImage(image, 0, 0, image.width, image.height)

    // 从 canvas 中提取像素数据
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    console.log(canvas.width, canvas.height)
    // 将像素数据作为输入，使用 jsQR 库进行解码
    const code = jsQR(imageData.data, imageData.width, imageData.height)
    // code 就是解码后的数据
    console.log('解码结果：', code)
  },
  methods: {
  },
};
</script>

<style>
.img{
    width: 300px;
    height: 100%;
}
</style>
