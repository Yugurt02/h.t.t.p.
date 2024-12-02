<script setup lang="ts">
import { ref, computed, onBeforeUnmount, nextTick } from "vue";
import Artalk from "artalk";
import "../assets/artalk.css";

const activeProject = ref(null);
const emit = defineEmits(["project-active"]);

const visibleProjects = computed(() => {
  return projects;
});

const toggleProject = async (project) => {
  if (activeProject.value) {
    if (artalkInstances.value[activeProject.value.id]) {
      artalkInstances.value[activeProject.value.id].destroy();
      delete artalkInstances.value[activeProject.value.id];
    }
    activeProject.value = null;
    emit("project-active", false);
  } else {
    activeProject.value = project;
    emit("project-active", true);
    await handleArtalkInstance(project.id, project.title);
  }
};

const closeProject = () => {
  if (activeProject.value) {
    Object.values(artalkInstances.value).forEach((instance) => {
      instance.destroy();
    });
    artalkInstances.value = {};
  }
  activeProject.value = null;
  emit("project-active", false);
};

const types = [
  "Website",
  "Visual / Brand",
  "Web App",
  "Mobile App",
];

const year = "2023-2024";

const disciplines = [
  "UI Design",
  "UX Research",
  "Art Direction",
  "Web Development",
];

