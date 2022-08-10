<template>
  <div class="container">
    <img class="background" src="@/assets/images/arc_2.webp" alt="Подполье Одесса Антикафе пространство" />
    <img
      class="title"
      src="@/assets/images/logo/wide2.png"
      alt="Подполье Одесса Антикафе пространство"
    />
    <ArrowIcon />
  </div>
</template>

<script>
import ArrowIcon from '@/assets/images/arrow.svg?inline'
export default {
  components: {
    ArrowIcon
  },
  data: () => ({
    shadow: false,
  }),
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  .title {
    position: absolute;
    z-index: 2;
    width: 200%;
    padding: 0 55%;
    left: -50%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.78) 4.17%, rgba(0, 0, 0, 0) 100%);
    transition-property: background-color;
    transition-duration: 100ms;
    transition-timing-function: ease-in-out;
    height: 100%;
    opacity: 0;
    object-fit: contain;
    animation: opacity 3s 1s forwards;
  }

  .arrow {
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    width: 200px;
    height: 300px;
    z-index: 3;

    animation: arrowJump 2s infinite;

    path {
      fill: rgba($color: #bf895a,  $alpha: 0);
      stroke-dasharray: 25 !important;
      stroke-dashoffset: 25;
      animation-name: draw;
      animation-delay: 3s;
      animation-duration: 3s;
      animation-fill-mode: forwards;
      stroke: #bf895a;
      stroke-width: 0.26458334;
      stroke-linecap: round;
      stroke-linejoin: bevel;
      stroke-miterlimit: 4;
      stroke-opacity: 1;
      paint-order: markers fill stroke;
    }
  }

  .background {
    opacity: 0;
    animation: appear 2s forwards;
    min-height: 100vh;
    z-index: 1;

    @media screen and (max-width: 768px) {
      object-fit: cover;
      object-position: left;
    }
  }
}

@keyframes arrowJump {
  0% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(50px);
  }
  100% {
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes appear {
  0% {
    opacity: 0;
    transform: scale(1.4);
  }

  50% {
    opacity: 1;
    transform: scale(1.4);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes opacity {
  0% {
    opacity: 0;
    transform: scale(1.1);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
