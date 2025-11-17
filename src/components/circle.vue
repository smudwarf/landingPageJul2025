<script setup lang="ts">
import gsap from "gsap";
import { onMounted } from "vue";

onMounted(() => {
  // Whole spinner
  gsap.to("[data-top-spinner]", {
    scale: 1.05,
    duration: 2,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
    transformOrigin: "50% 50%",
  });

  onMounted(() => {
    gsap.to("#top-tri-1", {
      scale: 1.03,
      duration: 1.8,
      yoyo: true,
      repeat: -1,
      transformOrigin: "50% 50%",
      ease: "power1.inOut",
      delay: 0, // starts first
    });

    gsap.to("#top-tri-2", {
      scale: 1.03,
      duration: 1.8,
      yoyo: true,
      repeat: -1,
      transformOrigin: "50% 50%",
      ease: "power1.inOut",
      delay: 0.3, // starts a bit later
    });

    gsap.to("#top-tri-3", {
      scale: 1.03,
      duration: 1.8,
      yoyo: true,
      repeat: -1,
      transformOrigin: "50% 50%",
      ease: "power1.inOut",
      delay: 0.6, // even later
    });
  });

  // Bottom triangles – also offset
  gsap.to("#bottom-tri-1", {
    scale: 1.03,
    duration: 1.8,
    yoyo: true,
    repeat: -1,
    transformOrigin: "50% 50%",
    ease: "power1.inOut",
    delay: 0.9,
  });

  gsap.to("#bottom-tri-2", {
    scale: 1.03,
    duration: 1.8,
    yoyo: true,
    repeat: -1,
    transformOrigin: "50% 50%",
    ease: "power1.inOut",
    delay: 1.2,
  });

  gsap.to("#bottom-tri-3", {
    scale: 1.03,
    duration: 1.8,
    yoyo: true,
    repeat: -1,
    transformOrigin: "50% 50%",
    ease: "power1.inOut",
    delay: 1.5,
  });
});
</script>

<template>
  <div class="relative h-screen w-screen bg-[#63FF4A]">
    <section>
      <div class="relative w-full max-w-[60rem] aspect-square mx-auto">
        <!-- TOP SPINNER -->
        <svg
          viewBox="0 0 517 487"
          data-top-spinner
          class="w-full h-full absolute top-1/2 left-1/2"
          style="
            transform: translate(-50%, -50%) scaleX(0.94) scaleY(1.04)
              translateY(-6px);
            transform-origin: 50% 50%;
          "
        >
          <path
            id="top-tri-1"
            d="M0 242.877C3.73673e-06 200.134 11.2512 158.144 32.6228 121.127C53.9944 84.1105 84.7333 53.3716 121.75 32L243.5 242.877L0 242.877Z"
            fill="#072913"
            fill-opacity="0.5"
          />
          <path
            id="top-tri-2"
            d="M131 32.6228C168.017 11.2512 210.007 -4.12727e-05 252.75 1.1355e-10C295.493 4.1273e-05 337.484 11.2513 374.5 32.623L252.75 243.5L131 32.6228Z"
            fill="#072913"
            fill-opacity="0.8"
          />
          <path
            id="top-tri-3"
            d="M383.75 31.9998C420.767 53.3715 451.506 84.1105 472.877 121.127C494.249 158.144 505.5 200.134 505.5 242.877L262 242.877L383.75 31.9998Z"
            fill="#072913"
          />

          <path
            id="bottom-tri-1"
            d="M121.778 464.534C84.7589 443.168 54.0157 412.433 32.6391 375.419C11.2626 338.405 0.00570917 296.416 1.59732e-05 253.673L243.5 253.641L121.778 464.534Z"
            fill="#072913"
            fill-opacity="0.5"
          />
          <path
            id="bottom-tri-2"
            d="M374.528 463.877C337.515 485.254 295.526 496.511 252.783 496.516C210.039 496.522 168.048 485.276 131.028 463.91L252.75 253.016L374.528 463.877Z"
            fill="#072913"
          />
          <path
            id="bottom-tri-3"
            d="M505.5 253.605C505.506 296.348 494.26 338.34 472.894 375.359C451.527 412.379 420.792 443.122 383.778 464.499L262 253.638L505.5 253.605Z"
            fill="#072913"
            fill-opacity="0.8"
          />
        </svg>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
