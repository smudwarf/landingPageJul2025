<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <!-- Wrapper til flaske og punkter -->
    <div class="relative">
      <!-- Container til 8 prikker i en cirkel -->
      <div
        class="absolute inset-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
      >
        <!---------------------------->
        <!--........Prikker........ -->
        <!---------------------------->
        <div
          v-for="i in 8"
          :key="i"
          :style="{
            // Drej hver prik (360/8 = 45)
            // Flyt den 180px væk fra midten
            transform: `rotate(${i * 45}deg) translateY(-180px)`,
            position: 'absolute',
            left: '50%',
            top: '50%',
            transformOrigin: 'center',
          }"
          class="w-4 h-4 bg-gray-600 rounded-full -translate-x-1/2 -translate-y-1/2"
        >
          <!-- Spiller nummer over prikkerne
          <span
            class="absolute -top-8 left-1/2 -translate-x-1/2 font-bold text-gray-700"
          >
            {{ i }}
          </span>-->
        </div>
      </div>

      <!---------------------------->
      <!-- spin flaske container -->
      <!---------------------------->

      <div
        ref="box"
        id="spinBottle"
        class="relative z-10 w-32 h-32 cursor-grab active:cursor-grabbing flex items-center justify-center"
      >
        <!---------------------------->
        <!--..........Img...... -->
        <!---------------------------->
        <img
          :src="bottleImage.src"
          alt="Spin the Bottle"
          class="w-full h-full object-contain"
        />
      </div>
    </div>

    <!-- Fullscreen besked box med fade in animation -->
    <div
      v-if="showMessage"
      ref="messageBox"
      class="fixed inset-0 z-50 flex items-center justify-center "
    >
   <div
        class="w-full h-full flex items-center justify-center px-8"
      >
        <div class="text-center">
          <p class="text-8xl font-bold text-white drop-shadow-2xl">
            {{ message }}
          </p>
          <button
            @click="closeMessage"
            class="mt-12 bg-white hover:bg-gray-100 text-gray-800 font-bold text-2xl py-6 px-12 rounded-lg transition-colors shadow-xl"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import bottleImage from "../assets/spin-bottle.png";

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
        return Math.round(value / 45) * 45;
      },
      onThrowComplete: function () {
        const rotation = this.rotation;
        const normalizedRotation = ((rotation % 360) + 360) % 360;
        const point = Math.round(normalizedRotation / 45) % 8 || 8;
        handlePoint(point);
      },
    });
  }
});
</script>
