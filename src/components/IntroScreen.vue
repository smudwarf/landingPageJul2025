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
const seeMoreButton = ref<HTMLElement | null>(null);
const logoShouldAnimate = ref(false);

onMounted(async () => {
  await nextTick();

  // Fade in intro screen AFTER particles and logo (delay by 4.5 seconds)
  if (introScreen.value) {
    gsap.to(introScreen.value, {
      opacity: 1,
      duration: 1.0,
      delay: 4.5,
      ease: "power2.out",
    });
  }
});

// Button hover animations
function onButtonHover() {
  if (seeMoreButton.value) {
    gsap.to(seeMoreButton.value, {
      y: -5,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  }
}

function onButtonLeave() {
  if (seeMoreButton.value) {
    gsap.to(seeMoreButton.value, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }
}
//-------------------------
// Bottle hover animations
//-------------------------

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


function moveBottleUp() {
  if (box.value) {

    //-------------------------
    // Move bottle upwards
    //-------------------------

    gsap.to(box.value, {
      bottom: "20%",
      y: "20%",
      duration: 1.0,
      ease: "power2.out",
      onComplete: () => {
        start();
      },
    });
  }
}

function start() {

   //-------------------- 
  // Fade out til introscreen
  //--------------------

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

    <!------------------------------------------->
    <!-- FadeParticle component with particles -->
    <!------------------------------------------->

    <FadeParticle @particles-ready="triggerLogo" />

    <!-- Main content screen -->
    <div
      ref="introScreen"
      class="fixed inset-0 z-20 flex items-center justify-center px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-700 to-gray-900 opacity-0"
    >
      <div class="text-center max-w-4xl xl:max-w-7xl mx-auto relative">
        
        <!--------------------------------->
        <!-- Logo positioned above title -->
       <!--------------------------------->

        <div
          class="absolute inset-x-0 -top-16 sm:-top-20 md:-top-24 lg:-top-28 xl:-top-32 z-30"
        >
          <Logo :should-animate="logoShouldAnimate" />
        </div>

        <h1
          class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-white drop-shadow-2xl mb-8 sm:mb-15 md:mb-10"
        >
          Glædelig Jul!
        </h1>
        <p
          class="text-white text-xl sm:text-xl md:text-1xl lg:text-3xl xl:text-6xl mb-20 sm:mb-32 md:mb-40 lg:mb-48 xl:mb-56"
        >
          Julen nærmer sig, og vi vil gerne benytte lejligheden til at sige
          tusind tak for et godt samarbejde i året, der er gået. Vi sætter stor
          pris på den tillid og støtte, I har vist os, og vi glæder os til at
          fortsætte samarbejdet i det nye år.
        </p>

        <div>
          <button
            ref="seeMoreButton"
            @click="moveBottleUp"
            @mouseenter="onButtonHover"
            @mouseleave="onButtonLeave"
            class="flex flex-col items-center justify-center mx-auto rounded-lg transition-colors mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24 cursor-pointer"
          >
            <p class="text-white font-bold text-lg sm:text-xl md:text-2xl mb-2">
              se mere
            </p>
            <img
              src="/images/arrow_down.svg"
              alt="Arrow Down"
              class="w-10 h-10 sm:w-10 sm:h-10 md:w-20 md:h-20"
            />
          </button>
        </div>
        <div
          ref="box"
          id="spinBottle"
          class="absolute bottom-[-360px] sm:bottom-[-720px] md:bottom-[-730px] lg:bottom-[-700px] xl:bottom-[-640px] left-1/2 -translate-x-1/2 z-10 w-80 h-80 sm:w-48 sm:h-48 md:w-100 md:h-100 lg:w-150 lg:h-150 xl:w-[40rem] xl:h-[40rem] cursor-pointer flex items-center justify-center"
          @mouseenter="onBottleHover"
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
