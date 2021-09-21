<template>
  <div class="wrapper">
    <h1>Slider</h1>
    <div class="container">
      <div v-swiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="image in 10" :key="image">
            
            <img
              class="slide-imagee"
              :src="require(`~/assets/images/gallery/${image - 1}.jpg`)"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    swiperOption: {
      autoplay: true,
      loop: true,
      slidesPerView: 3,
      effect: "coverflow",
      coverflowEffect: {
        slideShadows: false,
      },
    },
  }),
  methods: {},
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

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .swiper-container {
      padding: 5rem 0 10rem;
      height: initial;
    }

    .slide-imagee {
      max-width: 100%;
    }
  }
}
</style>>