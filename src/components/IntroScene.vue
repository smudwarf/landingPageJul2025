<script setup>
import gsap from "gsap";
import { onMounted } from "vue";
const emits = defineEmits(["complete"]);

let tl1, tl2;
onMounted(() => {
  tl1 = gsap.timeline({ delay: 2.5 });
  tl1.set("[data-main]", {
    opacity: 1,
  });
  tl1.from("[data-header], [data-description]", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
  });
  tl1.from("[data-bottle]", {
    y: "100%",
    duration: 1,
    ease: "power3.out",
  });
  tl1.to("[data-bottle]", {
    y: "55%",
    duration: 2,
    ease: "power1.inOut",
    repeat: 100,
    yoyo: true,
  });
});

function setScene() {
  window.dispatchEvent(new Event("background-change"));
  tl1.kill();
  tl2 = gsap.timeline({
    onComplete: () => {
      emits("complete");
    },
  });
  tl2.to("[data-header], [data-description]", {
    y: -50,
    duration: 1,
    opacity: 0,
    ease: "power3.inOut",
    stagger: 0.1,
  });
  tl2.to(
    "[data-bottle]",
    {
      bottom: "50%",
      y: "50%",
      rotate: 360,
      duration: 3,
      ease: "elastic.out(1, 0.9)",
    },
    "<"
  );
}
</script>
<template>
  <main
    data-main
    class="opacity-0 relative h-screen z-10 overflow-hidden w-screen"
  >
    <section class="text-center mx-auto relative top-1/6 px-10" data-section>
      <h1
        data-header
        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-green-inc drop-shadow-2xl mb-8 sm:mb-15 md:mb-10"
      >
        Glædelig Jul!
      </h1>
      <p
        data-description
        class="text-xl text-green-inc sm:text-xl md:text-1xl lg:text-3xl xl:text-6xl mb-20 sm:mb-32 md:mb-40 lg:mb-48 xl:mb-56"
      >
        Julen nærmer sig, og vi vil gerne benytte lejligheden til at sige tusind
        tak for et godt samarbejde i året, der er gået. Vi sætter stor pris på
        den tillid og støtte, I har vist os, og vi glæder os til at fortsætte
        samarbejdet i det nye år.
      </p>
    </section>
    <img
      @click="setScene"
      src="/images/spin-bottle.png"
      alt="Spin the Bottle"
      data-bottle
      class="w-full max-w-[50rem] aspect-square absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 origin-center"
      @error="console.log('Bottle image failed to load')"
    />
  </main>
</template>
<style scoped></style>
