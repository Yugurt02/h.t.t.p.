<script setup lang="ts">
// Core imports
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import Artalk from 'artalk'
import 'artalk/dist/Artalk.css'

// Router setup
const router = useRouter()

// Artalk setup
const el = ref<HTMLElement>()
let artalk: Artalk | undefined

// Content data
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

// Lifecycle hooks
onMounted(() => {
  if (!el.value) return

  artalk = new Artalk({
    el: el.value,
    pageKey: 'part1',
    pageTitle: 'part1',
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
    <!-- Header Section -->
    <header class="max-w-[1400px] mx-auto px-8 pt-16">
      <!-- Title Section -->
      <div class="space-y-8 mb-24">
        <h1 class="text-[10vw] font-black leading-[0.8] tracking-tight">
          Part 1:
          <span class="block text-[5vw] text-black">Identity and Labels</span>
        </h1>
        <p class="text-base text-black max-w-4xl leading-relaxed mt-12">
          在深入探讨IP属地带来的影响之前，
          让我们先聊聊这些已经存在的"预设立场"：
          它们是如何影响我们的，又是如何延续的？
        </p>
      </div>

      <!-- User Info Card -->
      <div class="bg-white rounded-lg p-8 mb-16 w-full">
        <div class="flex justify-between items-center max-w-[1400px]">
          <div class="flex space-x-20">
            <div class="info-item">
              <div class="text-sm text-gray-500 mb-1">角色</div>
              <div class="text-xl font-bold">Adam</div>
            </div>
            <div class="info-item">
              <div class="text-sm text-gray-500 mb-1">Email</div>
              <div class="text-xl">user@http.workshop</div>
            </div>
            <div class="info-item">
              <div class="text-sm text-gray-500 mb-1">IP属地</div>
              <div class="text-xl">[系统识别]</div>
            </div>
          </div>
          <div class="points-display">
            <span class="text-sm text-gray-500">积分</span>
            <span class="text-3xl font-black ml-2">20</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-[1400px] mx-auto px-8 mb-16">
      <div class="grid grid-cols-12 gap-8">
        <!-- Sidebar Guidelines -->
        <aside class="col-span-12 lg:col-span-4 space-y-8">
          <!-- First Guidelines Card -->
          <div class="bg-white p-8 rounded-lg">
            <div class="flex items-start mb-8">
              <span class="text-6xl font-black leading-none mr-4">01</span>
              <div class="pt-1">
                <span class="block text-2xl font-black">身份预设的困境</span>
                <span class="block text-gray-500">Dilemma of Identity Assumption</span>
              </div>
            </div>
            <ul class="space-y-4">
              <li class="guideline-item">
                <span class="w-2 h-2 bg-black rounded-full mt-2"></span>
                <span class="text-lg">最常被赋予的特质是什么？</span>
              </li>
              <li class="guideline-item">
                <span class="w-2 h-2 bg-black rounded-full mt-2"></span>
                <span class="text-lg">这些特质是否影响了你的社交？</span>
              </li>
              <li class="guideline-item">
                <span class="w-2 h-2 bg-black rounded-full mt-2"></span>
                <span class="text-lg">你如何看待这些"预设"？</span>
              </li>
            </ul>
          </div>

          <!-- Second Guidelines Card -->
          <div class="bg-white p-8 rounded-lg">
            <div class="flex items-start mb-6">
              <span class="text-6xl font-black leading-none mr-4">02</span>
              <div class="pt-1">
                <span class="block text-2xl font-black">标签下的真实</span>
                <span class="block text-gray-500">Under the Labels</span>
              </div>
            </div>
            <ul class="space-y-4">
              <li class="guideline-item">
                <span class="w-2 h-2 bg-black rounded-full mt-2"></span>
                <span class="text-lg">这些预设与现实有多大差距？</span>
              </li>
              <li class="guideline-item">
                <span class="w-2 h-2 bg-black rounded-full mt-2"></span>
                <span class="text-lg">为什么这些印象会如此顽固？</span>
              </li>
              <li class="guideline-item">
                <span class="w-2 h-2 bg-black rounded-full mt-2"></span>
                <span class="text-lg">你是否尝试过打破这些印象？</span>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Main Discussion Area -->
        <section class="col-span-12 lg:col-span-8">
          <div class="bg-white p-8 rounded-lg">
            <div class="space-y-8">
              <h3 class="text-3xl font-black">参与讨论</h3>

              <div class="space-y-8 pl-4">
                <!-- Quotes Section -->
                <div class="bg-gray-50 p-6 rounded-lg space-y-8">
                  <div class="space-y-2">
                    <p class="text-lg">"你是XX人啊，那一定很能吃辣..."</p>
                    <p class="text-lg">"你是XX人啊，普通话这么好，听起来不像啊..."</p>
                    <p class="text-lg">"你是XX人啊，那性格一定很XX..."</p>
                  </div>

                  <div class="space-y-4 border-gray-200">
                    <p class="text-lg leading-relaxed">
                      听到这些话，你是否会心一笑，还是默默叹气？
                    </p>
                    <p class="text-lg leading-relaxed">
                      每个地方的人似乎都被贴上了固定的标签，
                      有时是褒义，有时是贬义，
                      有时让我们觉得有趣，有时却令人哭笑不得。
                    </p>
                  </div>
                  <div class="space-y-2">
                    <p class="text-lg font-medium">让我们来聊聊那些被"预设"的身份标签：</p>
                    <ul class="space-y-3">
                      <li class="flex items-center space-x-2">
                        <span>👉</span>
                        <span>你被贴过什么有趣的标签？</span>
                      </li>
                      <li class="flex items-center space-x-2">
                        <span>👉</span>
                        <span>你如何看待这些"预设"？</span>
                      </li>
                      <li class="flex items-center space-x-2">
                        <span>👉</span>
                        <span>这些标签是否影响了你的生活？</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- Comments Area -->
            <div ref="el" class="mt-8"></div>
          </div>
        </section>
      </div>
    </main>

    <!-- Footer Navigation -->
    <footer class="max-w-[1400px] mx-auto px-8 py-8 border-t border-gray-200">
      <div class="flex justify-between items-center">
        <span class="text-xl text-gray-500">Next: Topic Discussion</span>
        <el-button
            class="nav-button"
            @click="router.push('/forum/post2')"
        >
          Continue to Part 2 →
        </el-button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.info-item {
  @apply space-y-1;
}

.guideline-item {
  @apply flex items-start space-x-3;
}

.points-display {
  @apply flex items-center;
}

.nav-button {
  @apply text-lg font-black rounded-full border-2 border-black bg-transparent text-black
  hover:bg-black hover:text-white px-8 py-4 transition-all duration-300;
}
</style>

<style>
/* Artalk Custom Styles */
.artalk-editor-textarea {
  @apply bg-gray-50 border-2 border-gray-200 rounded-lg transition-all duration-300
  min-h-[150px] text-base p-4;
}

.artalk-editor-textarea:focus {
  @apply bg-white border-black;
}

.artalk-send-btn {
  @apply bg-black text-white rounded-full px-8 py-2 font-bold transition-all duration-300;
}

.artalk-send-btn:hover {
  @apply bg-gray-800;
}

.artalk-comment-wrap {
  @apply py-6 border-b border-gray-100;
}

.artalk-comment-avatar {
  @apply border-2 border-gray-200 rounded-full;
}

.artalk-comment-nick {
  @apply font-bold;
}

/* Hide unnecessary elements */
.artalk-layer-dialog-wrap,
.artalk-editor-plug-wrap {
  display: none !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .artalk-send-btn {
    @apply w-full mt-4;
  }
}
</style>