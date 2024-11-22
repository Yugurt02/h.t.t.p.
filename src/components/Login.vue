<script setup>
import {useRouter} from "vue-router";
import {reactive, onMounted, ref} from 'vue';

const router = useRouter();
const activeSection = ref('basic') // basic, online, interests

const toForum = () => {
  router.push("/forum");
};

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
});

const sections = {
  basic: {
    title: 'Basic Info',
    subtitle: 'Tell us about yourself'
  },
  online: {
    title: 'Digital Life',
    subtitle: 'Your online behavior'
  },
  interests: {
    title: 'Interests',
    subtitle: 'What matters to you'
  }
}

const educationOptions = ['研究生', '本科', '大专', '高中', '其他'];
const frequencyOptions = ['每周几次', '每月几次', '很少发言', '只看不说'];
const ipAttitudeOptions = ['非常支持', '比较支持', '无所谓', '不太支持', '非常反对'];
const ipArgumentOptions = ['是，多次', '是，偶尔', '否，从未有过', '不确定'];
const platformOptions = ['微博', '知乎', '抖音', '小红书', '豆瓣', '微信朋友圈', 'B站', '其他'];
const onlineTimeOptions = ['1-3小时', '4-6小时', '7-9小时', '10小时以上'];
const topicOptions = ['社会热点', '文化娱乐', '教育', '时政', '科技', '生活方式', '其他'];

onMounted(async () => {
  form.current_residence = '系统自动检测的IP所属地';
});

const onSubmit = () => {
  console.log('提交的表单数据:', form);
};
</script>


<template>
  <div class="min-h-screen bg-[#F1F1F1] text-black">
    <!-- Header -->
    <div class="max-w-[2000px] w-full mx-auto p-4 sm:p-8">

        <h1 class="text-[15vw] font-black leading-[0.8] tracking-tighter mb-8">
          Part0:
          <span class="block text-[8vw]">Survey Form</span>
        </h1>

      <p class="text-xl text-gray-600 mb-16 max-w-[800px]">
        Help us understand your digital identity and preferences in the age of IP attribution.
      </p>
    </div>

    <!-- Form Section -->
    <div class="max-w-[1400px] mx-auto px-8 sm:px-16">
      <el-form
          :model="form"
          label-position="top"
          class="space-y-24"
      >
        <!-- Basic Info Section -->
        <div class="space-y-12">
          <h2 class="text-6xl font-black">01 Basic Info</h2>

          <div class="grid grid-cols-1 gap-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              <el-form-item label="Name" class="!mb-0">
                <el-input
                    v-model="form.name"
                    class="custom-input"
                    placeholder="Your name"
                />
              </el-form-item>

              <el-form-item label="Email" class="!mb-0">
                <el-input
                    v-model="form.email"
                    class="custom-input"
                    placeholder="example@mail.com"
                />
              </el-form-item>

              <el-form-item label="Age" class="!mb-0">
                <el-input
                    v-model="form.age"
                    class="custom-input"
                    placeholder="Your age"
                />
              </el-form-item>

              <el-form-item label="Hometown" class="!mb-0">
                <el-input
                    v-model="form.hometown"
                    class="custom-input"
                    placeholder="Your hometown"
                />
              </el-form-item>

              <el-form-item label="Current Location" class="!mb-0">
                <el-input
                    v-model="form.current_residence"
                    class="custom-input"
                    disabled
                />
              </el-form-item>

              <el-form-item label="Education" class="!mb-0">
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
              </el-form-item>
            </div>
          </div>
        </div>

        <!-- Digital Life Section -->
        <div class="space-y-12">
          <h2 class="text-6xl font-black">02 Digital Life</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            <el-form-item label="每日上网时间 | Online Time" class="!mb-0">
              <el-radio-group v-model="form.online_time" class="!grid !gap-4">
                <el-radio
                    v-for="option in onlineTimeOptions"
                    :key="option"
                    :label="option"
                    class="!bg-white/50 hover:!bg-white !transition-colors !duration-300 !p-4 !rounded-lg !border !border-gray-200 !w-full"
                >
                  {{ option }}
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="您在网上的发言频率｜Post Frequency" class="!mb-0">
              <el-radio-group v-model="form.frequency" class="!grid !gap-4">
                <el-radio
                    v-for="option in frequencyOptions"
                    :key="option"
                    :label="option"
                    class="!bg-white/50 hover:!bg-white !transition-colors !duration-300 !p-4 !rounded-lg !border !border-gray-200 !w-full"
                >
                  {{ option }}
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="对IP属地显示的态度｜IP Location View" class="!mb-0">
              <el-radio-group v-model="form.ip_attitude" class="!grid !gap-4">
                <el-radio
                    v-for="option in ipAttitudeOptions"
                    :key="option"
                    :label="option"
                    class="!bg-white/50 hover:!bg-white !transition-colors !duration-300 !p-4 !rounded-lg !border !border-gray-200 !w-full"
                >
                  {{ option }}
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="IP属地争议经历｜IP Argument" class="!mb-0">
              <el-radio-group v-model="form.ip_argument" class="!grid !gap-4">
                <el-radio
                    v-for="option in ipArgumentOptions"
                    :key="option"
                    :label="option"
                    class="!bg-white/50 hover:!bg-white !transition-colors !duration-300 !p-4 !rounded-lg !border !border-gray-200 !w-full"
                >
                  {{ option }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>

        <!-- Interests Section -->
        <div class="space-y-12">
          <h2 class="text-6xl font-black">03 Interests</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            <el-form-item label="社交平台｜Platforms" class="!mb-0">
              <el-checkbox-group v-model="form.platforms" class="!grid !gap-4">
                <el-checkbox
                    v-for="option in platformOptions"
                    :key="option"
                    :label="option"
                    class="!bg-white/50 hover:!bg-white !transition-colors !duration-300 !p-4 !rounded-lg !border !border-gray-200 !w-full"
                >
                  {{ option }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="关注话题｜Topics" class="!mb-0">
              <el-checkbox-group v-model="form.topics" class="!grid !gap-4">
                <el-checkbox
                    v-for="option in topicOptions"
                    :key="option"
                    :label="option"
                    class="!bg-white/50 hover:!bg-white !transition-colors !duration-300 !p-4 !rounded-lg !border !border-gray-200 !w-full"
                >
                  {{ option }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
        </div>

        <!-- Submit Section -->
        <div class="space-y-6 pb-16">
          <el-button
              type="primary"
              @click="onSubmit"
              class="!w-full !h-20 !text-2xl !font-black !rounded-full !bg-black !text-white hover:!bg-gray-800 !transition-colors !duration-300"
          >
            Submit Survey
          </el-button>

          <el-button
              @click="toForum"
              class="!w-full !h-20 !text-2xl !font-black !rounded-full !border-2 !border-black !bg-transparent !text-black hover:!bg-black hover:!text-white !transition-colors !duration-300"
          >
            Enter Discussion
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
/* 最小化的自定义样式 */
.custom-input :deep(.el-input__wrapper),
.custom-input :deep(.el-select__wrapper) {
  @apply bg-white/50 hover:bg-white border-2 border-gray-200 shadow-none rounded-lg transition-colors duration-300;
}

.custom-input :deep(.el-input__inner) {
  @apply text-black h-12;
}

:deep(.el-form-item__label) {
  @apply text-gray-700 text-lg font-semibold mb-2;
}

:deep(.el-radio__input.is-checked + .el-radio__label),
:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  @apply text-black;
}

:deep(.el-radio.is-checked .el-radio__inner),
:deep(.el-checkbox.is-checked .el-checkbox__inner) {
  @apply bg-black border-black;
}
</style>