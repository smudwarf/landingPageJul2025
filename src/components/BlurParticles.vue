<template>
  <div class="particles-container">
    <div
      v-for="(particle, index) in particles"
      :key="index"
      class="particle"
      :style="{
        width: particle.size + 'px',
        height: particle.size + 'px',
        left: particle.x + '%',
        top: particle.y + '%',
        background: particle.gradient,
        animationDelay: particle.delay + 's',
        animationDuration: particle.duration + 's'
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const particles = ref<Array<{
  size: number;
  x: number;
  y: number;
  gradient: string;
  delay: number;
  duration: number;
}>>([])

onMounted(() => {
  particles.value = [
    {
      size: 250,
      x: 85,
      y: 15,
      gradient: 'radial-gradient(circle, rgba(254, 254, 0, 0.6), rgba(254, 254, 0, 0.2))',
      delay: 0,
      duration: 25
    },
    {
      size: 200,
      x: 5,
      y: 25,
      gradient: 'radial-gradient(circle, rgba(6, 182, 212, 0.4), rgba(6, 182, 212, 0.1))',
      delay: 3,
      duration: 30
    },
    {
      size: 180,
      x: 90,
      y: 70,
      gradient: 'radial-gradient(circle, rgba(0, 255, 63, 0.5), rgba(0, 255, 63, 0.2))',
      delay: 8,
      duration: 20
    },
    {
      size: 160,
      x: 10,
      y: 80,
      gradient: 'radial-gradient(circle, rgba(255, 75, 24, 0.4), rgba(255, 75, 24, 0.1))',
      delay: 12,
      duration: 28
    },
    {
      size: 220,
      x: 70,
      y: 40,
      gradient: 'radial-gradient(circle, rgba(1, 237, 255, 0.3), rgba(1, 237, 255, 0.1))',
      delay: 5,
      duration: 35
    }
  ]
})
</script>

<style scoped>
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.particle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.8;
  animation: float infinite ease-in-out;
  will-change: transform;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px) scale(1);
  }
  25% {
    transform: translateY(-30px) translateX(15px) scale(1.1);
  }
  50% {
    transform: translateY(-10px) translateX(-20px) scale(0.9);
  }
  75% {
    transform: translateY(20px) translateX(10px) scale(1.05);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .particle {
    filter: blur(40px);
  }
}

@media (max-width: 480px) {
  .particle {
    filter: blur(30px);
  }
}
</style>