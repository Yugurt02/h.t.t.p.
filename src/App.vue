<script lang="ts" setup>
import {useRouter} from "vue-router";

const router = useRouter();

const toPost = () => {
  router.push("/post")
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>h.t.t.p.</el-header>
      <el-main>
        <h1>Hidden Tensions, Transparent Prejudice</h1>
        <router-view/>
        <el-button type="primary" round @click="toPost">Primary</el-button>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style scoped>
</style>
