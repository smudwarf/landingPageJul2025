<template>
  <div
    v-if="showIntro"
    ref="introScreen"
    class="fixed inset-0 z-20 flex items-center justify-center px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-700 to-gray-900 opacity-0"
  >
    <div class="text-center max-w-4xl mx-auto">
      <h1
        class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white drop-shadow-2xl mb-6 sm:mb-8 md:mb-10"
      >
        Glædeligt Jul!
      </h1>
      <button
        @click="videre"
        class="mt-4 sm:mt-6 md:mt-8 bg-white hover:bg-gray-100 text-gray-800 font-bold text-lg sm:text-xl md:text-2xl py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-10 rounded-lg transition-colors shadow-xl"
      >
        pil
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { gsap } from "gsap";

const showIntro = ref(true);
const introScreen = ref<HTMLElement | null>(null);

onMounted(async () => {
  await nextTick();

  // Fade in intro screen
  if (introScreen.value) {
    gsap.to(introScreen.value, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  }
});

function videre() {
  // Fade out til intro
  if (introScreen.value) {
    gsap.to(introScreen.value, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        showIntro.value = false;
      },
    });
  }
}
</script>
