<script lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { gsap } from "gsap";

export default {
  setup() {
    const introScreen = ref(null);
    const logo = ref(null);

    onMounted(async () => {
      await nextTick();

      // Set initial states
      const particles = document.querySelectorAll(".particle");

      // Set particles initial state (invisible)
      particles.forEach((particle) => {
        gsap.set(particle, {
          y: -700,
          x: Math.random() * (window.innerWidth + 1600) - 800, // bredde + offset
          opacity: 0,
        });
      });

      // Set logo initial state
      if (logo.value) {
        gsap.set(logo.value, {
          opacity: 0,
          scale: 0.8,
          y: -50,
        });
      }

      // Coordinated fade-in animation
      const tl = gsap.timeline();

      // Fade in intro screen
      if (introScreen.value) {
        tl.to(introScreen.value, {
          opacity: 1,
          duration: 1.8,
          ease: "power2.out",
        });
      }

      // Fade in logo with intro screen (slightly delayed)
      if (logo.value) {
        tl.to(
          logo.value,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.5,
            ease: "back.out(1.7)",
          },
          "-=3.0"
        ); // Start 1 second before intro screen finishes
      }

      // Fade in particles with staggered effect
      particles.forEach((particle, index) => {
        tl.to(
          particle,
          {
            opacity: Math.random() * 0.8 + 0.2,
            duration: 0.8,
            ease: "power2.out",
          },
          `-=${1.2 - index * 0.02}`
        ); // Stagger the particle fade-ins

        // Start falling animation after fade-in
        gsap.to(particle, {
          y: window.innerHeight + 100,
          rotation: Math.random() * 360,
          duration: Math.random() * 4 + 3, // Slower fall for better visibility
          repeat: -1,
          delay: Math.random() * 2, // Stagger the start times more
          ease: "none",
          onRepeat: () => {
            // Reset to new random position at top when repeating
            gsap.set(particle, {
              x: Math.random() * (window.innerWidth + 300) - 100,
              y: -100,
            });
          },
        });
      });
    });

    return {
      introScreen,
      logo,
    };
  },
};
</script>

<template>
  <!-- Particle and logo background layer -->
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

    <!-- Logo -->
    <div
      ref="logo"
      class="absolute inset-0 flex items-center justify-center z-10"
    >
      <img
        src="/images/logo.svg"
        alt="Logo"
        class="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64"
      />
    </div>
  </div>
</template>

<style scoped>
.particle {
  will-change: transform;
}
</style>
