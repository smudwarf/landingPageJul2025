<template>
  <div></div>

  <!-- gradient retning: bund til højre  -->
  <div
    ref="introScreen"
    class="fixed inset-0 z-20 flex items-center justify-center px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-700 to-gray-900 opacity-0"
  >
    <div class="text-center max-w-4xl mx-auto">
      <h1
        class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white drop-shadow-2xl mb-6 sm:mb-8 md:mb-10"
      >
        Glædelig Jul!
      </h1>
      <button
        @click="start"
        class="mt-4 sm:mt-6 md:mt-8 bg-white hover:bg-gray-100 text-gray-800 font-bold text-lg sm:text-xl md:text-2xl py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-10 rounded-lg transition-colors shadow-xl"
      >
        pil
      </button>

      <!---picture intro screen -->
      <div
        ref="box"
        id="spinBottle"
        class="absolute bottom-10 sm:bottom-16 md:bottom-20 lg:bottom-24 left-1/2 -translate-x-1/2 z-10 w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 cursor-grab active:cursor-grabbing flex items-center justify-center"
        @mouseenter="onBottleHover"
        @mouseleave="onBottleLeave"
        @click="onBottleClick"
      >
        <img
          src="/images/spin-bottle.png"
          alt="Spin the Bottle"
          class="w-full h-full object-contain"
          @error="console.log('Bottle image failed to load')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { gsap } from "gsap";

const emit = defineEmits<{
  (e: "start-game"): void;
}>();

const introScreen = ref<HTMLElement | null>(null);
const box = ref<HTMLElement | null>(null);

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
function onBottleHover() {
  if (box.value) {
    gsap.to(box.value, {
      y: -10,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  }
}

function onBottleLeave() {
  if (box.value) {
    gsap.to(box.value, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }
}

function onBottleClick() {
  if (box.value) {
    // Animate bottle to center of screen
    gsap.to(box.value, {
      bottom: "50%",
      y: "50%",
      scale: .6,
      duration: 0.8,
      ease: "power2.out",
    });
  }
}

function start() {
  // Fade out intro screen
  if (introScreen.value) {
    gsap.to(introScreen.value, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        emit("start-game");
      },
    });
  }
}
</script>
