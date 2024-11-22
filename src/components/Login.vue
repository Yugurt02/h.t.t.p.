<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeStep = ref(1)
const totalSteps = 3

const form = reactive({
  name: '',
  email: '',
  age: '',
  hometown: '',
  current_residence: '',
  occupation: '',
  education: '',
  frequency: '',
  ip_attitude: '',
  ip_argument: '',
  platforms: [],
  online_time: '',
  topics: []
})

const educationOptions = ['研究生', '本科', '大专', '高中', '其他']
const frequencyOptions = ['每周几次', '每月几次', '很少发言', '只看不说']
const ipAttitudeOptions = ['非常支持', '比较支持', '无所谓', '不太支持', '非常反对']
const ipArgumentOptions = ['是，多次', '是，偶尔', '否，从未有过', '不确定']
const platformOptions = ['微博', '知乎', '抖音', '小红书', '豆瓣', '微信朋友圈', 'B站', '其他']
const onlineTimeOptions = ['1-3小时', '4-6小时', '7-9小时', '10小时以上']
const topicOptions = ['社会热点', '文化娱乐', '教育', '时政', '科技', '生活方式', '其他']

const nextStep = () => {
  if (activeStep.value < totalSteps) {
    activeStep.value++
  }
}

const prevStep = () => {
  if (activeStep.value > 1) {
    activeStep.value--
  }
}

const onSubmit = () => {
  console.log('表单数据:', form)
  router.push('/forum')
}
</script>

