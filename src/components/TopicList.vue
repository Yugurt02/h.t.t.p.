<script setup lang="ts">
import {ref, computed, onBeforeUnmount, nextTick} from 'vue'
import Artalk from 'artalk'
import 'artalk/dist/Artalk.css'

const activeProject = ref(null)
const emit = defineEmits(['project-active'])

const visibleProjects = computed(() => {
  return projects
})

const toggleProject = async (project) => {
  if (activeProject.value?.id === project.id) {
    if (artalkInstances.value[project.id]) {
      artalkInstances.value[project.id].destroy()
      delete artalkInstances.value[project.id]
    }
    activeProject.value = null
    emit('project-active', false)
  } else {
    activeProject.value = project
    emit('project-active', true)
    await handleArtalkInstance(project.id, project.title)
  }
}

const closeProject = () => {
  if (activeProject.value) {
    Object.values(artalkInstances.value).forEach(instance => {
      instance.destroy()
    })
    artalkInstances.value = {}
  }
  activeProject.value = null
  emit('project-active', false)
}

const types = [
  'Website',
  'Visual / Brand',
  'Ecommerce Platform',
  'Web App',
  'Mobile App'
]

const year = '2023-2024'

const disciplines = [
  'UI Design',
  'UX Research',
  'Art Direction',
  'Web Development'
]

const projects = [
  {
    id: '01',
    color: '#E57373',
    title: '个人经历与地域印象',
    detailTitle: '探讨个人经历如何塑造地域印象',
    description: '每个人都有独特的生活经历，这些经历如何影响我们对不同地域的理解和认知？让我们一起探讨个人视角下的地域印象。',
    tags: ['#PREJUDICE', '#IDENTITY']
  },
  {
    id: '02',
    color: '#DCE775',
    title: '集体认知与刻板印象',
    detailTitle: '解析群体认知中的刻板印象形成',
    description: '探讨社会群体中普遍存在的刻板印象是如何形成和传播的，以及这些印象对社会交往的影响。',
    tags: ['#PREJUDICE', '#IDENTITY']
  },
  {
    id: '03',
    color: '#D7CCC8',
    title: '高考改革引发争议：综合素质评价将纳入录取标准',
    detailTitle: '教育改革中的地域公平问题',
    description: '探讨教育改革背景下的地域差异问题，以及如何确保教育资源的公平分配。',
    tags: ['#PREJUDICE', '#IDENTITY']
  },
  {
    id: '04',
    color: '#4DD0E1',
    title: '部分省会医院取消号贩子通道，专家号一号难求现象仍存',
    detailTitle: '医疗资源分配与地域差异',
    description: '讨论医疗资源分配不均衡的问题，以及如何改善基层医疗条件。',
    tags: ['#PREJUDICE', '#IDENTITY']
  },
  {
    id: '05',
    color: '#FFF176',
    title: '应届生就业选择：超80%青睐一线城市',
    detailTitle: '就业选择与城市发展',
    description: '探讨新生代求职者的就业倾向，以及不同城市的发展机遇。',
    tags: ['#PREJUDICE', '#IDENTITY']
  },
  {
    id: '06',
    color: '#4DB6AC',
    title: '一线城市收紧人才落户政策，多地"抢人大战"升级',
    detailTitle: '人才政策与区域发展',
    description: '分析各地人才政策的变化，探讨区域发展与人才流动的关系。',
    tags: ['#PREJUDICE', '#IDENTITY']
  },
  {
    id: '07',
    color: '#64B5F6',
    title: '"文化符号商业化"引争议：多地特色街区相似度高',
    detailTitle: '文化特色与商业开发',
    description: '探讨文化符号商业化过程中的同质化现象，以及如何保持地方特色。',
    tags: ['#PREJUDICE', '#IDENTITY']
  },
  {
    id: '08',
    color: '#64B5F6',
    title: '网红城市市容之变：特色没了，"现代化"来了',
    detailTitle: '城市发展与文化保护',
    description: '讨论城市现代化进程中的文化传承问题，探索平衡发展与保护的方案。',
    tags: ['#PREJUDICE', '#IDENTITY']
  }
]

const getProjectStyles = (project) => {
  if (!activeProject.value) return {}

  return {
    opacity: activeProject.value?.id === project.id ? '1' : '0.05',
    filter: activeProject.value?.id === project.id ? 'blur(0)' : 'blur(2px)',
    transition: 'all 0.3s ease'
  }
}

// 添加获取上一个/下一个项目的方法
const getAdjacentProject = (direction) => {
  const currentIndex = projects.findIndex(p => p.id === activeProject.value?.id)
  if (currentIndex === -1) return null

  if (direction === 'prev') {
    return currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1]
  } else {
    return currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0]
  }
}

