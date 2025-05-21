<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
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

  </div>

</template>

<style scoped>
.page{
  width: 100%;
  /* padding: 0 16px; */
  background-color: #181818;
}
.top-label{
  margin-top: 20px;
padding: 0 16px;
  /* display: flex; */
  /* justify-content: space-between; */
  /* flex-wrap:wrap; */
  /* gap: 0px; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.label{
  width: 82px;
  height: 33px;
  background-color: #262626;
  text-align: center;
  line-height: 33px;
  margin-bottom: 5px;
  font-size: 12px;
}

</style>
