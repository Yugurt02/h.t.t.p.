<script setup>
import {ref, computed} from 'vue'

const activeProject = ref(null)
const emit = defineEmits(['project-active'])

const visibleProjects = computed(() => {
  return projects
})

const toggleProject = (project) => {
  if (activeProject.value?.id === project.id) {
    activeProject.value = null
    emit('project-active', false)
  } else {
    activeProject.value = project
    emit('project-active', true)
  }
}

const closeProject = () => {
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

const disciplines = [
  'UI Design',
  'UX Research',
  'Art Direction',
  'Web Development'
]

const projects = [
  {
    id: '1',
    color: '#0000FF',
    title: 'SkillsUnion — Edtech Platform',
    detailTitle: "Revolutionising 'learning' by delivering practical knowledge for changemakers & helping them reach their full potential.",
    description: "SkillsUnion is a digital learning platform working with leading universities and renowned employers to design & deliver digital skill training programmes that help our students succeed in today's fast-evolving global tech industry.",
    tags: ['MARKETING', 'GROWTH', 'BRAND', 'WEBSITE']
  },
  {
    id: '2',
    color: '#FF0000',
    title: 'Value Tech Foundation — Blockchain R&D',
    detailTitle: 'Building the future of blockchain technology',
    description: 'A research and development initiative focused on advancing blockchain technology and its applications.',
    tags: ['BRAND', 'WEBSITE', 'EDITORIAL']
  },
  {
    id: '3',
    color: '#D3C1B3',
    title: "Mausumi — Writings' Showcase",
    detailTitle: 'A platform for creative expression',
    description: 'Showcasing thought-provoking writings and creative content from diverse voices.',
    tags: ['EDITORIAL', 'BRAND', 'WEBSITE']
  },
  {
    id: '4',
    color: '#FFFF00',
    title: 'Nowiverse — VR Game by Awry Studios',
    detailTitle: 'Immersive virtual reality gaming experience',
    description: 'A groundbreaking VR game that pushes the boundaries of interactive entertainment.',
    tags: ['VISUAL', 'WEBSITE', 'BRAND']
  },
  {
    id: '5',
    color: '#FFA500',
    title: 'Vocal — Influencer Marketing Agency',
    detailTitle: 'Connecting brands with authentic voices',
    description: 'Strategic influencer marketing solutions for modern brands.',
    tags: ['WEBSITE', 'BRAND']
  },
  {
    id: '6',
    color: '#006400',
    title: 'GreenFox — HVAC Brand',
    detailTitle: 'Sustainable climate control solutions',
    description: 'Innovative HVAC systems with a focus on environmental responsibility.',
    tags: ['VISUAL', 'BRAND', 'WEBSITE']
  },
  {
    id: '7',
    color: '#000000',
    title: 'AllBodies — Sex Ed. Platform',
    detailTitle: 'Inclusive sexual education for everyone',
    description: 'A comprehensive platform providing accessible and inclusive sexual education resources.',
    tags: ['COMPONENTS', 'BRAND', 'WEBSITE']
  },
  {
    id: '8',
    color: '#FFA07A',
    title: 'Buzzoms — Bra free Clothing',
    detailTitle: 'Redefining comfort in fashion',
    description: 'Revolutionary clothing line promoting comfort and body positivity.',
    tags: ['ART_DIRECTION', 'BRAND', 'WEBSITE', 'ECOMMERCE']
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
const navigateProject = (direction) => {
  const nextProject = getAdjacentProject(direction)
  if (nextProject) {
    activeProject.value = nextProject
    emit('project-active', true)
  }
}
</script>

<template>
  <div class="min-h-screen" :class="{'bg-gray-900': activeProject}">
    <div class="max-w-[1920px] mx-auto px-0 py-6 h-screen flex flex-col">
      <!-- 头部信息，固定在顶部 -->
      <div :class="{'text-white': activeProject}" class="flex-none">
        <h1 class="text-6xl font-normal mb-12 px-5">Project(s)</h1>

        <div class="grid grid-cols-8 gap-4 mt-16 mb-12 px-5">
          <!-- 过滤器部分 -->
          <div>
            <h3 class="text-xs mb-2">TYPE</h3>
            <ul class="space-y-1">
              <li v-for="type in types" :key="type" class="text-xs">{{ type }}</li>
            </ul>
          </div>

          <div>
            <h3 class="text-xs mb-2">YEAR</h3>
            <p class="text-xs">2019 - 2022</p>
          </div>

          <div>
            <h3 class="text-xs mb-2">DISCIPLINE</h3>
            <ul class="space-y-1">
              <li v-for="discipline in disciplines" :key="discipline" class="text-xs">
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
               class="fixed top-0 right-0 w-3/5 h-full bg-blue-600 text-white p-8 border-2 border-black rounded-xl flex flex-col">
            <!-- 主要内容 -->
            <div class="flex justify-between items-start flex-1">
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
</style>