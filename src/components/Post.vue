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
  <el-row>
    <el-col :span="4"/>
    <el-col :span="16">
      <view ref="el"/>
    </el-col>
    <el-col :span="4"/>
  </el-row>
</template>

<style scoped>
</style>
