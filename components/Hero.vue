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

  animation: appear 5s;

  .title {
    position: absolute;
    width: 100%;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.9);
    height: 100%;
    object-fit: contain;
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