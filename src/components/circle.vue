<script setup lang="ts">
import gsap from "gsap";
import { onMounted } from "vue";

onMounted(() => {
  gsap.to("[data-top-spinner]", {
    scale: 1.1,
    duration: 2,
    ease: "Power2.InOut",
    yoyo: true,
    repeat: -1,
  });
  gsap.to("[data-bottom-spinner]", {
    scale: 1.1,
    duration: 2,
    ease: "Power2.InOut",
    yoyo: true,
    repeat: -1,
  });
});
</script>

<template>
  <div class="relative h-screen w-screen">
    <h1>hej</h1>
   <div class="relative w-full max-w-[60rem] mx-auto aspect-square">
    <!-- top -->
    <img
      src="public/images/top-spinner.svg"
      data-top-spinner
      class="absolute inset-0 m-auto origin-center translate-y-[-5px]"
    />

    <!-- bottom -->
    <img
      src="public/images/bottom-spinner.svg"
      data-bottom-spinner
      class="absolute inset-0 m-auto origin-center translate-y-[5px]"
    />
  </div>
  </div>
</template>

<style scoped></style>
