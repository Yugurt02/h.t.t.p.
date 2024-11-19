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
  <div class="min-h-screen bg-[#F1F1F1] text-black p-4 sm:p-8">
    <div class="max-w-[1400px] mx-auto">
      <h1 class="text-[10vw] font-bold tracking-tight leading-[0.49] mb-10">
        <span class="block">Part1: </span>
        <span class="block">Introduction </span>
      </h1>

      <!-- Point System Section -->
      <div class="space-y-12 mb-24">
        <div class="space-y-6">
          <h2 class="text-2xl font-black">积分系统 | Point System</h2>

          <!-- Initial and Target Points -->
          <div class="space-y-1">
            <p class="text-lg font-bold">初始积分 | Starting Points: <span class="font-normal">20</span></p>
            <p class="text-lg font-bold">目标积分 | Target Points: <span class="font-normal">100</span></p>
          </div>

          <!-- Points Items -->
          <div class="space-y-8">
            <div class="space-y-2">
              <h3 class="text-xl font-black">基础互动 | Basic Interaction <span class="ml-2">+5</span></h3>
              <ul class="space-y-1 ml-4">
                <li>· 参与讨论 | Participate in discussions</li>
                <li>· 回应他人 | Respond to others</li>
              </ul>
            </div>

            <div class="space-y-2">
              <h3 class="text-xl font-black">观点表达 | Opinion Expression <span class="ml-2">+10</span></h3>
              <ul class="space-y-1 ml-4">
                <li>· 提出独特见解 | Present unique insights</li>
                <li>· 深度分析问题 | In-depth problem analysis</li>
              </ul>
            </div>

            <div class="space-y-2">
              <h3 class="text-xl font-black">偏见识别 | Bias Recognition <span class="ml-2">+15</span></h3>
              <ul class="space-y-1 ml-4">
                <li>· 发现隐藏偏见 | Discover hidden biases</li>
                <li>· 分析成因 | Analyze causes</li>
              </ul>
            </div>

            <div class="space-y-2">
              <h3 class="text-xl font-black">观点突破 | Breakthrough Insights <span class="ml-2">+20</span></h3>
              <ul class="space-y-1 ml-4">
                <li>· 打破固有认知 | Break through existing cognition</li>
                <li>· 提供新视角 | Provide new perspectives</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Basic Rules Section -->
        <div class="space-y-6">
          <h2 class="text-2xl font-black">基本规则 | Basic Rules</h2>

          <div class="space-y-8">
            <div class="space-y-2">
              <h3 class="text-xl font-black">1. 匿名原则 | Anonymity</h3>
              <ul class="space-y-1 ml-4">
                <li>· 全程使用分配的虚拟身份 | Use assigned virtual identity throughout</li>
                <li>· 禁止透露真实身份信息 | No disclosure of real identity information</li>
              </ul>
            </div>

            <div class="space-y-2">
              <h3 class="text-xl font-black">2. 地域信息管理 | Location Information Management</h3>
              <ul class="space-y-1 ml-4">
                <li>· 避免提及具体地理位置 | Avoid mentioning specific locations</li>
                <li>· 专注于观点本身 | Focus on viewpoints themselves</li>
              </ul>
            </div>

            <div class="space-y-2">
              <h3 class="text-xl font-black">3. 互动准则 | Interaction Guidelines</h3>
              <ul class="space-y-1 ml-4">
                <li>· 保持理性和尊重 | Maintain rationality and respect</li>
                <li>· 基于内容进行讨论 | Discuss based on content</li>
                <li>· 避免情绪化发言 | Avoid emotional expressions</li>
              </ul>
            </div>

            <div class="space-y-2">
              <h3 class="text-xl font-black">4. 观察记录 | Observation Records</h3>
              <ul class="space-y-1 ml-4">
                <li>· 记录互动体验 | Document interaction experiences</li>
                <li>· 注意态度变化 | Note attitude changes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Artalk Comment Section -->
      <el-row class="mt-16">
        <el-col :span="2" />
        <el-col :span="20">
          <view ref="el"/>
        </el-col>
        <el-col :span="2" />
      </el-row>
    </div>
  </div>
</template>

<style scoped>
</style>