<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

const box = ref<HTMLElement | null>(null);
const messageBox = ref<HTMLElement | null>(null);
const message = ref<string>("");
const showMessage = ref(false);

const messages: Record<number, string> = {
  1: "DU har vundet 1",
  2: "Du har vundet 2",
  3: "Du har vundet 3",
  4: "Du har vundet 4",
  5: "Du har vundet 5!",
  6: "Du har vundet 6!",
  7: "Du har vundet 7!",
  8: "Du har vundet 8!",
};

async function handlePoint(point: number) {
  message.value = messages[point];
  showMessage.value = true;

  // Vent til DOM er opdateret
  await nextTick();

  // Animate besked box ind
  if (messageBox.value) {
    gsap.to(messageBox.value, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    const innerDiv = messageBox.value.querySelector("div");
    if (innerDiv) {
      gsap.to(innerDiv, {
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
        delay: 0.1,
      });
    }
  }
}

function closeMessage() {
  if (messageBox.value) {
    gsap.to(messageBox.value, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        showMessage.value = false;
      },
    });
  }
}

onMounted(() => {
  if (box.value) {
    Draggable.create("#spinBottle", {
      type: "rotation",
      inertia: true,
      snap: function (value: number) {
        return Math.round(value / 60) * 60;
      },
      onThrowComplete: function () {
        const rotation = this.rotation;
        const normalizedRotation = ((rotation % 360) + 360) % 360;
        const point = Math.round(normalizedRotation / 60) % 6 || 6;
        handlePoint(point);
      },
    });
  }
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div
      class="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl aspect-square"
    >
     

      <div class="absolute inset-0 w-full h-full">
        <!---------------------------->
        <!--........Prikker........ -->
        <!---------------------------->
        <div
          v-for="i in 6"
          :key="i"
          :style="{
            transform: `rotate(${i * 60}deg) translateY(min(-10vw, -120px))`,
            position: 'absolute',
            left: '50%',
            top: '50%',
            transformOrigin: 'center',
          }"
          class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-gray-600 rounded-full -translate-x-1/2 -translate-y-1/2"
        ></div>
        
      </div>
 <!-- Circle SVG Background -->
      <div
        class="absolute inset-0 w-full h-full flex items-center justify-center"
      >
        <img
          src="public/images/circle.svg"
          alt="Circle Background"
          class="w-full h-full object-contain"
          @error="console.log('Circle SVG failed to load')"
        />
      </div>
      <!---------------------------->
      <!-- spin flaske container -->
      <!---------------------------->
      <div
        ref="box"
        id="spinBottle"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 cursor-grab active:cursor-grabbing flex items-center justify-center"
      >
        <img
          src="/images/spin-bottle.png"
          alt="Spin the Bottle"
          class="w-full h-full object-contain"
          @error="console.log('Bottle image failed to load')"
        />
      </div>
    </div>

    <!-- Fullscreen besked box med fade in animation -->
    <div
      v-if="showMessage"
      ref="messageBox"
      class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md backdrop-brightness-50 opacity-0 p-4"
    >
      <div
        class="w-full h-full flex items-center justify-center px-4 sm:px-6 md:px-8"
      >
        <div class="text-center max-w-4xl">
          <p
            class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white drop-shadow-2xl mb-6 sm:mb-8 md:mb-10"
          >
            {{ message }}
          </p>
          <button
            @click="closeMessage"
            class="mt-6 sm:mt-8 md:mt-12 bg-white hover:bg-gray-100 text-gray-800 font-bold text-lg sm:text-xl md:text-2xl py-4 px-8 sm:py-5 sm:px-10 md:py-6 md:px-12 rounded-lg transition-colors shadow-xl"
          >
            Igen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