const projects = [
  {
    id: "01",
    color: "#E57373", 
    title: "个人经历与地域印象",
    detailTitle: "探讨个人经历如何塑造地域印象",
    description: `"不好意思，看到你是XX省的，可能不太合适..."
    上周，应届生小林在某互联网公司面试时遇到这样的回复。面试官解释说，根据公司历史数据，这个省份的员工离职率偏高，"纯粹从数据角度考虑"。
这并非个例。人才市场调研机构最新数据显示，35%的企业HR会将求职者籍贯作为筛选参考，其中超过四分之一的公司明确存在地域偏好。
"我们不是歧视，是基于数据做决策。"这家公司的HR总监在接受采访时这样解释。但当被问及具体的"数据"时，他们承认这个"高离职率"的结论来自于不到50人的样本。
一位人力资源专家指出，这种貌似理性的筛选背后，折射出招聘市场的固化思维。用地域标签代替个人评估，不仅是对人才的浪费，更是变相的偏见合理化。
有趣的是，当记者走访多家企业后发现，不同公司对"高离职率地区"的判断并不一致。有的认为是北方，有的说是南方；有的觉得是发达地区，有的则指向欠发达地区。这种矛盾的判断本身就说明，所谓的"数据规律"可能只是偏见的另一种表达。
最近，一份针对2000名求职者的调查显示，42%的人在求职过程中遇到过基于地域的筛选。而当这些经历被发到社交平台后，评论区往往会出现更多类似的遭遇。
"用人单位有选择的自由，但如果这种选择建立在对特定群体的预设上，那就不仅是招聘问题，而是整个社会的认知偏差了。"一位社会学者在接受采访时这样说。`,
    tags: ["PREJUDICE", "IDENTITY", "STEREOTYPE"],
    image: "img1",
    imageCaption: "社交媒体中的地域标签讨论"
  },
  {
    id: "02",
    color: "#DCE775",
    title: "集体认知与刻板印象",
    detailTitle: "解析群体认知中的刻板印象形成",
    description:
      "探讨社会群体中普遍存在的刻板印象是如何形成和传播的，以及这些印象对社会交往的影响。",
    tags: ["STEREOTYPE", "SOCIETY", "COGNITION"],
    image: "img2"
  },
  {
    id: "03",
    color: "#D7CCC8",
    title: "教育改革中的地域公平问题",
    detailTitle: "高考改革引发争议：综合素质评价将纳入录取标准",
    description:
      "探讨教育改革背景下的地域差异问题，以及如何确保教育资源的公平分配。",
    tags: ["EDUCATION", "EQUALITY", "REFORM"],
  },
  {
    id: "04",
    color: "#4DD0E1",
    title: "医疗资源分配与地域差异",
    detailTitle: "部分省会医院取消号贩子通道，专家号一号难求现象仍存",
    description: "讨论医疗资源分配不均衡的问题，以及如何改善基层医疗条件。",
    tags: ["HEALTHCARE", "RESOURCE", "INEQUALITY"],
  },
  {
    id: "05",
    color: "#FFF176",
    title: "就业选择与城市发展",
    detailTitle: "应届生就业选择：超80%青睐一线城市",
    description: "探讨新生代求职者的就业倾向，以及不同城市的发展机遇。",
    tags: ["EMPLOYMENT", "YOUTH", "URBANIZATION"],
  },
  {
    id: "06",
    color: "#4DB6AC",
    title: '人才政策与区域发展',
    detailTitle: '一线城市收紧人才落户政策，多地"抢人大战"升级',
    description: "分析各地人才政策的变化，探讨区域发展与人才流动的关系。",
    tags: ["POLICY", "TALENT", "DEVELOPMENT"],
  },
  {
    id: "07",
    color: "#64B5F6",
    title: '文化特色与商业开发',
    detailTitle: '"文化符号商业化"引争议：多地特色街区相似度高',
    description: "探讨文化符号商业化过程中的同质化现象，以及如何保持地方特色。",
    tags: ["CULTURE", "COMMERCE", "IDENTITY"],
  },
  {
    id: "08",
    color: "#64B5F6",
    title: '城市发展与文化保护',
    detailTitle: '网红城市市容之变：特色没了，"现代化"来了',
    description:
      "讨论城市现代化进程中的文化传承问题，探索平衡发展与保护的方案。",
    tags: ["CULTURE", "MODERNIZATION", "HERITAGE"],
  },
  {
    id: "09",
    color: "#FF9800",
    title: '年轻人"消费降级"引热议：精打细算是无奈还是觉醒？',
    detailTitle: "消费降级现象背后的社会思考",
    description: `最新数据显示：
                  - 90后月均外卖支出下降30%
                  - 精致咖啡变速溶咖啡
                  - 奢侈品消费大幅下降
                  - "省钱"成为社交平台热词`,
    tags: ["PREJUDICE", "IDENTITY"],
  },
  {
    id: "10",
    color: "#9C27B0",
    title: "当IP属地成为观点的枷锁",
    detailTitle: "IP属地标签对网络讨论的影响",
    description: `近日，一位来自西部地区的网友在社交平台发起"双一流高校扩招建议"的讨论，引发争议。事件经过：

                  - 该网友详细论证了扩大招生名额的可行性
                  - 有人发现其IP属地后评论："就你们那教育水平也配谈这个？"
                  - 随后评论区变成了地域身份之争
                  - 最终发帖人删除了原贴及其所有相关评论

                  类似案例频频发生：
                  - 东北IP谈经济发展被嘲讽
                  - 内陆IP谈教育改革遭否定
                  - 三四线城市IP谈房价被讽刺

                  [原贴部分评论]
                  "说得很有道理，确实需要考虑教育公平..."
                  "你们那边高考都什么水平？哪来的发言权？"
                  "建议你先了解一下双一流高校的要求..."
                  "这种地方来的，懂什么教育？"`,
    tags: ["PREJUDICE", "IDENTITY"],
  },
  {
    id: "11",
    color: "#4CAF50",
    title: '"进厂打工"争议：地域身份如何影响职场机会',
    detailTitle: "职场中的地域歧视现象探讨",
    description: `事件概要：
                  某工厂招聘广告明确标注"不要XX省份人"引发热议。
                  招聘方称"过往数据显示该地区离职率高"。

                  [评论区]
                  "这就是赤裸裸的地域歧视！"
                  "数据会说话，这是事实。"
                  "一人一个标签，是不是把人看得太简单了？"
                  "要讨论离职率，得先谈谈工资和待遇吧。"`,
    tags: ["PREJUDICE", "IDENTITY"],
  },
  {
    id: "12",
    color: "#2196F3",
    title: "IP属地显示政策实施二周年观察",
    detailTitle: "IP属地政策的利弊分析",
    description: `政策初衷：
                  - 打击网络谣言
                  - 提高发言真实性
                  - 促进理性讨论

                  实际效果：
                  - 地域偏见更显著
                  - 身份标签更固化
                  - 话语权重更失衡

                  [相关讨论]
                  "显示IP属地真的能让讨论更理性吗？"
                  "有些观点刚看到还觉得有道理，一看IP就开始怀疑..."
                  "现在说话之前都要考虑自己的IP会不会影响别人的判断"
                  "到底是因为IP产生了偏见，还是IP放大了原有的偏见？"`,
    tags: ["PREJUDICE", "IDENTITY"],
  },
];

const getProjectStyles = (project) => {
  if (!activeProject.value)
    return {
      transition: "all 0.3s ease",
      cursor: "pointer",
    };

  const isActive = activeProject.value?.id === project.id;
  return {
    opacity: isActive ? "1" : "0.05",
    filter: isActive ? "blur(0)" : "blur(2px)",
    transition: "all 0.3s ease",
    cursor: isActive ? "pointer" : "default",
    pointerEvents: isActive ? "auto" : "none",
    transform: "none",
  };
};

