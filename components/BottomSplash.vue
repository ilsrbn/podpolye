<template>
  <div>
    <article class="splash">
      <button
        @click="spreaded = !spreaded"
        class="button"
        :class="spreaded ? 'active' : ''"
      >
        <img
          class="button__image"
          src="~/assets/images/index__splash-2.png"
          alt=""
        />
        <div class="button__text">Какие мероприятия вы проводите?</div>
      </button>
      <span class="content" :class="spreaded ? 'show' : ''">
        <article class="content__container">
          <div class="content__row">
            <div class="content__col col">
              <ul class="col__description">
                <li>&#8211; Репетиция научно-популярного проекта 15х4;</li>
                <li class="col__description-highlighted">&#8211; "Город Засыпает" (настольная игра по мотивам "Мафии");</li>
                <li>&#8211; Кинокружок;</li>
                <li class="col__description-highlighted">&#8211; Литературный кружок;</li>
                <li>&#8211; Историко-философский кружок;</li>
                <li class="col__description-highlighted">
                  &#8211; Тематические конференции к памятным датам, где можно узнать
                  что-то интересное или выступить со своим докладом;
                </li>
                <li>&#8211; Музыкальные вечера.</li>
              </ul>
            </div>
          </div>
        </article>
      </span>
    </article>
  </div>
</template>

<script>
export default {
  data: ()=>({
    spreaded: false,
  }),
};
</script>

<style lang="scss" scoped>
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
.splash {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: -15vw;
    margin-bottom: 2vw;

    @media screen and (max-width: 768px) {
      margin-top: unset;

      button.button {
        margin-left: 0;
        width: 100%;

        .button__image {
          max-width: 110%;
        }

        .button__text {
          left: 45%;
          font-size: 1.8rem;
        }
      }
    }

    .button {
      margin-left: 10vw;
      background: none;
      border: none;
      outline: none;
      position: relative;
      width: 50%;
      min-width: 800px;
      cursor: pointer;
      animation: shake 5s infinite;
      z-index: 1001;

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

        font-family: "Amatic SC", cursive;
        font-weight: bold;
        line-height: 100%;
        font-size: 3.75rem;
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
            display: flex;
            flex-direction: column;
            align-items: center;


            .col__description {
              font-size: 2.17rem;
              color: #d9d5cc;
              font-family: "Merriweather", serif;
              font-weight: 300;
              font-style: italic;
              text-align: center;
              width: 90%;
              list-style: none;
              letter-spacing: 0.005em;

              .col__description-highlighted {
                color: #BF895A;
              }
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
        min-width: 100vw;

        .button__text {
          font-size: 2.2rem;
          left: 45%;
        }
        .button__image {
          max-width: 110%;
        }
      }
      .content {
        .content__container {
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
              }
            }
          }
        }

        &.show {
          max-height: 200vh;
          margin-top: 20px;
        }
      }
    }
  }
</style>