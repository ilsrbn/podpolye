<template>
  <div class="wrapper">
    <h1>Slider</h1>
    <div class="container">
      <div class="slide-wrapper" v-for="i in 6" :key="i">
        <div class="slide">
          <img
            class="slide-img"
            :class="count(i - 1)"
            :src="i - 1 == 1 ? require(`~/assets/images/gallery/${6}.jpg`)  : require(`~/assets/images/gallery/${i - 1}.jpg`)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["images"],
  methods: {
    count(i) {
      if (i == 0) {
        return "first";
      } else if (i == 2 || i == 5) {
        return "third";
      } else if (i == 3 || i == 4) {
        return 'hidden'
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 5rem 0 1rem;
  width: auto;
  overflow: hidden;

  h1 {
    color: whitesmoke;
    text-align: center;
    margin-bottom: 2rem;
  }

  .container {
    width: 100%;
    height: initial;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .slide-wrapper {
      min-width: 33.333%;
      max-width: 33.333%;
      height: initial;

      .slide {
        width: 100%;
        perspective: 1000px;
        perspective-origin: 50% 50%;
        height: 100%;

        .slide-img {
          width: 100%;
          object-fit: cover;
          &.first {
            transform: scale3d(0.7, 0.7, 2) rotateX(0deg) rotateY(29deg) rotateZ(0deg) translate3d(0px, 0px, 0px) skew(0deg, 0deg);
          }

          &.third {
            transform: scale3d(0.7, 0.7, 2) rotateX(0deg) rotateY(-29deg) rotateZ(0deg) translate3d(0px, 0px, 0px) skew(0deg, 0deg);
          }

          &.hidden {
            opacity: 0;
          }
        }
      }
    }
  }
}
</style>>