// 添加获取上一个/下一个项目的方法
const getAdjacentProject = (direction) => {
  const currentIndex = projects.findIndex(
    (p) => p.id === activeProject.value?.id
  );
  if (currentIndex === -1) return null;

  if (direction === "prev") {
    return currentIndex > 0
      ? projects[currentIndex - 1]
      : projects[projects.length - 1];
  } else {
    return currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : projects[0];
  }
};

// 添加切换到相邻项目的方法
const navigateProject = async (direction) => {
  const nextProject = getAdjacentProject(direction);
  if (nextProject) {
    activeProject.value = nextProject;
    emit("project-active", true);
    await handleArtalkInstance(nextProject.id, nextProject.title);
  }
};

// 修改 Artalk 实例管理部分
const artalkInstances = ref<{ [key: string]: Artalk }>({});

// 添加一个专门的方法来处理 Artalk 实例
const handleArtalkInstance = async (projectId: string, title: string) => {
  // 先毁所有现有实例
  Object.values(artalkInstances.value).forEach((instance) => {
    instance.destroy();
  });
  artalkInstances.value = {};

  // 等待 DOM 更新
  await nextTick();

  // 获取新的评论容器元素
  const commentEl = document.getElementById(`comments-${projectId}`);
  if (!commentEl) return;

  // 创建新实例
  artalkInstances.value[projectId] = new Artalk({
    el: commentEl,
    pageKey: `project-${projectId}`,
    pageTitle: title,
    server: "http://localhost:23366",
    site: "h.t.t.p.",
    placeholder: "分享你的想法...",
    // 添加更多配置以确保评论正确加载
    requestTimeout: 15000,
    useBackendConf: true,

    // 添加错误处理
    onError: (err) => {
      console.error("Artalk error:", err);
    },
  });
};

// 确保组件卸载时清理所有实例
onBeforeUnmount(() => {
  Object.values(artalkInstances.value).forEach((instance) => {
    instance.destroy();
  });
  artalkInstances.value = {};
});
</script>

