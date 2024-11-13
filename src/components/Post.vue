<script lang="ts" setup>
import Artalk from 'artalk'
import {onMounted, onBeforeUnmount, ref} from 'vue'

import 'artalk/Artalk.css'

const el = ref<HTMLElement>()

let artalk: Artalk

onMounted(() => {
  artalk = Artalk.init({
    el: el.value,
    pageKey: location.pathname,
    pageTitle: `${document.title}`,
    server: 'http://localhost:23366',
    site: 'h.t.t.p.',
    // ...
  })
})

onBeforeUnmount(() => {
  artalk.destroy()
})
</script>

<template>
  <div class="min-h-screen  text-black p-4 sm:p-8">
    <div class="max-w-[1400px] mx-auto">
      <h1 class="text-[10vw] font-bold tracking-tight leading-[0.7] mb-20">
        <span class="block">Part1: </span>
        <span class="block">Introduction </span>
      </h1>
    </div>




  </div>

  <el-row>
    <el-col :span="2">

    </el-col>
    <el-col :span="20">

      <view ref="el"/>
    </el-col>
    <el-col :span="2"/>
  </el-row>

</template>

<style scoped>
</style>
