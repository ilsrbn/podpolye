<template>
  <div class="boeng">
    <Hero />
    <LazyAbout />
    <LazyGallery />
    <BottomSplash />
    <nuxt-link to="/events" class="sidelink" :class="isSide ? 'show': ''">
      <img :src="require('~/assets/images/ANNOUNCE.png')" alt="" />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data:() => ({
    isSide: false,
  }),
  methods: {
    show() {
      this.isSide = !this.isSide;
    },
    handleScroll() {
        if (window.scrollY >= window.innerHeight * 0.4) {
          this.isSide = true;
        } else {
          this.isSide = false;
        }
    },
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
}
</script>

<style lang="scss" scoped>
.boeng {
  position: relative;
  .sidelink {
    position: fixed;
    left: 0;
    top: 50%;
    width: 11vw;
    opacity: 0;
    z-index: 0;
    transition-property: opacity transform;
    transition-duration: 100ms;
    transition-timing-function: ease-in;
    transform: translateX(-11vw);
    img {
      max-width: 100%;
    }
    &.show {
      opacity: 1;
      transform: translateX(0);
      cursor: pointer;
      &:hover {
        opacity: 0.6;
      }
    }
  }
}
</style>