<template>
  <div
    class="bg-[#F1F1F1] min-h-screen"
    :class="{ 'bg-custom-dark': activeProject }"
  >
    <div class="flex flex-col mx-auto px-0 pt-4 pb-0 max-w-[1920*2px] h-screen">
      <!-- 头部信息 -->
      <div :class="{ 'text-[#E2E2E2]': activeProject }" class="flex-none border-[#222222] border-b-2">
        <h1
          class="mb-4 px-4 font-black text-[clamp(3rem,8vw,10rem)] leading-[0.8] tracking-tight"
        >
          Forum
          <span class="block text-[clamp(1.5rem,4vw,5rem)]">Discussion Space</span>
        </h1>

        <div class="gap-4 grid grid-cols-8 mt-16 mb-12 px-5">
          <!-- 类型部分 -->
          <div>
            <h3 class="mb-2 text-xs md:text-sm uppercase font-medium">TYPE</h3>
            <ul class="space-y-1">
              <li v-for="type in types" :key="type" class="text-xs md:text-sm ">
                {{ type }}
              </li>
            </ul>
          </div>

          <!-- 年份部分 -->
          <div>
            <h3 class="mb-2 text-xs md:text-sm uppercase">YEAR</h3>
            <p class="text-xs md:text-sm ">{{ year }}</p>
          </div>

          <!-- 学科部分 -->
          <div>
            <h3 class="mb-2 text-xs md:text-sm uppercase">DISCIPLINE</h3>
            <ul class="space-y-1">
              <li
                v-for="discipline in disciplines"
                :key="discipline"
                class="text-xs md:text-sm"
              >
                {{ discipline }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 主内容区域 -->
      <!-- 主内容区域容器,设置可滚动 -->
      <div class="flex-1 overflow-y-auto">
        <!-- 项目列表容器,设置最大宽度 -->
        <div class="mx-auto w-[100%]">
          <!-- 边框容器,根据activeProject状态添加模糊效果 -->
          <div class="border-container border-gray-600" :class="{ 'border-blur': activeProject }">
            <!-- 项目列表过渡动画组 -->
            <TransitionGroup
              enter-active-class="transition-all duration-500 ease-out"
              leave-active-class="transition-all duration-300 ease-in"
              enter-from-class="opacity-0"
              leave-to-class="opacity-0"
            >
              <!-- 遍历并渲染每个项目 -->
              <div v-for="project in visibleProjects" :key="project.id" class="relative"
                @click="toggleProject(project)"
                :class="{ 'hover:translate-x-0': activeProject && activeProject.id !== project.id }">
                <!-- 单个项目内容布局 -->
                <div class="flex items-center border-gray-600 px-6 border-b h-16 transition-all duration-300"
                  :class="{
                    'bg-[#F1F1F1] text-black border-gray-600': activeProject?.id === project.id,
                  }"
                  :style="getProjectStyles(project)">
                  <!-- 项目编号 -->
                  <span class="w-16 font-semibold text-2xl">{{ project.id.padStart(2, "0") }}</span>
                  <!-- 项目颜色标识 -->
                  <div class="mr-8 rounded-sm w-[clamp(1rem,1vw,1.5rem)] h-[clamp(1rem,1vw,1.5rem)]" :style="{ backgroundColor: project.color }"></div>
                  <!-- 项目标题 -->
                  <h2 class="flex-1 pr-8 text-[clamp(1rem,2vw,1.5rem)] text-ellipsis whitespace-nowrap overflow-hidden">
                    {{ project.title }}
                  </h2>
                  <!-- 项目标签组 -->
                  <div class="flex gap-4 ml-auto">
                    <!-- 遍历渲染标签 -->
                    <span v-for="tag in project.tags" :key="tag"
                      class="px-3 py-1 border border-black rounded-full text-xs whitespace-nowrap"
                      :class="{
                        'bg-[#F1F1F1] text-black': activeProject?.id === project.id,
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
        <div
          v-if="activeProject"
          class="top-0 right-0 fixed flex flex-col border-4 bg-[#DED3C1] px-6 py-4 border-black/90 rounded-xl w-3/5 h-full text-black overflow-y-auto scrollbar-none"
        >
          
            <!-- 导航栏 -->
            <div class="flex justify-between items-start mb-6 h-20">
              <div class="space-y-[-4px]">
                <div v-for="tag in activeProject.tags" :key="tag" class="text-[clamp(0.75rem,1vw,0.875rem)] leading-tight">
                  #{{ tag }}
                </div>
              </div>
              <button
                @click.stop="closeProject"
                class="text-black/70 text-[clamp(0.75rem,1vw,0.875rem)] hover:text-black transition-colors"
              >
                × CLOSE
              </button>
            </div>
            
            <!-- 主要内容 -->
            <!-- 标题栏 --> 
            <div class="flex-1">
              <h2 class="mb-auto font-semibold text-[clamp(1rem,2vw,1.5rem)] leading-[1]">
                {{ "TOPIC" + " " + activeProject.id.padStart(2, "0") + ":" }}
              </h2>
              <h3 class="mb-4 font-black text-[clamp(1.5rem,4vw,3rem)]">{{ activeProject.detailTitle }}</h3>
              <!-- 图片和注释容器 -->
              <div v-if="activeProject.image" class="relative mx-auto my-6">
                <img 
                  :src="'/src/assets/img/' + activeProject.image + '.png'" 
                  alt="Topic image"
                  class="w-full h-auto"
                />
                <div v-if="activeProject.imageCaption" 
                  class="mt-1 text-xs text-black/80 text-right underline">
                  {{ activeProject.imageCaption }}
                </div>
              </div>
              <!-- 描述 -->
              <p class="mb-2 max-w-3xl text-[clamp(0.75rem, 1vw, 0.875rem)] whitespace-pre-line">
                {{ activeProject.description }}
              </p>
            </div>
          

          <!-- 评论区域 -->
          <div class="flex-1 bg-[#b5a998] mt-4 p-6 rounded-lg">
            <h4 class="mb-4 text-xl">COMMENTS</h4>
            <div
              :id="`comments-${activeProject.id}`"
              class="artalk-comments"
              :key="`comments-${activeProject.id}`"
            ></div>
          </div>

          <!-- 修改导航按钮文本和样式 -->
          <div
            class="flex justify-between items-center mt-auto pt-8 border-t border-black/20"
          >
            <button
              @click="navigateProject('prev')"
              class="flex items-center gap-2 text-black/70 hover:text-black transition-colors group"
            >
              <span
                class="transform transition-transform group-hover:-translate-x-1"
                >←</span
              >
              <span>Previous Topic</span>
            </button>
            <button
              @click="navigateProject('next')"
              class="flex items-center gap-2 text-black/70 hover:text-black transition-colors group"
            >
              <span>Next Topic</span>
              <span
                class="transform transition-transform group-hover:translate-x-1"
                >→</span
              >
            </button>
          </div>
        </div>
      </Transition>
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
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0px;
  background-color: #53565c; /* border-gray-200 的颜色 */
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
  height: calc(100vh - 220px) !important; /* 减少上方预留空间 */
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
  overflow-y: auto;
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

