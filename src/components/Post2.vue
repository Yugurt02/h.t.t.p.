<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import Artalk from 'artalk'
import 'artalk/dist/Artalk.css'

const router = useRouter()
const el = ref<HTMLElement>()
let artalk: Artalk | undefined
const activeTopicId = ref('topic1')

const topics = [
  {
    id: 'topic1',
    title: '不说出来，你也知道我在哪个城市',
    description: '每个城市都有自己独特的生活方式，让我们玩个游戏',
    rules: [
      '描述一个你熟悉的地方的日常生活场景',
      '但不能直接提到地名',
      '看看其他人能否猜到这是哪里'
    ],
    example: '早上6点起床去公园，碰到一群大爷在喝早茶，旁边小摊在炸油条...'
  },
  {
    id: 'topic2',
    title: '原来你们对我们是这么想的？',
    description: '让我们轻松一下，说说你听过的最有趣的地域印象',
    rules: [
      '最离谱的误解',
      '最有意思的说法',
      '最意外的发现'
    ]
  }
]

const scoringRules = [
  { title: '创意表达', score: 5, desc: '描述生动有趣' },
  { title: '互动回应', score: 5, desc: '积极参与讨论' },
  { title: '幽默化解', score: 10, desc: '用轻松方式化解偏见' }
]

const initArtalk = (topicId: string) => {
  if (!el.value) return

  artalk?.destroy()
  setTimeout(() => {
    artalk = new Artalk({
      el: el.value,
      pageKey: `phase1-${topicId}`,
      pageTitle: topics.find(t => t.id === topicId)?.title || 'Phase1',
      server: 'http://localhost:23366',
      site: 'h.t.t.p.',
      placeholder: '分享你的观察和故事...',
    })
  }, 100)
}

onMounted(() => {
  initArtalk(activeTopicId.value)
})

onBeforeUnmount(() => {
  artalk?.destroy()
})

const switchTopic = (topicId: string) => {
  activeTopicId.value = topicId
  initArtalk(topicId)
}
</script>

<template>
  <div class="min-h-screen bg-[#F1F1F1] text-black">
    <!-- Header -->
    <div class="max-w-[1400px] mx-auto px-8 pt-16">
      <h1 class="text-[12vw] font-black leading-[0.8] tracking-tight mb-4">
        Task 02:
        <span class="block text-[6vw] text-black">Icebreaking</span>
      </h1>

      <!-- Topic Navigation -->
      <div class="flex space-x-6 mb-16">
        <button
            v-for="topic in topics"
            :key="topic.id"
            @click="switchTopic(topic.id)"
            class="text-xl font-bold px-8 py-4 rounded-full transition-all duration-300"
            :class="activeTopicId === topic.id ?
            'bg-black text-white' :
            'bg-white text-black hover:bg-gray-100'"
        >
          {{ topic.id === 'topic1' ? '城市印象' : '刻板印象' }}
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-[1400px] mx-auto px-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column: Guidelines -->
        <div class="lg:col-span-1 space-y-8">
          <div
              v-for="topic in topics"
              v-show="activeTopicId === topic.id"
              :key="topic.id"
              class="space-y-8"
          >
            <!-- Topic Info -->
            <div class="bg-white p-8 rounded-lg space-y-6">
              <h2 class="text-2xl font-black">{{ topic.title }}</h2>
              <p class="text-gray-600">{{ topic.description }}</p>
            </div>

            <!-- Rules -->
            <div class="bg-white p-8 rounded-lg space-y-6">
              <h3 class="text-2xl font-black">游戏规则</h3>
              <ul class="space-y-4">
                <li
                    v-for="(rule, index) in topic.rules"
                    :key="index"
                    class="flex items-start space-x-3"
                >
                  <span class="w-2 h-2 bg-black rounded-full mt-2"></span>
                  <span>{{ rule }}</span>
                </li>
              </ul>
            </div>

            <!-- Example if exists -->
            <div v-if="topic.example" class="bg-white p-8 rounded-lg space-y-4">
              <h3 class="text-2xl font-black">示例</h3>
              <p class="text-gray-600 italic">{{ topic.example }}</p>
            </div>

            <!-- Scoring Rules -->
            <div class="bg-white p-8 rounded-lg space-y-6">
              <h3 class="text-2xl font-black">得分规则</h3>
              <div class="space-y-4">
                <div
                    v-for="rule in scoringRules"
                    :key="rule.title"
                    class="flex justify-between items-center p-4 border-b border-gray-100"
                >
                  <div>
                    <span class="font-bold">{{ rule.title }}</span>
                    <p class="text-sm text-gray-500">{{ rule.desc }}</p>
                  </div>
                  <span class="font-bold text-xl">+{{ rule.score }}分</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Discussion Area -->
        <div class="lg:col-span-2 space-y-8">
          <div class="bg-white p-8 rounded-lg">
            <h3 class="text-2xl font-black mb-8">参与讨论</h3>
            <div ref="el"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Next Step Indicator -->
    <div class="max-w-[1400px] mx-auto px-8 py-16 mt-16 border-t border-gray-200">
      <div class="flex justify-between items-center">
        <span class="text-gray-500">Next Step</span>
        <el-button
            class="!text-lg !font-bold !rounded-full !border-2 !border-black !bg-transparent !text-black hover:!bg-black hover:!text-white"
            @click="router.push('/forum/post3')"
        >
          Continue to Next Phase →
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