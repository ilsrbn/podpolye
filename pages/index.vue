<template>
  <div class="boeng">
    <Hero />
    <LazyAbout />
    <LazyGallery />
    <BottomSplash />
    <nuxt-link to="/events" class="sidelink" :class="isSide ? 'show' : ''">
      <img
        :src="require('~/assets/images/ANNOUNCE.png')"
        alt="Подполье Одесса Антикафе пространство"
      />
    </nuxt-link>
<!--    <war-modal class="war__modal"></war-modal>-->
  </div>
</template>

<script>
import warModal from "~/components/war-modal.vue";
export default {
  components: { warModal },
  head: () => ({
    title: "Подполье - Одесса",
  }),
  data: () => ({
    isSide: false,
  }),
  methods: {
    show() {
      this.isSide = !this.isSide;
    },
    handleScroll() {
      this.isSide = window.scrollY >= window.innerHeight * 0.4;
    },
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss">
.war__modal {
  .vm--overlay {
    background: rgba(0, 0, 0, 0.8);
  }
  .vm--modal {
    height: auto !important;
    width: auto !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0);
    max-width: 840px;
  }
  .modal__container {
    background: rgba(64, 13, 9, 0.95) !important;
    border-radius: 24px;
    padding: 1rem 2rem 1.5rem;
    * {
      color: #d9d5cc;
    }
    h3 {
      font-size: 3rem;
      margin-top: 0.3rem;
    }
    p, li {
      font-family: "Merriweather";
      font-size: 1rem;
      margin: 0.5rem 0;
    }
    li {
      margin-left: 1rem;
      font-size: 0.8rem;
    }
    a {
      color: #BF895A;
    }
  }
}
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

    @media screen and (max-width: 768px) {
      display: none;
    }
    img {
      max-width: 100%;
    }
    &.show {
      opacity: 1;

      cursor: pointer;
      &:hover {
        opacity: 0.6;
      }
    }
  }
}
</style>
