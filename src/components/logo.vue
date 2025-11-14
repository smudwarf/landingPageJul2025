<template>
  <div
    ref="logoContainer"
    class="absolute inset-0 flex items-center justify-center"
  >
    <div class="flex flex-col items-center justify-center text-center">
      <!-- Logo positioned above the title -->
      <img
        ref="logoImg"
        src="/images/logo.svg"
        alt="Logo"
        class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-50 xl:h-50 opacity-0 mb-20 sm:mb-6 md:mb-70"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import { gsap } from "gsap";

const props = defineProps<{
  shouldAnimate?: boolean;
}>();

const logoContainer = ref<HTMLElement | null>(null);
const logoImg = ref<HTMLElement | null>(null);

const animateLogo = () => {
  if (logoImg.value) {
    // First animate logo falling from top with fade in
    gsap.fromTo(
      logoImg.value,
      {
        y: -window.innerHeight - 200, // Start from above screen
        x: Math.random() * 200 - 100, // Random horizontal starting position
        opacity: 0,
        scale: 0.5,
        rotation: Math.random() * 360,
      },
      {
        y: 0, // End at center position
        x: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 2.0,
        ease: "power2.out",
        onComplete: () => {
         
        },
      }
    );
  }
};

onMounted(async () => {
  await nextTick();

  // Set logo initial state (off-screen)
  if (logoImg.value) {
    gsap.set(logoImg.value, {
      y: -window.innerHeight - 100,
      x: Math.random() * 200 - 100,
      opacity: 0,
      scale: 0.5,
      rotation: Math.random() * 360,
    });
  }
});

// Watch for animation trigger
watch(
  () => props.shouldAnimate,
  (newVal) => {
    if (newVal) {
      animateLogo();
    }
  }
);
</script>
