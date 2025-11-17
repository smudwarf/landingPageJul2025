<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";

const classes = ref("bg-[#072914]");

onMounted(() => {
  const [t1, t2] = document.querySelectorAll("[data-tree]");
  const t1Children = t1.querySelectorAll("div");
  const t2Children = t2.querySelectorAll("div");

  const tl = gsap.timeline({
    onStart: () => {
      t1Children.forEach((child, idx) => {
        gsap.to(child, {
          x: "3%",
          repeat: 100,
          delay: idx * 0.2,
          duration: 2,
          yoyo: true,
          ease: "sine.inOut",
          yoyoEase: "sine.inOut",
        });
      });
      t2Children.forEach((child, idx) => {
        gsap.to(child, {
          x: "-3%",
          repeat: 100,
          delay: idx * 0.2,
          duration: 2,
          yoyo: true,
          ease: "sine.inOut",
          yoyoEase: "sine.inOut",
        });
      });
    },
  });
  tl.set(t1, {
    left: "50%",
    x: "-50%",
    top: "100%",
  });
  tl.set(t2, {
    right: "50%",
    x: "50%",
    top: "100%",
  });
  tl.to(
    [t1, t2],
    {
      top: "0%",
      duration: 2,
      ease: "power2.out",
    },
    0
  );
  tl.to(
    t1,
    {
      left: 0,
      x: "-70%",
      duration: 4,
      ease: "power3.inOut",
      clearProps: "all",
    },
    "<"
  );
  tl.to(
    t2,
    {
      right: 0,
      x: "70%",
      duration: 4,
      ease: "power3.inOut",
      clearProps: "all",
    },
    "<"
  );
  window.addEventListener("background-change", changeBackground, {
    once: true,
  });
  function changeBackground() {
    t1.classList.add("active");
    t2.classList.add("active");
    tl.kill();
    gsap.killTweensOf(t1Children);
    gsap.killTweensOf(t2Children);
    gsap.to(t1, {
      left: "50%",
      x: "-50%",
      duration: 2,
      ease: "power3.inOut",
      clearProps: "all",
      onComplete: () => {
        classes.value = "bg-[#00ff3f]";
      },
    });
    gsap.to(t2, {
      right: "50%",
      x: "50%",
      duration: 2,
      ease: "power3.inOut",
      clearProps: "all",
    });
  }
});
</script>
<template>
  <div
    class="absolute inset-0 overflow-hidden w-svw h-svh"
    :class="classes"
    style="--size: 25vh"
  >
    <div
      data-tree
      class="flex flex-col items-center w-[calc(var(--size)*3)] absolute top-0 left-0 translate-x-[-70%]"
    >
      <div
        class="triangle"
        style="--dimension: var(--size); --offset: calc(var(--size) * 0)"
      ></div>
      <div
        class="triangle"
        style="
          --dimension: calc(var(--size) * 1.5);
          --offset: calc(var(--size) * -0.65);
        "
      ></div>
      <div
        class="triangle"
        style="
          --dimension: calc(var(--size) * 2);
          --offset: calc(var(--size) * -1);
        "
      ></div>
      <div
        class="triangle"
        style="
          --dimension: calc(var(--size) * 2.5);
          --offset: calc(var(--size) * -1.35);
        "
      ></div>
    </div>
    <div
      class="flex flex-col items-center w-[calc(var(--size)*3)] absolute top-0 right-0 translate-x-[70%]"
      data-tree
    >
      <div
        class="triangle"
        style="--dimension: var(--size); --offset: calc(var(--size) * 0)"
      ></div>
      <div
        class="triangle"
        style="
          --dimension: calc(var(--size) * 1.5);
          --offset: calc(var(--size) * -0.65);
        "
      ></div>
      <div
        class="triangle"
        style="
          --dimension: calc(var(--size) * 2);
          --offset: calc(var(--size) * -1);
        "
      ></div>
      <div
        class="triangle"
        style="
          --dimension: calc(var(--size) * 2.5);
          --offset: calc(var(--size) * -1.35);
        "
      ></div>
    </div>
  </div>
</template>
<style scoped>
.triangle {
  width: 0;
  height: 0;
  border-left: calc(var(--dimension) * 0.6) solid transparent;
  border-right: calc(var(--dimension) * 0.6) solid transparent;
  border-bottom: var(--dimension) solid #00ff3f;
  position: relative;
  margin-top: var(--offset);
}

[data-tree].active:nth-child(1) {
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 50%;
    width: 50vw;
    height: 100%;
    background: #00ff3f;
  }
}
[data-tree].active:nth-child(2) {
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 50vw;
    height: 100%;
    background: #00ff3f;
  }
}
</style>
