<template>
  <div class="content">
    <div class="events">
      <h1>В ближайшие 2 недели Вас ждет:</h1>
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div
            v-for="(event, index) in items"
            :key="index"
            class="swiper-slide"
          >
            <div class="event">
              <div class="text">
                <p>{{ event.summary }}</p>
                <div class="time">
                  <small class="date">{{
                    formatDate(event.start.dateTime)
                  }}</small>
                  <small>{{ event.start.dateTime.slice(11, 16) }}</small>
                </div>
              </div>
              <img
                class="event__image"
                v-if="event.attachments != undefined"
                :src="imageURL + event.attachments[0].fileId"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "main",
  data: () => ({
    items: [],
    swiperOption: {
      autoplay: true,
      loop: true,
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: true,
      keyboard: true,
      speed: 1000,
    },
    imageURL: "https://drive.google.com/uc?id=",
  }),

  async mounted() {
    let startDate = new Date().toISOString();
    let endDate = new Date(Date.now() + 1209600000).toISOString();

    let items = await this.$axios.$get(
      `https://www.googleapis.com/calendar/v3/calendars/65k2m2ep03mnqkuthtdkjs6h0g%40group.calendar.google.com/events?orderBy=startTime&timeMin=${startDate}&timeMax=${endDate}&singleEvents=true&key=AIzaSyC-OIomtul6ENmZLoZX0uMiJXD7Kwt0w74`
    );
    this.items = items.items;
    this.mySwiper.slideTo(3, 1000, false);
  },

  methods: {
    formatDate(date) {
      let newDate = Date.parse(date);
      return new Date(newDate).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 0 2rem;
  .events {
    align-self: flex-start;
    width: 100%;
    margin-bottom: 6rem;

    h1 {
      color: white;
      font-size: 3rem;
      margin-bottom: 2rem;
    }

    .event {
      width: 100%;
      height: 100%;
      padding-left: 2rem;
      display: flex;
      justify-content: space-between;
      border-left: 8px solid #bf895a;
      background: linear-gradient(
        to right,
        rgba($color: #bf895a, $alpha: 0.1),
        #0d0d0d 95%
      );
      border-radius: 8px;

      cursor: pointer;

      transition-property: border-left background;
      transition-duration: 80ms;
      transition-timing-function: ease-in;

      .event__image {
        max-width: 50%;
        margin-left: 2rem;
        border-radius: 5px;
        border-right: 2px solid #bf895a;

        transition-property: border-right;
        transition-duration: 80ms;
        transition-timing-function: ease-in;
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        margin: 1rem 0;

        p {
          color: #d9d5cc;
          font-size: 1rem;
          font-family: "Merriweather";
          align-self: flex-start;
          text-shadow: 3px 0 #0d0d0d;
          text-align: left;
        }
        .time {
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          small {
            color: #d9d5cc;
            width: max-content;
            word-wrap: normal;
            text-transform: capitalize;
            opacity: 0.7;
            font-size: 0.8rem;
            font-family: "Merriweather";
            text-shadow: 5px 0 #0d0d0d;
          }
        }
      }

      &:hover {
        border-left: 8px solid #400d09;
      }
    }
  }
}
</style>