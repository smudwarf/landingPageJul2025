<script setup lang="ts">
import gsap from "gsap";
import { onMounted } from "vue";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

function getPieFromRotation(rotation: number): number {
  // define trekant range points : rotation mellem 0 -360
  const triangleRotation = ((rotation % 360) + 360) % 360;

  //360 divideret i 6 lige store dele = 60 grader hver
  //explain +1 : to account for 0 degree starting point
  const triangleRanges = Math.floor(triangleRotation / 60) + 1;

  //handle edge case where rotation is exactly 360 degrees
  return triangleRanges > 6 ? 1 : triangleRanges;
}

onMounted(() => {
  gsap.registerPlugin(Draggable, InertiaPlugin);
  Draggable.create("[data-bottle]", {
    type: "rotation",
    inertia: true,
    snap: function (value: number) {
      return Math.round(value / 60) * 60;
    },


    onThrowComplete: function () {
      const rotation = this.rotation;
      const triangle = getPieFromRotation(rotation);

    
      //udsender en "bottle-landed" begivenhed på vinduesobjektet med detaljer om trekanten, som flasken stoppede på, og dens rotation.
      window.dispatchEvent(
        new CustomEvent("bottle-landed", {
          detail: {
            triangle: triangle,
            rotation: rotation,
            triangleRotation: ((rotation % 360) + 360) % 360,
          },
        })
      );
      console.log(`Bottle stopped on triangle ${triangle}`);

    },

    onDrag: function () {
      const rotation = this.rotation;
      const triangle = getPieFromRotation(rotation);
      const triangleRotation = ((rotation % 360) + 360) % 360;

      // dispatch event with current pie in detail
      // explain further : dispatches a "bottle-dragging" event on the window object with details about the triangle currently under the bottle and its rotation.
      window.dispatchEvent(
        new CustomEvent("bottle-dragging", {
          detail: {
            triangle: triangle,
            rotation: rotation,
            triangleRotation: triangleRotation,
            progress: triangleRotation / 360,
          },
        })
      );
    },
    onThrowUpdate: function () {
      const rotation = this.rotation;
      const triangle = getPieFromRotation(rotation);
      const triangleRotation = ((rotation % 360) + 360) % 360;

      // dispatch event with current pie in detail
      // explain further : dispatches a "bottle-spinning" event on the window object with details about the triangle currently under the bottle and its rotation.
      window.dispatchEvent(
        new CustomEvent("bottle-spinning", {
          detail: {
            triangle: triangle,
            rotation: rotation,
            triangleRotation: triangleRotation,
            progress: triangleRotation / 360,
          },
        })
      );
    },
  });
});
//Explain this function : onDrag and onThrowUpdate dispatch a "pie-spin" event with the current rotation value mapped from 0-360 degrees to 0-1 range.
// onDrag: function () {
//   const value = gsap.utils.mapRange(0, 360, 0, 1, this.rotation % 360);
//   window.dispatchEvent(
//     new CustomEvent("pie-spin", {
//       detail: value,
//     })
//   );
// },
// onThrowUpdate: function () {
//   const value = gsap.utils.mapRange(0, 360, 0, 1, this.rotation % 360);
//   window.dispatchEvent(
//     new CustomEvent("pie-spin", {
//       detail: value,
//     })
//   );
// },

function setScene() {}
</script>
<template>
 <main data-main class="absolute inset-0 h-svh w-svw overflow-hidden z-20">
    <!-- Bottle centered within the same container size as pie -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="relative w-full max-w-[60rem] aspect-square flex items-center justify-center">
        <img
          @click="setScene"
          src="/images/spin-bottle.png"
          alt="Spin the Bottle"
          data-bottle
          class="w-full max-w-[40rem] aspect-square pointer-events-auto cursor-pointer"
          style="transform: translateY(-6px);"
          @error="console.log('Bottle image failed to load')"
        />
      </div>
    </div>
  </main>
</template>
<style scoped></style>
