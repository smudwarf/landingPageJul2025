<script setup lang="ts">
import { ref } from "vue";
import IntroScene from "./IntroScene.vue";
import SpinScene from "./SpinScene.vue";
import Circle from "./circle.vue";
// import Pie from "./pie.vue";

const introComplete = ref(true);
</script>
<template>
  <!-- <IntroScene @complete="introComplete = true" v-if="!introComplete" />-->
  <SpinScene v-if="introComplete" />
  <Circle v-if="introComplete" />
  <!--<spinner v-if="!introComplete" />-->
  <!-- <Pie /> -->
</template>
<style scoped></style>
