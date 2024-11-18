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
  <div class="min-h-screen bg-[#F1F1F1] text-black p-4 sm:p-8">
    <div class="max-w-[1900px] mx-auto">
      <!-- Main Title -->
      <h1 class="text-[12vw] font-bold tracking-tight leading-[0.5] mb-16">
        <span class="block">Hidden</span>
        <span class="block">Tensions</span>
        <span class="block">Transparent</span>
        <span class="block">Prejudice</span>
      </h1>

      <div class="grid grid-cols-12 gap-4 mb-24">
        <!-- Left Column -->
        <div class="col-span-4">
          <div class="space-y-6">
            <div class="space-y-0.25">
              <p class="text-sm font-black">项目简介 | Project Overview</p>
              <p class="text-xs">在中文互联网独特的IP属地显示机制下，我们观察到：当IP属地成为用户身份的一部分时，人们的交流方式发生了微妙的改变。H.T.T.P.工作坊旨在探索这种变化，揭示IP属地标签如何影响我们的在线交流和认知偏差。</p>
              <p class="text-xs">In the Chinese internet's unique IP location display mechanism, we observe an intriguing phenomenon: when IP location becomes part of user identity, people's communication patterns subtly change. The H.T.T.P. workshop aims to explore this transformation, revealing how IP location labels influence our online communication and cognitive biases.</p>
            </div>

            <div class="space-y-0.25">
              <p class="text-sm font-black">起因 | Origin</p>
              <p class="text-xs">2022年6月，中国开始实施IP属地显示政策。这项旨在提高网络透明度的措施，却意外地强化了地域标签，加深了某些刻板印象。我们的工作坊从这一现象出发，试图理解虚拟空间中的身份认知与偏见形成机制。</p>
              <p class="text-xs">In June 2022, China implemented IP location display policy. While intended to enhance online transparency, this measure unexpectedly reinforced regional labels and deepened certain stereotypes. Our workshop starts from this phenomenon, attempting to understand identity cognition and bias formation mechanisms in virtual spaces.</p>
            </div>
          </div>


        </div>

        <!-- Right Column -->
        <div class="col-span-8 flex justify-end">
          <div class="space-y-0.5 ">
            <p class="text-sm font-black mb-2">核心议题 | Core Issues:</p>
            <h2 class="text-4xl font-black">Identity and Labels</h2>
            <h2 class="text-4xl font-black">Formation of Prejudices</h2>
            <h2 class="text-4xl font-black">Evolution of Interaction</h2>
            <h2 class="text-4xl font-black">Stereotypes in Cyberspace</h2>
              <div class="space-y-2">
                <el-button
                    class="mt-12 rounded-full border border-black bg-transparent text-black hover:bg-black hover:text-white px-8 py-6"
                    @click="toPost"
                >
                  <p class="text-base font-black">ENTER WORKSHOP</p>
                </el-button>

              </div>

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
        <p class="text-xs">Made with Shit</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
</style>
