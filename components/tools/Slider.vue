<template>
  <client-only>
    <div class="wrapper">
      <h1>Наша галерея</h1>
      <div class="container3">
        <div v-swiper="second" instance-name="another">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="image in firstArr" :key="image">
              <img
                class="slide-imagee"
                :src="require(`~/assets/images/gallery/${image}.jpg`)"
                :alt="`Подполье. Фото галереи №${image}`"
              />
            </div>
          </div>
        </div>
        <div
          v-swiper="swiperOption"
          @slidePrevTransitionStart="move('prev')"
          @slideNextTransitionStart="move('next')"
          class="chiiii"
        >
          <div class="black"></div>
          <div class="swiper-wrapper another">
            <div class="swiper-slide" v-for="image in secondArr" :key="image">
              <img
                class="slide-imagee"
                :src="require(`~/assets/images/gallery/${image}.jpg`)"
                :alt="`Подполье. Фото галереи №${image}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  data: () => ({
    firstArr: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    secondArr: ["3", "2", "1", "0", "9", "8", "7", "6", "5", "4"],
    swiperOption: {
      autoplay: true,
      loop: true,
      zoom: true,
      speed: 500,
      simulateTouch: false,
      centeredSlides: true,
      slidesPerView: 1,
      allowTouchMove: false,
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      }
    },
    second: {
      autoplay: {
        reverseDirection: true,
      },
      speed: 500,
      zoom: true,
      simulateTouch: false,
      loop: true,
      centeredSlides: true,
      slidesPerView: 1,
      allowTouchMove: false,
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      }
    },
  }),
  methods: {
    move(direction) {
      if (direction == "next") {
        this.another.slidePrev();
        return;
      } else if (direction == "prev") {
        this.another.slideNext();
        return;
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
    font-size: 7rem;
    color: #d9d5cc;
    text-align: center;
    margin-bottom: 2rem;
  }

  .container3 {
    width: 100%;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .swiper-container {
      height: initial;
      margin-top: 30px;

      .swiper-wrapper {
        .swiper-slide {
          .slide-imagee {
            max-width: 100%;
          }
        }
      }
      &.chiiii {
        position: relative;
        .black {
          position: absolute;
          width: calc(66.666% + 20px);
          z-index: 9999;
          height: 25vw;
          background: #0d0d0d;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    margin: 2rem 0 1rem;

    h1 {
      font-size: 5rem;
    }

    .black {
      display: none;
    }
  }
}
</style>>