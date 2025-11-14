<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import ResultCard from "./resultCard.vue";

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
}

function closeMessage() {
  showMessage.value = false;
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
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <div
      class="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl aspect-square mb-8"
    >
      <div class="absolute inset-0 w-full h-full">
        <!---------------------------->
        <!--........Prikker........ -->
        <!---------------------------->
        <div
          v-for="i in 6"
          :key="i"
          :style="{
            transform: `rotate(${i * 60}deg) translateY(min(-12vw, -180px))`,
            position: 'absolute',
            left: '50%',
            top: '50%',
            transformOrigin: 'center',
          }"
          class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 bg-gray-600 rounded-full -translate-x-1/2 -translate-y-1/2"
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
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[36rem] lg:h-[36rem] xl:w-[42rem] xl:h-[42rem] cursor-grab active:cursor-grabbing flex items-center justify-center"
      >
        <img
          src="/images/spin-bottle.png"
          alt="Spin the Bottle"
          class="w-full h-full object-contain"
          @error="console.log('Bottle image failed to load')"
        />
      </div>
    </div>

    <!------------------------------------------------>
    <!---------------Text under spinner ------------->
    <!------------------------------------------------>

    <div class="text-center px-4 sm:px-6 md:px-8 max-w-4xl">
      <h2
        class="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl mb-2 sm:mb-3 md:mb-4"
      >
        Flasken vælger datoen
      </h2>
      <p
        class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white drop-shadow-lg"
      >
        Klik på flasken for at dreje og opdage en ekstra lille julegave
      </p>
    </div>

    <!----------------------------------------->
    <!-- Result Card with slide-up animation -->
    <!----------------------------------------->

    <ResultCard :message="message" :show="showMessage" @close="closeMessage" />
  </div>
</template>