/* 添加新的样式 */
.text-[10vw] {
  font-size: 10vw;
}

.text-[5vw] {
  font-size: 5vw;
}

/* 修改全局过渡效果，排除特定元素 */
*:not(.flex-none *, h1, .text-[10vw], .text-[5vw], .text-xs, .text-sm) {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 移除头部标题的动画 */
.flex-none h1,
.flex-none h2,
.flex-none h3,
.flex-none p,
.flex-none li {
  transition: none;
  transform: none;
}

.flex-none h1:hover,
.flex-none h2:hover,
.flex-none h3:hover,
.flex-none p:hover,
.flex-none li:hover {
  transform: none;
}

/* 移除项目详情卡片标题的悬浮效果 */
.fixed h3,
.fixed h3:hover {
  transition: none;
  transform: none;
}

/* 页面背景切换动画 */
.bg-\[\#F1F1F1\],
.bg-\[\#222222\] {
  transition: background-color 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 项目列表动画优化 */
.project-row {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity, filter;
}

/* 项目hover效果 */
.project-row:hover {
  transform: translateX(8px);
}

/* 标题动画 */
h1,
h2,
h3 {
  transition: none !important;
  transform: none !important;
}

h1:hover,
h2:hover,
h3:hover {
  transform: none !important;
}

/* 标签动画 */
.rounded-full {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.rounded-full:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 详情卡片动画优化 */
.fixed {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 按钮动画 */
button {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

button:hover {
  transform: translateY(-2px);
}

/* 导航按钮特殊动画 */
.group:hover span {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 列表项淡入淡出优化 */
.transition-all {
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1) !important;
}

/* 滚动条平滑滚动 */
.custom-scrollbar {
  scroll-behavior: smooth;
}



/* 页面加载动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.flex-none {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 列表项交错动画 */
.project-row {
  animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  animation-fill-mode: both;
}

.project-row:nth-child(1) {
  animation-delay: 0.1s;
}
.project-row:nth-child(2) {
  animation-delay: 0.2s;
}
.project-row:nth-child(3) {
  animation-delay: 0.3s;
}
.project-row:nth-child(4) {
  animation-delay: 0.4s;
}
.project-row:nth-child(5) {
  animation-delay: 0.5s;
}
.project-row:nth-child(6) {
  animation-delay: 0.6s;
}
.project-row:nth-child(7) {
  animation-delay: 0.7s;
}
.project-row:nth-child(8) {
  animation-delay: 0.8s;
}

/* 优化现有过渡效果 */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 添加弹性效果 */
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.1);
  }
  80% {
    opacity: 1;
    transform: scale(0.89);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 应用到标签和按钮的出现效果 */
.rounded-full,
button {
  animation: bounceIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 移除标签的动画效果 */
span[class*="tag"],
.rounded-full {
  transition: none;
  transform: none !important;
  animation: none !important;
  box-shadow: none !important;
}

span[class*="tag"]:hover,
.rounded-full:hover {
  transform: none !important;
  box-shadow: none !important;
}

/* 移除标签弹性动画 */
.rounded-full {
  animation: none;
}

/* 修改目行的悬浮效果 */
.project-row {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity, filter;
}

/* 只在非活动状态下显示悬浮效果 */
.project-row:not(.hover\:translate-x-0):hover {
  transform: translateX(8px);
}

/* 禁用状态下移除所有交互效果 */
.hover\:translate-x-0 {
  transform: none !important;
  transition: none !important;
  cursor: default !important;
}

/* 添加滚动条隐藏样式 */
.scrollbar-none {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.scrollbar-none::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* 移除顶部栏目的加载动画 */
.flex-none {
  animation: none !important;
}

.flex-none * {
  animation: none !important;
}

/* 自定义滚动条样式 */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #000000 transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #000000;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: #222222;
}

/* 统一过渡动画时间 */
.transition-all {
  transition-duration: 300ms !important;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
}

/* 移除头部标题的动画 */
.flex-none h1,
.flex-none h2 {
  transition: none !important;
  transform: none !important;
}

.flex-none h1:hover,
.flex-none h2:hover {
  transform: none !important;
}

/* 移除顶部栏目的加载动画 */
.flex-none {
  animation: none !important;
}

.flex-none * {
  animation: none !important;
}
</style>