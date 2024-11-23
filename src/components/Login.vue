<script setup>
import {onMounted, reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import api from './interface.js'
import {ElMessage} from "element-plus";

const router = useRouter()
const activeStep = ref(1)
const totalSteps = 3

const form = reactive({
  name: '',
  email: '',
  age: null,
  hometown: '',
  currentResidence: {},
  education: '',
  frequency: '',
  ipAttitude: '',
  ipArgument: '',
  platforms: [],
  onlineTime: '',
  topics: []
})

const hometownOptions = ref([])
const currentResidenceOptions = ref([])
const educationOptions = ref([])
const frequencyOptions = ref([])
const ipAttitudeOptions = ref([])
const ipArgumentOptions = ref([])
const platformOptions = ref([])
const onlineTimeOptions = ref([])
const topicOptions = ref([])

const getDict = async (code) => {
  const res = await api.getDict(code);
  let options = [];
  res.data.forEach(item => {
    options.push({
      label: item.value,
      value: item.code
    });
  });
  return options;
}

const setCurrentResidence = async () => {
  const res = await api.getRandomCurrentLocation();
  form.currentResidence = res.data.value;
  currentResidenceOptions.value = [
    {
      label: res.data.value,
      value: res.data.code
    }
  ]
}

const initOptions = async () => {
  hometownOptions.value = await getDict('user.hometown');
  educationOptions.value = await getDict('user.education');
  frequencyOptions.value = await getDict('user.frequency');
  ipAttitudeOptions.value = await getDict('user.ipAttitude');
  ipArgumentOptions.value = await getDict('user.ipArgument');
  platformOptions.value = await getDict('user.platform');
  onlineTimeOptions.value = await getDict('user.onlineTime');
  topicOptions.value = await getDict('user.topic');
}

const nextStep = () => {
  if (activeStep.value < totalSteps) {
    activeStep.value++;
  }
}

const prevStep = () => {
  if (activeStep.value > 1) {
    activeStep.value--;
  }
}

const onSubmit = async () => {
  form.currentResidence = currentResidenceOptions.value[0].value;
  const res = await api.register(form);
  if (res.code === 200) {
    ElMessage({
      message: res.msg,
      type: 'success',
    });
  }
  await router.push('/forum');
}

onMounted(() => {
  initOptions();
  setCurrentResidence();
})
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
                      type="number"
                      class="custom-input !w-full"
                      placeholder="Your age"
                  />
                </div>

                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-1">籍贯 | Hometown</label>
                  <el-select
                      v-model="form.hometown"
                      class="custom-input !w-full"
                      placeholder="Select hometown"
                  >
                    <el-option
                        v-for="option in hometownOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                    />
                  </el-select>
                </div>

                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-1">现居地 | Current Location</label>
                  <el-select
                      v-model="form.currentResidence"
                      class="custom-input !w-full"
                      placeholder="Select hometown"
                  >
                    <el-option
                        v-for="option in currentResidenceOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                    />
                  </el-select>
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
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
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
                      v-model="form.onlineTime"
                      class="custom-input !w-full"
                      placeholder="选择上网时长"
                  >
                    <el-option
                        v-for="option in onlineTimeOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
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
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                    />
                  </el-select>
                </div>

                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-1">IP属地态度 | IP Location View</label>
                  <el-select
                      v-model="form.ipAttitude"
                      class="custom-input !w-full"
                      placeholder="选择您的态度"
                  >
                    <el-option
                        v-for="option in ipAttitudeOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                    />
                  </el-select>
                </div>

                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-1">IP争议经历 | IP Argument</label>
                  <el-select
                      v-model="form.ipArgument"
                      class="custom-input !w-full"
                      placeholder="选择您的经历"
                  >
                    <el-option
                        v-for="option in ipArgumentOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
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
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
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
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
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