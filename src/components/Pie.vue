<script setup lang="ts">
import gsap from "gsap";
import { onMounted, ref, watch } from "vue";

let pie1, pie2, pie3, pie4, pie5, pie6;
let unit = 1 / 6;
let zeroOneClamp;

onMounted(() => {
  zeroOneClamp = gsap.utils.clamp(0, 1);
  pie1 = document.querySelector("#pie-1");
  pie2 = document.querySelector("#pie-2");
  pie3 = document.querySelector("#pie-3");
  pie4 = document.querySelector("#pie-4");
  pie5 = document.querySelector("#pie-5");
  pie6 = document.querySelector("#pie-6");

  window.addEventListener("pie-spin", ({ detail }) => {
    pieSpin(zeroOneClamp(detail));
  });
});

function polarToCartesian(angleInDegrees, radius) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: radius * Math.cos(angleInRadians),
    y: radius * Math.sin(angleInRadians),
  };
}

function triggerOnce() {
  let bool = false;
  return function (value) {
    if (Number(value) > 0 && !bool) {
      bool = true;
      return true;
    } else if (Number(value) == 0 && bool) {
      bool = false;
      return false;
    }
  };
}

const to1 = triggerOnce();
const to2 = triggerOnce();
const to3 = triggerOnce();
const to4 = triggerOnce();
const to5 = triggerOnce();
const to6 = triggerOnce();

function pieSpin(value) {
  const t1 = zeroOneClamp(gsap.utils.mapRange(unit * 0, unit * 1, 0, 1, value));
  const t2 = zeroOneClamp(gsap.utils.mapRange(unit * 1, unit * 2, 0, 1, value));
  const t3 = zeroOneClamp(gsap.utils.mapRange(unit * 2, unit * 3, 0, 1, value));
  const t4 = zeroOneClamp(gsap.utils.mapRange(unit * 3, unit * 4, 0, 1, value));
  const t5 = zeroOneClamp(gsap.utils.mapRange(unit * 4, unit * 5, 0, 1, value));
  const t6 = zeroOneClamp(gsap.utils.mapRange(unit * 5, unit * 6, 0, 1, value));
  if (to1(t1)) {
    animatePie(pie1, 0);
  }
  if (to2(t2)) {
    animatePie(pie2, 60);
  }
  if (to3(t3)) {
    animatePie(pie3, 120);
  }
  if (to4(t4)) {
    animatePie(pie4, 180);
  }
  if (to5(t5)) {
    animatePie(pie5, 240);
  }
  if (to6(t6)) {
    animatePie(pie6, 300);
  }
}

function animatePie(pie, angle) {
  const { x, y } = polarToCartesian(angle, 5);
  gsap
    .timeline()
    .to(pie, {
      x,
      y,
      duration: 0.1,
      ease: "power1.out",
    })
    .to(pie, {
      x: 0,
      y: 0,
      duration: 0.1,
      ease: "power1.in",
    });
}
</script>

<template>
  <div class="absolute inset-0 h-screen w-screen bg-[#63FF4A]">
    <section>
      <div class="relative w-full max-w-[60rem] aspect-square mx-auto">
        <!-- TOP SPINNER -->
        <svg
          viewBox="0 0 517 487"
          data-top-spinner
          class="w-full h-full absolute top-1/2 left-1/2"
          style="transform: translate(-50%, -50%); transform-origin: 50% 50%"
          fill="#072913"
        >
          <path
            id="pie-1"
            d="M131 32.6228C168.017 11.2512 210.007 -4.12727e-05 252.75 1.1355e-10C295.493 4.1273e-05 337.484 11.2513 374.5 32.623L252.75 243.5L131 32.6228Z"
            fill-opacity="0.8"
          />
          <path
            id="pie-2"
            d="M383.75 31.9998C420.767 53.3715 451.506 84.1105 472.877 121.127C494.249 158.144 505.5 200.134 505.5 242.877L262 242.877L383.75 31.9998Z"
          />
          <path
            id="pie-3"
            d="M505.5 253.605C505.506 296.348 494.26 338.34 472.894 375.359C451.527 412.379 420.792 443.122 383.778 464.499L262 253.638L505.5 253.605Z"
            fill-opacity="0.8"
          />
          <path
            id="pie-4"
            d="M374.528 463.877C337.515 485.254 295.526 496.511 252.783 496.516C210.039 496.522 168.048 485.276 131.028 463.91L252.75 253.016L374.528 463.877Z"
          />
          <path
            id="pie-5"
            d="M121.778 464.534C84.7589 443.168 54.0157 412.433 32.6391 375.419C11.2626 338.405 0.00570917 296.416 1.59732e-05 253.673L243.5 253.641L121.778 464.534Z"
            fill-opacity="0.5"
          />
          <path
            id="pie-6"
            d="M0 242.877C3.73673e-06 200.134 11.2512 158.144 32.6228 121.127C53.9944 84.1105 84.7333 53.3716 121.75 32L243.5 242.877L0 242.877Z"
            fill-opacity="0.5"
          />
        </svg>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
