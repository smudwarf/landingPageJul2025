<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

const box = ref<HTMLElement | null>(null);
const messageBox = ref<HTMLElement | null>(null);

const message = ref<string | { type: string; src: string; alt: string }>("");
const showMessage = ref(false);

// Define a union type for your messages
type MessageContent = string | { type: "svg"; src: string; alt: string };

const messages: Record<number, MessageContent> = {
  1: { type: "svg", src: "/images/fredagsbar.svg", alt: "spin 1" },
  2: { type: "svg", src: "/images/fredagsbar.svg", alt: "spin 2" },
  3: { type: "svg", src: "/images/fredagsbar.svg", alt: "spin 3" },
  4: { type: "svg", src: "/images/fredagsbar.svg", alt: "spin 4" },
  5: { type: "svg", src: "/images/circle.svg", alt: "spin 5" },
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
  <div class="min-h-screen flex items-center justify-center p-4">
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

      <!---------------------------->
      <!-- Circle SVG Background -->
      <!---------------------------->
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
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-80 h-80 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 cursor-grab active:cursor-grabbing flex items-center justify-center"
      >
        <img
          src="/images/spin-bottle.png"
          alt="Spin the Bottle"
          class="w-full h-full object-contain"
          @error="console.log('Bottle image failed to load')"
        />

      </div>
    </div>
    
    <!-- Bottom text - moved outside and positioned absolutely -->
    <div
 class="absolute bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-12 left-0 right-0 text-center px-4 sm:px-6 md:px-8">
    >
      <div class="max-w-4xl mx-auto">
        <h2
          class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-2xl mb-2 sm:mb-3 md:mb-4"
        >
          Flasken vælger datoen
        </h2>
        <p
          class="text-sm sm:text-base md:text-lg lg:text-xl text-white pl-5 pr-5 drop-shadow-lg"
        >
          Klik på flasken for at dreje og opdage en ekstra lille julegave
        </p>
      </div>
      <!------------------------------------------------->
      <!-- Fullscreen besked box med fade in animation -->
      <!------------------------------------------------->

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
              v-if="typeof message === 'string'"
              class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white drop-shadow-2xl mb-6 sm:mb-8 md:mb-10"
            >
              {{ message }}
            </p>
            <div
              v-else-if="message.type === 'svg'"
              class="mb-6 sm:mb-8 md:mb-10"
            >
              <img
                :src="message.src"
                :alt="message.alt"
                class="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] mx-auto object-contain drop-shadow-2xl"
              />
            </div>

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
  </div>
</template>
