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

      // Set particles initial state (invisible) - better coverage for XL screens
      particles.forEach((particle) => {
        gsap.set(particle, {
          y: -1500,
          x: Math.random() * (window.innerWidth + 4000) - 2000, // Wider spread for XL screens
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

        // Start falling animation after fade-in - faster on mobile
        const isMobile = window.innerWidth < 768;
        const fallDuration = isMobile
          ? Math.random() * 2 + 2.5 // 1.5-3.5s on mobile (faster)
          : Math.random() * 4 + 3; // 3-7s on desktop (original)

        gsap.to(particle, {
          y: window.innerHeight + 100,
          rotation: Math.random() * 360,
          duration: fallDuration,
          repeat: -1,
          delay: Math.random() * 2,
          ease: "none",
          onRepeat: () => {
            gsap.set(particle, {
              x: Math.random() * (window.innerWidth + 2400) - 1200, // Match wider spread
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
    <!-- Snow Particles - more particles for better mobile experience -->
    <div
      v-for="i in 500"
      :key="i"
      class="particle absolute pointer-events-none opacity-0"
    >
      <div
        class="w-1 h-1 sm:w-2 sm:h-2 md:w-2 md:h-2 lg:w-3 lg:h-3 xl:w-4 xl:h-4 bg-white rounded-full opacity-70 shadow-lg"
      ></div>
    </div>

    <!-- xl sne og mængde -->
    <div
      v-for="i in 700"
      :key="`large-${i}`"
      class="particle absolute pointer-events-none opacity-0"
    >
      <div
        class="w-2 h-2 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 bg-white rounded-full opacity-50 shadow-xl"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.particle {
  will-change: transform;
}
</style>
