<script setup lang="ts">
import gsap from "gsap";
import { onMounted } from "vue";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
gsap.registerPlugin(Draggable, InertiaPlugin);

onMounted(() => {
  Draggable.create("[data-bottle]", {
    type: "rotation",
    inertia: true,
    snap: function (value: number) {
      return Math.round(value / 60) * 60;
    },
    onThrowComplete: function () {
      const rotation = this.rotation;
      const normalizedRotation = ((rotation % 360) + 360) % 360;
      const point = Math.round(normalizedRotation / 60) % 6 || 6;
      // handlePoint(point);
    },
  });
});

function setScene() {}
</script>
<template>
  <main data-main class="relative h-screen">
    <section>
      <img
        src="public/images/circle.svg"
        alt="Circle Background"
        class="w-full max-w-[60rem] aspect-square absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
        @error="console.log('Circle SVG failed to load')"
      />

      <h1 class = "absolute bottom-15 left-1/2 -translate-x-1/2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-green-inc drop-shadow-2xl">
        Spin for en overraskelse
      </h1>
      
    </section>

    <img
      @click="setScene"
      src="/images/spin-bottle.png"
      alt="Spin the Bottle"
      data-bottle
      class="w-full max-w-[50rem] aspect-square absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
      @error="console.log('Bottle image failed to load')"
    />
  </main>
</template>
<style scoped></style>
