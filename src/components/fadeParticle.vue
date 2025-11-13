<script lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { gsap } from "gsap";

export default {
  emits: ["intro-started", "particles-ready"],
  setup(props, { emit }) {
    const introScreen = ref(null);

    onMounted(async () => {
      await nextTick();

      // Create GSAP timeline
      const tl = gsap.timeline();

      // Fade in intro screen first
      if (introScreen.value) {
        tl.to(introScreen.value, {
          opacity: 1,
          duration: 1.8,
          ease: "power2.out",
          onStart: () => emit("intro-started"),
        });
      }

      // Set initial states
      const particles = document.querySelectorAll(".particle");

      // Set particles initial state (invisible)
      particles.forEach((particle) => {
        gsap.set(particle, {
          y: -700,
          x: Math.random() * (window.innerWidth + 1600) - 800,
          opacity: 0,
        });
      });

      // Fade in particles with staggered effect
      particles.forEach((particle, index) => {
        tl.to(
          particle,
          {
            opacity: Math.random() * 0.8 + 0.2,
            duration: 1.0,
            ease: "power2.out",
          },
          `-=${1.2 - index * 0.02}`
        );

        // Start falling animation after fade-in
        gsap.to(particle, {
          y: window.innerHeight + 100,
          rotation: Math.random() * 360,
          duration: Math.random() * 4 + 3,
          repeat: -1,
          delay: Math.random() * 2,
          ease: "none",
          onRepeat: () => {
            gsap.set(particle, {
              x: Math.random() * (window.innerWidth + 300) - 100,
              y: -100,
            });
          },
        });
      });

      // Emit when particles are ready for logo to animate
      setTimeout(() => {
        emit("particles-ready");
      }, 1000);
    });

    return {
      introScreen,
    };
  },
};
</script>

<template>
  <div
    ref="introScreen"
    class="fixed inset-0 z-10 flex items-center justify-center px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-700 to-gray-900 opacity-0 overflow-hidden"
  >
    <!-- Snow Particles -->
    <div
      v-for="i in 60"
      :key="i"
      class="particle absolute pointer-events-none opacity-0"
    >
      <div
        class="w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full opacity-70 shadow-lg"
      ></div>
    </div>

    <!-- Additional larger snowflakes -->
    <div
      v-for="i in 60"
      :key="`large-${i}`"
      class="particle absolute pointer-events-none opacity-0"
    >
      <div
        class="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full opacity-50 shadow-xl"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.particle {
  will-change: transform;
}
</style>
