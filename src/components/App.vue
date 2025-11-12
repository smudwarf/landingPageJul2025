<template>
  <div class="overflow-hidden h-screen">
    <IntroScreen v-if="showIntro" @start-game="hideIntro" />
    <SpinTheBottle v-if="!showIntro" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IntroScreen from '../components/introScreen.vue';
import SpinTheBottle from '../components/spinTheBottle.vue';

const showIntro = ref(true);
function hideIntro() {
  showIntro.value = false;
}
</script>
