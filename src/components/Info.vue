<script lang="ts" setup>
import {useRouter} from "vue-router";
import {ElButton} from 'element-plus'
import 'element-plus/dist/index.css'

const router = useRouter();

const toPost = () => {
  router.push("/post")
}
</script>

<template>
  <div class="min-h-screen bg-[#D8D8D8] text-black p-4 sm:p-8">
    <div class="max-w-[1400px] mx-auto">
      <!-- Main Title -->
      <h1 class="text-[12vw] font-clash-display tracking-tight leading-[0.5] mb-20">
        <span class="block">Hidden</span>
        <span class="block">Tensions</span>
        <span class="block">Transparent</span>
        <span class="block">Prejudice</span>
      </h1>

      <div class="grid grid-cols-12 gap-4 mb-24">
        <!-- Left Column -->
        <div class="col-span-4">
          <div class="space-y-6">
            <div class="space-y-1">
              <p class="text-sm">Digital identity today</p>
              <p class="text-sm">What does it mean</p>
              <p class="text-sm">Eight participants explore</p>
              <p class="text-sm">Here, they share</p>
            </div>

            <div class="space-y-1">
              <p class="text-sm">Digital space for all</p>
              <p class="text-sm">With this installation,</p>
              <p class="text-sm">We claim back space</p>
              <p class="text-sm">And all that it means.</p>
            </div>
          </div>

          <div class="mt-12">
            <p class="text-sm">Workshop curator</p>
            <p class="text-sm">The H.T.T.P Workshop is a safe space of expression for participants to explore how IP
              geolocation influences online interactions and shapes our digital prejudices.</p>
          </div>

          <el-button
              class="mt-8 rounded-full border border-black bg-transparent text-black hover:bg-black hover:text-white px-8 py-2"
              @click="toPost"
          >
            Enter Workshop
          </el-button>
        </div>

        <!-- Right Column -->
        <div class="col-span-8 flex justify-end">
          <div class="space-y-2">
            <p class="text-sm mb-4">Presenting sessions by:</p>
            <h2 class="text-4xl font-bold">IP Identity</h2>
            <h2 class="text-4xl font-bold">Digital Borders</h2>
            <h2 class="text-4xl font-bold">Online Prejudice</h2>
            <h2 class="text-4xl font-bold">Community Dialog</h2>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="grid grid-cols-2 gap-4">
        <h2 class="text-[8vw] font-bold">Part I</h2>
        <div class="flex justify-end">
          <p class="text-[8vw] font-bold">11.30.24—</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="fixed bottom-4 right-4">
        <p class="text-xs">Made with care</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
</style>
