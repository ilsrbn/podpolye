<template>
  <div class="gallery__layout">
    <slot />
  </div>
</template>
<style scoped>
.gallery__layout {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  align-items: flex-start;
}
@media screen and (max-width: 1239px) {
  .gallery__layout {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 500px) {
  .gallery__layout {
    grid-template-columns: repeat(1, 1fr);
  }
}

</style>