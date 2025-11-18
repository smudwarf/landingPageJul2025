<script setup lang="ts">
import gsap from "gsap";
import { onMounted, onUnmounted } from "vue";

let spinnerTween: gsap.core.Tween | undefined;

function handleBottleDragging(event: CustomEvent) {
  const { triangle, triangleRotation } = event.detail;
  console.log(
    `Handling bottle dragging on triangle ${triangle} with rotation ${triangleRotation}`
  );

  // Highlight the current triangle (the one flasken er på)
  highlightTriangle(triangle);
}

function handleBottleLanded(event: CustomEvent) {
  const { triangle } = event.detail;
  console.log(`Final result: Triangle ${triangle}`);

  // Final selection
  selectTriangle(triangle);
}

// Stop al eksisterende tweening på alle pies
// Reset grund-state på alle trekanter
function highlightTriangle(triangleNumber: number) {
  gsap.killTweensOf('[id^="pie-"]');
  gsap.set('[id^="pie-"]', { scale: 1, opacity: 0.8 });

  // Lav en lille, loopende puls på KUN den trekant flasken er over
  gsap.to(`#pie-${triangleNumber}`, {
    scale: 1.01,
    opacity: 1,
    duration: 0.6,
    yoyo: true,
    repeat: -1,
    transformOrigin: "50% 50%",
    ease: "power5.inOut",
  });
}

function selectTriangle(triangleNumber: number) {
  // Stop den pulserende highlight-animering på alle
  gsap.killTweensOf('[id^="pie-"]');

  // Reset alle
  gsap.set('[id^="pie-"]', { scale: 1, opacity: 0.8 });

  // Final “pop”-animation på den valgte trekant
  gsap.to(`#pie-${triangleNumber}`, {
    scale: 1.15,
    duration: 0.35,
    yoyo: true,
    repeat: 1,
    transformOrigin: "50% 50%",
    ease: "power2.out",
  });
}

onMounted(() => {
  // Hele spinneren skalerer lidt
  spinnerTween = gsap.to("[data-top-spinner]", {
    scale: 1.03,
    duration: 2,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
    transformOrigin: "50% 50%",
  });

  // Nu styres al pie-animation via highlightTriangle/selectTriangle
  //flasken spinner, starter "bottle-dragging" og "bottle-spinning" events, som fremhæver den aktuelle trekant.

  window.addEventListener(
    "bottle-dragging",
    handleBottleDragging as EventListener
  );
  window.addEventListener(
    "bottle-spinning",
    handleBottleDragging as EventListener
  );
  window.addEventListener("bottle-landed", handleBottleLanded as EventListener);
});

onUnmounted(() => {
  // Ryd op kill kill kill - alle tweens
  if (spinnerTween) spinnerTween.kill();
  gsap.killTweensOf('[id^="pie-"]');

  window.removeEventListener(
    "bottle-dragging",
    handleBottleDragging as EventListener
  );
  window.removeEventListener(
    "bottle-spinning",
    handleBottleDragging as EventListener
  );
  window.removeEventListener(
    "bottle-landed",
    handleBottleLanded as EventListener
  );
});
</script>

<template>
  <div class="relative h-screen w-screen bg-[#63FF4A]">
    <section class="absolute inset-0 flex items-center justify-center">
      <div class="relative w-full max-w-[60rem] aspect-square">
        <svg
          viewBox="0 0 676 660"
          data-top-spinner
          class="w-full h-full"
          style="transform: translateY(-6px); transform-origin: 50% 50%"
          fill="#072913"
        >
          <path
            id="pie-1"
            d="M222.794 110.173C259.89 88.9386 301.922 77.843 344.665 78.0015C387.408 78.1599 429.356 89.5668 466.293 111.075L343.762 321.5L222.794 110.173Z"
            fill-opacity="0.5"
          />
          <path
            id="pie-2"
            d="M475.545 110.487C512.482 131.995 543.107 162.848 564.341 199.944C585.576 237.039 596.671 279.071 596.513 321.814L353.014 320.911L475.545 110.487Z"
          />
          <path
            id="pie-3"
            d="M596.484 329.542C596.331 372.285 584.93 414.234 563.427 451.174C541.923 488.114 511.075 518.743 473.982 539.983L352.986 328.672L596.484 329.542Z"
            fill-opacity="0.8"
          />
          <path
            id="pie-4"
            d="M464.734 539.327C427.641 560.566 385.611 571.667 342.868 571.515C300.125 571.362 258.175 559.961 221.235 538.457L343.738 328.016L464.734 539.327Z"
            fill-opacity="0.5"
          />
          <path
            id="pie-5"
            d="M211.983 539.047C175.043 517.544 144.414 486.695 123.175 449.602C101.936 412.509 90.8346 370.479 90.9873 327.736L334.486 328.606L211.983 539.047Z"
            fill-opacity="0.8"
          />
          <path
            id="pie-6"
            d="M91.0161 319.94C91.1745 277.198 102.581 235.249 124.09 198.312C145.599 161.375 176.451 130.75 213.547 109.516L334.514 320.843L91.0161 319.94Z"
            fill-opacity="0.8"
          />
        </svg>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
