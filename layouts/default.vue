<template>
  <div>
    <Header :classN="appear ? 'hide' : 'show'" />
    <nuxt />
    <LazyFooter />
  </div>
</template>

<script>
export default {
  data: () => ({
    appear: true
  }),

  methods: {
    handleScroll () {
      if (window.scrollY <= (window.innerHeight * 0.6)) {
        this.appear = true

      } else {
        this.appear = false

      }
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>
<style lang="scss" scoped>
.hide {
  opacity: 0;
  transform: translateY(0);
  transition-property: opacity transform;
  transition-duration: 200ms;
  transition-timing-function: ease-in;
}

.show {
  opacity: 1;
  transform: translateY(5rem);
  transition-property: opacity transform;
  transition-duration: 200ms;
  transition-timing-function: ease-in;
}
</style>