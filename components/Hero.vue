<template>
  <div class="container">
    <img class="background" src="@/assets/images/gallery/1.jpg" alt="">
    <img class="title" src="@/assets/images/logo/wide2.png">

  </div>
</template>

<script>
export default {

}
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
    height: 100%;
    object-fit: contain;
    animation: appear 3s;

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