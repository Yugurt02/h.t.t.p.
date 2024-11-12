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
  <view ref="el"/>
</template>

<style scoped>
</style>
