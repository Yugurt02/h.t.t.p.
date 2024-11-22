<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const forums = ref([
  {
    id: 1,
    title: 'Task1',
    description: 'Complete self-introduction without revealing actual location',
    topics: 4,
    posts: 10,
    route: '/forum/post1',
    lastPost: {
      author: 'Jon Greene',
      avatar: '/avatars/jon.jpg',
      time: '1 month, 2 weeks ago'
    }
  },
  {
    id: 2,
    title: 'Task2',
    description: 'Icebreaking',
    topics: 3,
    posts: 9,
    route: '/forum/post2',
    lastPost: {
      author: 'Jill Smith',
      avatar: '/avatars/jill.jpg',
      time: '1 month, 3 weeks ago'
    }
  },
  {
    id: 3,
    title: 'Photography',
    description: 'Share your photos, discuss techniques, and get inspired by fellow photographers.',
    topics: 3,
    posts: 8,
    route: '/forum/post3',
    lastPost: {
      author: 'Walter Lewis',
      avatar: '/avatars/walter.jpg',
      time: '1 month, 2 weeks ago'
    }
  }
]);

const navigateToForum = (route) => {
  router.push(route);
};

const startNewDiscussion = () => {
  router.push('/forum/new');
};
</script>

<template>
  <div class="min-h-screen bg-[#F1F1F1] text-black p-4 sm:p-8">
    <!-- Hero Section -->
    <div class="max-w-[2000px] mx-auto">
      <h1 class="text-[12vw] font-black leading-[0.8] tracking-tight mb-8">
        Forum
        <span class="block text-[6vw]">Discussion Space</span>
      </h1>
    </div>

    <!-- Forums List -->
    <div class="container mx-auto px-4 py-16">
      <!-- Headers -->
      <div class="grid grid-cols-12 gap-4 mb-8 text-sm uppercase tracking-widest font-bold text-gray-500">
        <div class="col-span-6">Forum</div>
        <div class="col-span-2 text-center">Topics</div>
        <div class="col-span-2 text-center">Posts</div>
        <div class="col-span-2 text-center">Latest</div>
      </div>

      <!-- Forum Items -->
      <div class="space-y-6">
        <div
            v-for="forum in forums"
            :key="forum.id"
            class="group grid grid-cols-12 gap-4 p-8 bg-white hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
            @click="navigateToForum(forum.route)"
        >
          <div class="col-span-6">
            <h3 class="text-4xl font-black mb-2">{{ forum.title }}</h3>
            <p class="text-gray-500 group-hover:text-gray-300">{{ forum.description }}</p>
          </div>

          <div class="col-span-2 flex items-center justify-center">
            <span class="text-5xl font-black">{{ forum.topics }}</span>
          </div>

          <div class="col-span-2 flex items-center justify-center">
            <span class="text-5xl font-black">{{ forum.posts }}</span>
          </div>

          <div class="col-span-2">
            <div class="flex items-center space-x-3">
              <el-avatar :src="forum.lastPost.avatar" :size="50" />
              <div>
                <div class="font-bold">{{ forum.lastPost.author }}</div>
                <div class="text-sm text-gray-500 group-hover:text-gray-300">
                  {{ forum.lastPost.time }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Action -->

  </div>
</template>

<style scoped>
.el-input :deep(.el-input__wrapper) {
  background: transparent;
  box-shadow: none !important;
}

.el-input :deep(.el-input__inner) {
  color: white;
  font-size: 1.25rem;
  height: 4rem;
  padding-left: 2rem;
}

.el-input :deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.7);
}
</style>