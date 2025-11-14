<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import { gsap } from "gsap";

// Props for the result card
interface Props {
  message: string | { type: string; src: string; alt: string };
  show: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const card = ref<HTMLElement | null>(null);

// Watch for show prop changes to trigger animation
watch(
  () => props.show,
  async (newVal) => {
    if (newVal) {
      await nextTick();
      animateIn();
    }
  }
);

function animateIn() {
  if (card.value) {
    // Set initial position (off-screen at bottom)
    gsap.set(card.value, {
      y: "100vh",
      opacity: 0,
    });

    // Animate in from bottom
    gsap.to(card.value, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.2)",
    });
  }
}

function animateOut() {
  if (card.value) {
    gsap.to(card.value, {
      y: "100vh",
      opacity: 0,
      duration: 0.4,
      ease: "back.in(1.2)",
      onComplete: () => {
        emit("close");
      },
    });
  }
}

function handleClose() {
  animateOut();
}
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-end justify-center p-4 backdrop-blur-xs backdrop-brightness-75"
    @click="handleClose"
  >
    <div
      ref="card"
      class="bg-gray-600 rounded-t-2xl shadow-2xl w-full h-1/2 overflow-hidden"
      @click.stop
    >
      <!-- Card Content -->
      <div class="p-6 pb-8">
        <!-- Close button -->
        <button
          @click="handleClose"
          class="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-700 flex items-center justify-center transition-colors"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <!-- Result Content -->
        <div class="text-center pt-4">
          <h2 class="text-2xl font-bold mb-4 text-white"> TEKST</h2>

          <!-- Text message -->
          <div v-if="typeof message === 'string'" class="mb-6">
            <p class="text-lg text-white">{{ message }}</p>
          </div>

          <!-- SVG/Image message -->
          <div v-else-if="message && message.type === 'svg'" class="mb-6">
            <img
              :src="message.src"
              :alt="message.alt"
              class="w-32 h-32 mx-auto object-contain"
            />
          </div>

          <!-- Action button 
          <button
            @click="handleClose"
            class="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
          >
            Spin igen
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>
