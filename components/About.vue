<template>
  <div class="container2">
    <article class="title">
      <h1
        v-gsap.fromTo="[
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: 'article.title',
              start: 'center bottom',
            },
          },
        ]"
        class="title__header"
      >
        Что такое <span class="title__header-colored">ПОДПОЛЬЕ</span>?
      </h1>
      <small
        v-gsap.fromTo="[
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.3,
            scrollTrigger: {
              trigger: 'article.title',
              start: 'center bottom',
            },
          },
        ]"
        class="title__description"
      >
        Это некоммерческое городское пространство для интеллектуального (и не
        очень) отдыха, развития или работы. Мы подготовили ответы на часто
        задаваемые вопросы для тех, кто недавно узнал о нас:
      </small>
    </article>
    <article class="splash" id="splash1">
      <button
        @click="collapse(1)"
        class="button"
        :class="spreaded1 ? 'active' : ''"
      >
        <img
          class="button__image"
          src="~/assets/images/index__splash-2.png"
          alt="ПРОСТРАНСТВО Подполье"
        />
        <div class="button__text">Для чего наше ПРОСТРАНСТВО ?</div>
      </button>
      <span class="content" :class="spreaded1 ? 'show' : ''">
        <article class="content__container">
          <h1 class="content__header">Мы работаем в двух форматах</h1>
          <div class="content__row">
            <div class="content__col col">
              <h2 class="col__header">антикафе / коворкинг</h2>
              <p class="col__description">
                Вы можете отдохнуть или поработать здесь. Мы предоставляем
                место, электричество, Wi-Fi, умные (и не очень) книги,
                настольные игры, чай/кофе. Обычно в будние дни до 17:00 у нас
                тихо и можно заняться своими делами, почитать или провести время
                с компанией.
              </p>
              <p class="col__description">
                Оплата free donation (желаемая сумма: 30 грн/час).
              </p>
            </div>
            <div class="content__col col">
              <h2 class="col__header">проведение мероприятий</h2>
              <p class="col__description">
                Стараемся регулярно организовывать различные совместные
                посиделки образовательного и развлекательного характеров.
              </p>
              <p class="col__description">
                Также вы можете провести у нас свое мероприятие, взяв помещение
                в аренду за 100 грн/час. Мы можем предоставить проектор,
                колонки, столы и стулья.
              </p>
            </div>
          </div>
        </article>
      </span>
    </article>
  </div>
</template>

<script>
export default {
  data: () => ({
    spreaded1: false,
    spreaded2: false,
  }),
  mounted() {
    this.$gsap.fromTo(
      "article#splash1",
      { opacity: 0, x: "100%" },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: "article#splash1",
          start: "top bottom",
        },
      }
    );
  },
  methods: {
    collapse(id) {
      if (id == 1) {
        this.spreaded1 = !this.spreaded1;
        return;
      } else if (id == 2) {
        this.spreaded2 = !this.spreaded2;
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container2 {
  margin: 30px 4.15vw 0 11vw;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    margin: 30px 4.15vw;
    max-width: 100vw;
  }

  .title {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 90px;
    .title__header {
      font-family: 'Amatic SC';
      font-style: normal;
      font-weight: 700;
      font-size: 112px;
      line-height: 141px;

      color: #D9D5CC;

      .title__header-colored {
        color: #bf895a;
      }
    }
    .title__description {
      margin-top: 30px;

      font-family: 'Nunito';
      font-style: italic;
      font-weight: 300;
      font-size: 35px;
      line-height: 44px;

      color: #D9D5CC;
    }

    @media screen and (max-width: 768px) {
      margin-bottom: 2rem;
      .title__header {
        font-size: 2.5rem;
        line-height: 100%;
        text-align: center;
      }

      .title__description {
        font-size: 1.1rem;
        line-height: 1.2em;
        text-align: justify;
      }
    }
  }

  .splash {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .button {
      background: none;
      border: none;
      outline: none;
      position: relative;
      width: 50%;
      min-width: 800px;
      cursor: pointer;
      animation: shake 5s infinite;

      .button__image {
        max-width: 100%;
        opacity: 1;
        transition-property: opacity;
        transition-duration: 100ms;
        transition-timing-function: ease-in;
      }
      .button__text {
        width: max-content;
        position: absolute;
        top: 50%;
        left: 40%;
        transform: translateX(-50%) translateY(-50%);

        font-family: 'Amatic SC';
        font-style: normal;
        font-weight: 700;
        font-size: 60px;
        line-height: 76px;
        color: #592202;

        transition-property: color;
        transition-duration: 100ms;
        transition-timing-function: ease-in;
      }
      &:hover,
      &.active {
        animation: none;
        .button__image {
          opacity: 0.5;
        }
        .button__text {
          color: #d9d5cc;
        }
      }
    }
    .content {
      width: 100%;
      margin: 0;

      overflow: hidden;
      max-height: 0;

      transition-property: max-height margin;
      transition-duration: 200ms;
      transition-timing-function: ease-in;

      .content__container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-top: 6px dashed #d9d5cc;
        border-bottom: 6px dashed #d9d5cc;
        padding: 3.75rem 0;

        .content__header {
          font-family: "Amatic SC", cursive;
          font-style: normal;
          font-weight: bold;
          text-transform: uppercase;
          color: #d9d5cc;
          font-size: 3.75rem;
          margin-bottom: 4.75rem;
        }

        .content__row {
          width: 100%;
          display: flex;

          .col {
            flex: 0 1 50%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .col__header {
              font-family: "Amatic SC", cursive;
              text-align: center;
              font-size: 3.75rem;
              font-style: normal;
              font-weight: bold;
              color: #bf895a;
              margin-bottom: 4.125rem;
            }
            .col__description {
              font-size: 2.17rem;
              color: #d9d5cc;
              font-family: "Nunito", serif;
              font-weight: 300;
              font-style: italic;
              text-align: left;
              width: 90%;
            }
          }
        }
      }

      &.show {
        max-height: 100vw;
        margin: 95px 0;
      }
    }

    @media screen and (max-width: 768px) {
      align-items: center;
      .button {
        min-width: 95vw;

        .button__text {
          font-size: 2rem;
          left: 45%;
        }
        .button__image {
          max-width: 110%;
        }
      }
      .content {
        margin-bottom: 0;
        .content__container {
          padding: 2rem 0;
          border-bottom: 3px dashed #d9d5cc;
          border-top: 3px dashed #d9d5cc;
          margin-bottom: 0;
          .content__header {
            font-size: 2rem;
            margin-bottom: 2rem;
          }

          .content__row {
            flex-direction: column;
            margin: -1rem 0;
            .col {
              padding: 1rem 0;
              .col__header {
                font-size: 2rem;
                margin-bottom: 0.5rem;
              }
              .col__description {
                font-size: 1rem;
                text-align: center;
              }
            }
          }
        }

        &.show {
          max-height: 200vh;
          margin-top: 20px;
          margin-bottom: 0;
        }
      }
    }
  }
}

@keyframes shake {
  0% {
    transform: rotate(0);
  }

  40% {
    transform: rotate(0);
  }

  45% {
    transform: rotate(2deg);
  }

  50% {
    transform: rotate(-2deg);
  }

  55% {
    transform: rotate(2deg);
  }

  60% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(0);
  }
}
</style>
