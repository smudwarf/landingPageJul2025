<script setup lang="ts">
import { ref } from "vue";
import IntroScene from "./IntroScene.vue";
import SpinScene from "./SpinScene.vue";

const introComplete = ref(false);
</script>
<template>
 <IntroScene @complete="introComplete = true" v-if="!introComplete" />
  <SpinScene v-if="introComplete" />
</template>
<style scoped></style>
