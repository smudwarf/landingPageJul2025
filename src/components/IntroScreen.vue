<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { gsap } from "gsap";
import FadeParticle from "./fadeParticle.vue";
import Logo from "./logo.vue";

const emit = defineEmits<{
  (e: "start-game"): void;
}>();

const introScreen = ref<HTMLElement | null>(null);
const box = ref<HTMLElement | null>(null);
const logoShouldAnimate = ref(false);

onMounted(async () => {
  await nextTick();

  // Fade in intro screen AFTER particles and logo (delay by 2.5 seconds)
  if (introScreen.value) {
    gsap.to(introScreen.value, {
      opacity: 1,
      duration: 1.0,
      delay: 2.5, // Wait for particles and logo to finish their animation
      ease: "power2.out",
    });
  }
});

function onBottleHover() {
  if (box.value) {
    gsap.to(box.value, {
      y: -10,
      scale: 1.08,
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

// Simplified bottle click - same as moveBottleUp
function moveBottleUp() {
  if (box.value) {
    // Move bottle upwards and then start the game
    gsap.to(box.value, {
      bottom: "50%",
      y: "50%",
      scale: 0.8,
      duration: 1.0,
      ease: "power2.out",
      onComplete: () => {
        start();
      },
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

const triggerLogo = () => {
  logoShouldAnimate.value = true;
};
</script>

<template>
  <div class="intro-screen relative">
    <!-- FadeParticle component with particles -->
    <FadeParticle @particles-ready="triggerLogo" />

    <!-- Main content screen -->
    <div
      ref="introScreen"
      class="fixed inset-0 z-20 flex items-center justify-center px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-700 to-gray-900 opacity-0"
    >
      <div class="text-center max-w-4xl mx-auto relative">
        <!-- Logo positioned above title -->
        <div class="absolute inset-x-0 -top-16 sm:-top-20 md:-top-24 lg:-top-28 xl:-top-32 z-30">
          <Logo :should-animate="logoShouldAnimate" />
        </div>

        <h1
          class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white drop-shadow-2xl mb-6 sm:mb-8 md:mb-10"
        >
          Glædelig Jul!
        </h1>
        <p class="text-white pl-5 pr-5">
          Julen nærmer sig, og vi vil gerne benytte lejligheden til at sige
          tusind tak for et godt samarbejde i året, der er gået. Vi sætter stor
          pris på den tillid og støtte, I har vist os, og vi glæder os til at
          fortsætte samarbejdet i det nye år.
        </p>

        <div>
          <p class="text-white font-bold">se mere</p>
          <button
            @click="moveBottleUp"
            class="mt-4 sm:mt-6 md:mt-8 text-gray-800 font-bold text-lg sm:text-xl md:text-2xl py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-10 rounded-lg transition-colors flex items-center justify-center mx-auto"
          >
            <img
              src="/images/arrow_down.svg"
              alt="Arrow Up"
              class="mt-10 w-10 h-10 sm:w-10 sm:h-10 md:w-20 md:h-20"
            />
          </button>
        </div>
        <div
          ref="box"
          id="spinBottle"
class="absolute bottom-[-460px] sm:bottom-[-920px] md:bottom-[-930px] lg:bottom-[-900px] xl:bottom-[-920px] left-1/2 -translate-x-1/2 z-10 w-80 h-80 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-[50rem] xl:h-[50rem] cursor-pointer flex items-center justify-center"          @mouseenter="onBottleHover"
          @mouseleave="onBottleLeave"
          @click="moveBottleUp"
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
  </div>
</template>
