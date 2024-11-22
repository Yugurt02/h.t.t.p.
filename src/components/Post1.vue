<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import Artalk from 'artalk'
import 'artalk/dist/Artalk.css'

const router = useRouter()
const el = ref<HTMLElement>()
let artalk: Artalk | undefined

const guidelinePoints = [
  {
    title: '推荐格式',
    points: [
      '职业背景',
      '日常兴趣爱好',
      '价值观念',
      '近期关注的话题',
      '对未来的期待'
    ]
  },
  {
    title: '提问建议',
    points: [
      '关于工作内容',
      '关于生活方式',
      '关于个人观点',
      '避免地域相关问题'
    ]
  }
]

onMounted(() => {
  if (!el.value) return

  artalk = new Artalk({
    el: el.value,
    pageKey: 'task1-introduction',
    pageTitle: 'Self Introduction',
    server: 'http://localhost:23366',
    site: 'h.t.t.p.',
    placeholder: '分享你的故事...',
  })
})

onBeforeUnmount(() => {
  artalk?.destroy()
})
</script>

<template>
  <div class="min-h-screen bg-[#F1F1F1] text-black">
    <!-- Header -->
    <div class="max-w-[1400px] mx-auto px-8 pt-16">
      <h1 class="text-[12vw] font-black leading-[0.8] tracking-tight mb-4">
        Task 01:
        <span class="block text-[6vw] text-black">Self Introduction</span>
      </h1>

      <!-- Current Progress -->
      <div class="flex items-center space-x-4 text-lg text-gray-600 mb-16">
        <span class="font-bold">Current Task:</span>
        <span>Complete self-introduction without revealing actual location</span>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-[1400px] mx-auto px-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column: Guidelines -->
        <div class="lg:col-span-1 space-y-8">
          <div v-for="(guideline, index) in guidelinePoints" :key="index" class="bg-white p-8 rounded-lg space-y-6">
            <h3 class="text-2xl font-black">{{ guideline.title }}</h3>
            <ul class="space-y-4">
              <li
                  v-for="(point, pIndex) in guideline.points"
                  :key="pIndex"
                  class="flex items-start space-x-3 text-lg"
              >
                <span class="w-2 h-2 bg-black rounded-full mt-2"></span>
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>

          <!-- Example Answer -->
          <div class="bg-white p-8 rounded-lg space-y-4">
            <h3 class="text-2xl font-black">示例回答</h3>
            <p class="text-gray-700 italic">
              "作为一名产品经理，我很关注用户体验。工作之余喜欢尝试各种新潮咖啡店，对数字产品有特别的兴趣..."
            </p>
          </div>
        </div>

        <!-- Right Column: Discussion Area -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Discussion Guidelines -->
          <div class="bg-white p-8 rounded-lg space-y-4">
            <h3 class="text-2xl font-black">参与讨论</h3>
            <p class="text-gray-600">
              在下方评论区分享你的自我介绍，与其他参与者互动交流。记住避免透露具体地理位置信息。
            </p>
          </div>

          <!-- Artalk Container -->
          <div class="bg-white p-8 rounded-lg">
            <div ref="el"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Next Step Indicator -->
    <div class="max-w-[1400px] mx-auto px-8 py-16 mt-16 border-t border-gray-200">
      <div class="flex justify-between items-center">
        <span class="text-gray-500">Next Step: Topic Discussion</span>
        <el-button
            class="!text-lg !font-bold !rounded-full !border-2 !border-black !bg-transparent !text-black hover:!bg-black hover:!text-white"
            @click="router.push('/forum/post2')"
        >
          Continue to Task02 →
        </el-button>
      </div>
    </div>
  </div>
</template>

<style>
/* Artalk Custom Styles */
.artalk-editor-textarea {
  background: rgb(249 250 251) !important;
  border: 2px solid rgb(229 231 235) !important;
  border-radius: 0.5rem !important;
  transition: all 0.3s !important;
  min-height: 150px !important;
  font-size: 1rem !important;
  padding: 1rem !important;
}

.artalk-editor-textarea:focus {
  background: white !important;
  border-color: black !important;
}

.artalk-send-btn {
  background: black !important;
  color: white !important;
  border-radius: 9999px !important;
  padding: 0.5rem 2rem !important;
  font-weight: 700 !important;
  transition: all 0.3s !important;
}

.artalk-send-btn:hover {
  background: rgb(31 41 55) !important;
}

.artalk-comment-wrap {
  padding: 1.5rem 0 !important;
  border-bottom: 1px solid rgb(243 244 246) !important;
}

.artalk-comment-avatar {
  border: 2px solid rgb(229 231 235) !important;
  border-radius: 9999px !important;
}

.artalk-comment-nick {
  font-weight: 700 !important;
}

/* Hide unnecessary elements */
.artalk-layer-dialog-wrap,
.artalk-editor-plug-wrap {
  display: none !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .artalk-send-btn {
    width: 100% !important;
    margin-top: 1rem !important;
  }
}
</style>