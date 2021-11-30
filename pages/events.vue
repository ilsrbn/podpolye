<template>
  <div class="content">
    <div class="events">
      <div v-if="!loaded" class="preload" :class="light ? 'loaded' : ''">
        <LampIcon class="lamp" :class="light ? 'loaded' : ''" />
      </div>
      <div class="page" :class="loaded ? 'show' : ''">
        <h1>Что Вас ждёт в ближайшие 2 недели:</h1>
        <hr />
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div
              v-for="(event, index) in items"
              :key="index"
              class="swiper-slide"
            >
              <div class="event">
                <img
                  class="event__image"
                  v-if="event.attachments != undefined"
                  :src="imageURL + event.attachments[0].fileId"
                  alt="Подполье Одесса Антикафе пространство"
                />
                <img
                  v-else
                  class="event__image"
                  :src="require('~/assets/images/gallery/1-test.jpg')"
                  alt="Подполье Одесса Антикафе пространство"
                />
                <div class="text">
                  <h1 class="title">{{ event.summary }}</h1>
                  <!--<p v-if="event.description" class="description">{{ event.description }}</p>-->
                  <div :class="!event.description ? 'bordered-top' : ''" class="time bordered-top">
                    <span class="el">
                      <img :src="require('~/assets/images/time.png')" alt="Подполье Одесса Антикафе пространство" />
                    </span>
                    <span class="el" v-if="event.start.dateTime != undefined">
                      <small class="date">
                        {{ formatDate(event.start.dateTime) }}
                      </small>
                      <small>{{ event.start.dateTime.slice(11, 16) }}</small>
                    </span>
                    <span class="el" v-else>
                      <small class="date">
                        {{ formatDate(event.start.date) }}
                      </small>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <Rules />
  </div>
</template>

<script>
import LampIcon from '@/assets/images/лампа2.svg?inline'
export default {
  head:() => ({
    title: 'События - Пространство Подполье , Одесса'
  }),
  components: {
    LampIcon
  },
  layout: "main",
  data: () => ({
    loaded: false,
    light: false,
    items: [],
    swiperOption: {
      autoplay: {
        disableOnInteraction: false,
        delay: 2000,
      },
      loop: true,
      slidesPerView: 1.5,
      centeredSlides: true,
      spaceBetween: 30,
      keyboard: true,
      speed: 1000,
      breakpoints: {
        768: {
          slidesPerView: 3
        }
      }
    },
    imageURL: "https://drive.google.com/uc?id=",
  }),

  async created() {
    let startDate = new Date().toISOString();
    let endDate = new Date(Date.now() + 1209600000).toISOString();

    let items = await this.$axios.$get(
      `https://www.googleapis.com/calendar/v3/calendars/65k2m2ep03mnqkuthtdkjs6h0g%40group.calendar.google.com/events?orderBy=startTime&timeMin=${startDate}&timeMax=${endDate}&singleEvents=true&key=AIzaSyC-OIomtul6ENmZLoZX0uMiJXD7Kwt0w74`
    );
    this.items = items.items;
  },

  mounted() {
    setTimeout(() => {
      if (window.innerWidth > 768) {
        this.mySwiper.slideTo(3, 1000, false);
      } else {
        this.mySwiper.slideTo(2, 1000, false);
      }
    }, 1000);
    this.light = true;
    setTimeout(() => {
      this.loaded = true;
    }, 2000);
  },

  methods: {
    formatDate(date) {
      let newDate = Date.parse(date);
      return new Date(newDate).toLocaleDateString("ru-RU", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
    hr {
      margin: 4.25rem 0;
    }
.content {
  position: relative;
  width: 100%;
  max-height: unset;
  padding: 1rem 2rem;
  .preload {
    position: absolute;
    z-index: 9999;
    top: -5rem;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba($color: #0d0d0d, $alpha: 1);
    padding: 0;
    margin: 0;

    opacity: 1;

    transition: opacity 200ms 1s ease-in;
    .lamp {
      height: 100px;
      #g30 {
        path {
          fill: #d9d5cc !important;
          stroke: rgba($color: #fef86b, $alpha: 0) !important;

          transition-property: fill stroke;
          transition-duration: 100ms;
          transition-timing-function: ease-in;
        }
      }
      &.loaded {
        #g30 {
          path {
            fill: #fef86b !important;
            stroke: rgba($color: #fef86b, $alpha: 1) !important;
          }
        }
      }
    }
    &.loaded {
      opacity: 0;
    }
  }
  .events {
    align-self: flex-start;
    width: 100%;
    padding: 1rem 0 0;
    overflow-x: hidden;

    h1 {
      color: #d9d5cc;
      font-size: 5rem;
      margin: 0;
      line-height: 5rem;
    }

    .swiper-slide {
      border: 6px dashed #d9d5cc;
      outline: none;

      text-decoration: none;
      opacity: 0.5;
      transition: opacity 150ms ease-in;

      .event {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0;

        .event__image {
          max-width: 100%;
          outline: 6px solid #d9d5cc;

          transition-property: border-right;
          transition-duration: 80ms;
          transition-timing-function: ease-in;
        }

        .text {
          display: flex;
          flex-direction: column;
          width: 100%;

          h1 {
            color: #d9d5cc;
            font-size: 3rem;
            font-family: "Amatic SC", cursive;
            font-weight: 600;
            letter-spacing: 2px;
            text-align: center;
            margin-bottom: 0;
            padding: 1rem 0;
          }
          .description {
            border-top: 1px solid #d9d5cc;
            border-bottom: 1px solid #d9d5cc;
            color: #BF895A;
            font-family: 'Merriweather', cursive;
            font-style: italic;
            font-weight: light;
            font-size: 1.875rem;
            padding: 5px;
            text-align: center;
          }
          .time {
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: space-around;
            align-items: center;
            padding: 1rem;

            &.bordered-top {
              border-top: 1px solid #d9d5cc;
            }
            .el {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              img {
                max-height: 5rem;
              }
            }

            small {
              color: #d9d5cc;
              width: max-content;
              word-wrap: normal;
              text-transform: uppercase;
              opacity: 0.7;
              font-size: 2.18rem;
              font-family: "Merriweather", serif;
              font-style: italic;
            }
          }
        }
      }
      &.swiper-slide-active {
        opacity: 1;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .events {
      h1 {
        font-size: 2.5rem;
        line-height: unset;
        text-align: center;
      }
      hr {
        margin: 2rem 0;
      }
      small {
        font-size: 1.2rem !important;
      }

      .swiper-slide {

      border: 3px dashed #d9d5cc;

      .event {
        img {
          outline: 3px solid #d9d5cc !important;
        }
        .text {
          .description {
            display: none;
            font-size: 1rem;
          }
          .time {
            border-top: 1px solid #d9d5cc;
          }
          h1 {
            font-size: 2.2rem !important;
          }
                  .time {
          .el img {
            max-height: 50px !important;
            outline: none !important;
          }
        }
        }

      } }
    }
  }
  @media screen and (max-width: 768px) {
    hr {
      margin: 2rem 0;
    }

  }
}
</style>