<template>
  <div class="min-h-screen bg-[#F1F1F1] text-black">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
      <!-- Header -->
      <div class="py-8 sm:py-12">
        <h1 class="text-[12vw] sm:text-[10vw] md:text-[8vw] font-black leading-[0.8] tracking-tight mb-8">
          Part0:
          <span class="block text-[6vw] sm:text-[5vw] md:text-[4vw]">Survey Form</span>
        </h1>

        <!-- Progress Steps -->
        <div class="flex items-center space-x-2 sm:space-x-4 my-auto">
          <div
              v-for="step in totalSteps"
              :key="step"
              class="flex items-center"
          >
            <div
                class="w-8 h-8 sm:w-10 sm:h-10 rounded-full font-bold flex items-center justify-center text-base sm:text-lg transition-colors duration-300"
                :class="step === activeStep ?
                'bg-black text-white' :
                'bg-white text-black'"
            >
              {{ step }}
            </div>
            <div
                v-if="step < totalSteps"
                class="w-16 sm:w-24 h-0.5 mx-2 bg-gray-200"
            ></div>
          </div>
        </div>
      </div>

      <!-- Form Content -->
      <div class="bg-white rounded-xl shadow-sm min-h-[500px] flex flex-col m-4 mb-12">
        <div class="flex-grow p-6 flex flex-col">
          <!-- Step 1: Basic Info -->
          <div v-show="activeStep === 1" class="flex-grow flex flex-col">
            <h2 class="flex items-baseline gap-4 mb-6">
              <span class="text-6xl font-black">01</span>
              <span class="text-5xl font-black">Basic Info</span>
            </h2>

            <div class="flex-grow flex items-center">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 w-full max-w-4xl mx-auto">
                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-1">姓名 | Name</label>
                  <el-input
                      v-model="form.name"
                      class="custom-input !w-full"
                      placeholder="Your name"
                  />
                </div>

                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-1">邮箱 | Email</label>
                  <el-input
                      v-model="form.email"
                      class="custom-input !w-full"
                      placeholder="example@mail.com"
                  />
                </div>

                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-1">年龄 | Age</label>
                  <el-input
                      v-model="form.age"
                      class="custom-input !w-full"
                      placeholder="Your age"
                  />
                </div>

                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-1">籍贯 | Hometown</label>
                  <el-input
                      v-model="form.hometown"
                      class="custom-input !w-full"
                      placeholder="Your hometown"
                  />
                </div>

                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-1">现居地 | Current Location</label>
                  <el-input
                      v-model="form.current_residence"
                      class="custom-input !w-full"
                      disabled
                  />
                </div>

                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-1">教育程度 | Education</label>
                  <el-select
                      v-model="form.education"
                      class="custom-input !w-full"
                      placeholder="Select education level"
                  >
                    <el-option
                        v-for="option in educationOptions"
                        :key="option"
                        :label="option"
                        :value="option"
                    />
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Digital Life -->
          <div v-show="activeStep === 2" class="flex-grow flex flex-col">
            <h2 class="flex items-baseline gap-4 mb-12">
              <span class="text-6xl font-black">02</span>
              <span class="text-5xl font-black">Digital Life</span>
            </h2>
            <div class="flex-grow flex items-center">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 w-full max-w-4xl mx-auto">
                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-1">上网时间 | Online Time</label>
                  <el-select
                      v-model="form.online_time"
                      class="custom-input !w-full"
                      placeholder="选择上网时长"
                  >
                    <el-option
                        v-for="option in onlineTimeOptions"
                        :key="option"
                        :label="option"
                        :value="option"
                    />
                  </el-select>
                </div>

                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-1">发言频率 | Post Frequency</label>
                  <el-select
                      v-model="form.frequency"
                      class="custom-input !w-full"
                      placeholder="选择发言频率"
                  >
                    <el-option
                        v-for="option in frequencyOptions"
                        :key="option"
                        :label="option"
                        :value="option"
                    />
                  </el-select>
                </div>

                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-1">IP属地态度 | IP Location View</label>
                  <el-select
                      v-model="form.ip_attitude"
                      class="custom-input !w-full"
                      placeholder="选择您的态度"
                  >
                    <el-option
                        v-for="option in ipAttitudeOptions"
                        :key="option"
                        :label="option"
                        :value="option"
                    />
                  </el-select>
                </div>

                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-1">IP争议经历 | IP Argument</label>
                  <el-select
                      v-model="form.ip_argument"
                      class="custom-input !w-full"
                      placeholder="选择您的经历"
                  >
                    <el-option
                        v-for="option in ipArgumentOptions"
                        :key="option"
                        :label="option"
                        :value="option"
                    />
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Interests -->
          <div v-show="activeStep === 3" class="flex-grow flex flex-col">
            <h2 class="flex items-baseline gap-4 mb-12">
              <span class="text-6xl font-black">03</span>
              <span class="text-5xl font-black">Interests</span>
            </h2>
            <div class="flex-grow flex items-center">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 w-full max-w-4xl mx-auto">
                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-1">社交平台 | Platforms</label>
                  <el-select
                      v-model="form.platforms"
                      class="custom-input !w-full"
                      multiple
                      collapse-tags
                      collapse-tags-tooltip
                      placeholder="选择您使用的平台"
                  >
                    <el-option
                        v-for="option in platformOptions"
                        :key="option"
                        :label="option"
                        :value="option"
                    />
                  </el-select>
                </div>

                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-1">关注话题 | Topics</label>
                  <el-select
                      v-model="form.topics"
                      class="custom-input !w-full"
                      multiple
                      collapse-tags
                      collapse-tags-tooltip
                      placeholder="选择您感兴趣的话题"
                  >
                    <el-option
                        v-for="option in topicOptions"
                        :key="option"
                        :label="option"
                        :value="option"
                    />
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="border-t border-gray-100 pt-6 mt-6 flex justify-end">
            <el-button
                v-if="activeStep > 1"
                @click="prevStep"
                class="!mr-4 !px-6 !h-10 !text-base !font-bold !rounded-full !border-2 !border-black !bg-transparent !text-black hover:!bg-black hover:!text-white"
            >
              上一步
            </el-button>

            <el-button
                v-if="activeStep < totalSteps"
                @click="nextStep"
                class="!px-6 !h-10 !text-base !font-bold !rounded-full !bg-black !text-white hover:!bg-gray-800"
            >
              下一步
            </el-button>

            <el-button
                v-else
                @click="onSubmit"
                class="!px-6 !h-10 !text-base !font-bold !rounded-full !bg-black !text-white hover:!bg-gray-800"
            >
              提交
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}


@media (min-width: 640px) {
  .container {
    max-width: 90%;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 85%;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1400px;
  }
}

.custom-input :deep(.el-input__wrapper),
.custom-input :deep(.el-select__wrapper) {
  @apply bg-white border border-gray-200 shadow-none rounded-lg transition-colors duration-300;
  height: 44px;
}

.custom-input :deep(.el-input__wrapper:hover),
.custom-input :deep(.el-input__wrapper.is-focus) {
  @apply border-gray-400;
}

:deep(.el-select .el-select__tags .el-tag--info) {
  @apply bg-black text-white border-black;
}
</style>