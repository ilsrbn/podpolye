<template>
  <div class="all">
    <Header class="show" />
    <nuxt class="cnt" />
    <LazyFooter />
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.show {
  opacity: 1;
  transform: translateY(5rem);
  transition-property: opacity transform;
  transition-duration: 200ms;
  transition-timing-function: ease-in;
  position: fixed;
}

.cnt {
  margin-top: 5rem;
}
</style>