// 添加切换到相邻项目的方法
const navigateProject = async (direction) => {
  const nextProject = getAdjacentProject(direction)
  if (nextProject) {
    activeProject.value = nextProject
    emit('project-active', true)
    await handleArtalkInstance(nextProject.id, nextProject.title)
  }
}

// 修改 Artalk 实例管理部分
const artalkInstances = ref<{ [key: string]: Artalk }>({})

// 添加一个专门的方法来处理 Artalk 实例
const handleArtalkInstance = async (projectId: string, title: string) => {
  // 先销毁所有现有实例
  Object.values(artalkInstances.value).forEach(instance => {
    instance.destroy()
  })
  artalkInstances.value = {}

  // 等待 DOM 更新
  await nextTick()
  
  // 获取新的评论容器元素
  const commentEl = document.getElementById(`comments-${projectId}`)
  if (!commentEl) return

  // 创建新实例
  artalkInstances.value[projectId] = new Artalk({
    el: commentEl,
    pageKey: `project-${projectId}`,
    pageTitle: title,
    server: 'http://localhost:23366',
    site: 'h.t.t.p.',
    placeholder: '分享你的想法...',
    // 添加更多配置以确保评论正确加载
    requestTimeout: 15000,
    darkMode: true,
    useBackendConf: true,
    // 添加错误处理
    onError: (err) => {
      console.error('Artalk error:', err)
    }
  })
}

// 确保组件卸载时清理所有实例
onBeforeUnmount(() => {
  Object.values(artalkInstances.value).forEach(instance => {
    instance.destroy()
  })
  artalkInstances.value = {}
})
</script>

<template>
  <div class="min-h-screen" :class="{'bg-gray-900': activeProject}">
    <div class="max-w-[1920*2px] mx-auto px-0 py-6 h-screen flex flex-col">
      <!-- 头部信息 -->
      <div :class="{'text-white': activeProject}" class="flex-none">
        <h1 class="text-[10vw] font-black leading-[0.8] tracking-tight mb-4 px-4">
          Forum
          <span class="block text-[4vw]">Discussion Space</span>
        </h1>

        <div class="grid grid-cols-8 gap-4 mt-16 mb-12 px-5">
          <!-- 类型部分 -->
          <div>
            <h3 class="text-xs uppercase mb-2">TYPE</h3>
            <ul class="space-y-1">
              <li v-for="type in types" :key="type" class="text-sm">{{ type }}</li>
            </ul>
          </div>

          <!-- 年份部分 -->
          <div>
            <h3 class="text-xs uppercase mb-2">YEAR</h3>
            <p class="text-sm">{{ year }}</p>
          </div>

          <!-- 学科部分 -->
          <div>
            <h3 class="text-xs uppercase mb-2">TYPE</h3>
            <ul class="space-y-1">
              <li v-for="discipline in disciplines" :key="discipline" class="text-sm">
                {{ discipline }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 主内容区域 - 设置为可滚动区域 -->
      <div class="flex flex-1 overflow-hidden mt-24">
        <!-- 项目列表 - 添加滚动容器 -->
        <div class="w-[100%] flex flex-col">
          <div class="border-container" :class="{'border-blur': activeProject}">
            <!-- 滚动区域容器 -->
            <div class="overflow-y-auto custom-scrollbar">
              <TransitionGroup
                  enter-active-class="transition-all duration-500 ease-out"
                  leave-active-class="transition-all duration-300 ease-in"
                  enter-from-class="opacity-0"
                  leave-to-class="opacity-0"
              >
                <div v-for="project in visibleProjects"
                     :key="project.id"
                     class="relative"
                     @click="toggleProject(project)">
                  <!-- 调整项目行的样式 -->
                  <div
                      class="flex items-center h-16 border-b border-gray-200 cursor-pointer transition-all duration-300 px-6"
                      :class="{
                         'bg-white text-black border-gray-200': activeProject?.id === project.id,
                         'text-white border-gray-700': activeProject && activeProject.id !== project.id
                       }"
                      :style="getProjectStyles(project)">
                    <span class="w-16 text-base">{{ project.id.padStart(2, '0') }}</span>
                    <div class="w-4 h-4 mr-8" :style="{ backgroundColor: project.color }"></div>
                    <h2 class="flex-1 text-xl whitespace-nowrap overflow-hidden text-ellipsis pr-8">{{
                        project.title
                      }}</h2>
                    <div class="flex gap-4 ml-auto">
                      <span v-for="tag in project.tags"
                            :key="tag"
                            class="px-3 py-1 text-xs rounded-full whitespace-nowrap"
                            :class="{
                              'bg-gray-100 text-black': activeProject?.id === project.id,
                              'bg-gray-800 text-white': activeProject && activeProject.id !== project.id
                            }">
                        #{{ tag }}
                      </span>
                    </div>
                  </div>
                </div>
              </TransitionGroup>
            </div>
          </div>
        </div>

        <!-- 项目详情卡片 - 减少宽度至 10% -->

        <Transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 translate-y-full"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-full"
        >
          <div v-if="activeProject"
               class="fixed top-0 right-0 w-3/5 h-full bg-blue-600 text-white p-8 border-2 border-black rounded-xl flex flex-col overflow-y-auto">
            <!-- 主要内容 -->
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <div class="text-sm mb-4">SKILLSUNION</div>
                <h3 class="text-4xl mb-4">{{ activeProject.detailTitle }}</h3>
                <p class="text-lg mb-6 max-w-3xl">{{ activeProject.description }}</p>
                <div class="flex gap-4">
                  <button class="bg-white/20 px-6 py-3 rounded-full text-sm hover:bg-white/30 transition-colors">
                    ↓ Download Report
                  </button>
                </div>
              </div>
              <button @click.stop="closeProject"
                      class="text-white/70 hover:text-white transition-colors">
                × CLOSE
              </button>
            </div>

            <!-- 评论区域 -->
            <div class="mt-8 bg-white/10 p-6 rounded-lg flex-1 overflow-y-auto">
              <h4 class="text-xl mb-4">项目讨论</h4>
              <div 
                :id="`comments-${activeProject.id}`" 
                class="artalk-comments"
                :key="`comments-${activeProject.id}`"
              ></div>
            </div>

            <!-- 添加导航按钮 -->
            <div class="flex justify-between items-center mt-auto pt-8 border-t border-white/20">
              <button
                  @click="navigateProject('prev')"
                  class="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
              >
                <span class="transform group-hover:-translate-x-1 transition-transform">←</span>
                <span>Previous Project</span>
              </button>
              <button
                  @click="navigateProject('next')"
                  class="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
              >
                <span>Next Project</span>
                <span class="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </Transition>

      </div>
    </div>
  </div>
