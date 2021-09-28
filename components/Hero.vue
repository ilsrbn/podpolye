<template>
  <div class="container" @click="shadow = !shadow">
    <img class="background" src="@/assets/images/gallery/1-test.jpg" alt="" />
    <img
      class="title"
      :class="shadow ? 'light' : ''"
      src="@/assets/images/logo/wide2.png"
    />
  </div>
</template>

<script>
export default {
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

  .title {
    position: absolute;
    width: 200%;
    padding: 0 55%;
    left: -50%;
    background-color: rgba(0, 0, 0, 0.9);
    transition-property: background-color;
    transition-duration: 50ms;
    transition-timing-function: ease-in-out;
    height: 100%;
    object-fit: contain;
    animation: appear 3s;
    &.light {
      background-color: rgba(0, 0, 0, 0.2);
      transition-property: background-color;
      transition-duration: 50ms;
      transition-timing-function: ease-in;
    }
  }

  .background {
    animation: appear 2s;
    min-height: 100vh;
  }
}

@keyframes appear {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>