</template>

<style scoped>
.project-detail-enter-active,
.project-detail-leave-active {
  transition: all 0.5s ease;
}

.project-detail-enter-from,
.project-detail-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

/* 添加背景色过渡效果 */
.bg-gray-900 {
  transition: background-color 0.3s ease;
}

/* 添加过渡效果 */
.project-row {
  transition: all 0.3s ease;
  will-change: opacity, filter; /* 优化性能 */
}

/* 确保激活项目的文字保持清晰 */
.project-row.active {
  filter: blur(0);
}

/* 使用伪元素创建可以模糊的边线 */
.border-container {
  position: relative;
}

.border-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #e5e7eb; /* border-gray-200 的颜色 */
  transition: all 0.3s ease;
}

/* 当激活项目时的模糊效果 */
.border-blur::before {
  filter: blur(1px);
  opacity: 0.05;
  background-color: #374151; /* border-gray-700 的颜色 */
}

/* 自定义滚动条样式 */
.custom-scrollbar {
  height: calc(100vh - 280px); /* 减去头部高度和边距 */
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(155, 155, 155, 0.5);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(155, 155, 155, 0.7);
}

/* 添加过渡效果的辅助类 */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Add Artalk custom styles */
.artalk-editor-textarea {
  @apply bg-white/10 border-2 border-white/20 rounded-lg transition-all duration-300
  min-h-[150px] text-base p-4 text-white;
}

.artalk-editor-textarea:focus {
  @apply border-white/40;
}

.artalk-send-btn {
  @apply bg-white/20 text-white rounded-full px-8 py-2 font-bold transition-all duration-300;
}

.artalk-send-btn:hover {
  @apply bg-white/30;
}

.artalk-comment-wrap {
  @apply py-6 border-b border-white/10;
}

.artalk-comment-avatar {
  @apply border-2 border-white/20 rounded-full;
}

.artalk-comment-nick {
  @apply font-bold text-white;
}

.artalk-comment-content {
  @apply text-white/90;
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

/* 调整 Artalk 容器样式 */
.artalk-comments {
  @apply h-full overflow-y-auto relative;
  min-height: 300px; /* 确保容器有足够的高度 */
}

/* 添加加载状态样式 */
.artalk-comments::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.artalk-comments.loading::before {
  opacity: 1;
}

/* 确保评论内容在暗色主题下可读 */
:deep(.artalk-comment-content) {
  @apply text-white/90;
}

:deep(.artalk-editor-textarea) {
  @apply bg-white/10 border-2 border-white/20 rounded-lg transition-all duration-300
  min-h-[150px] text-base p-4 text-white;
}

/* 添加新的样式 */
.text-[10vw] {
  font-size: 10vw;
}

.text-[5vw] {
  font-size: 5vw;
}
</style>