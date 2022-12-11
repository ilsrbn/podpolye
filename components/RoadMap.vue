<template>
  <div class="wrapper">
    <div class="steps">
      <h1>Как попасть в <span>подполье</span> ?</h1>
      <hr />
      <summary>
        Как Вы сами понимаете, подпольная деятельность - штука серьёзная.
        Поэтому, чтобы попасть к нам — нужно пройти испытания:
      </summary>
      <section>
        <span id="first" class="step">
          <small>Найти ворота во двор по адресу Канатная, 79</small>
          <div class="number">
            <img
              :src="require('~/assets/images/circle.png')"
              alt="Подполье Одесса Антикафе пространство"
            />
            <span>1</span>
          </div>
        </span>
        <span id="second" class="step">
          <div class="number">
            <img
              :src="require('~/assets/images/circle.png')"
              alt="Подполье Одесса Антикафе пространство"
            />
            <img
              class="line first"
              :src="require('~/assets/images/line1.png')"
              alt="Подполье Одесса Антикафе пространство"
            />
            <img
              class="line second"
              :src="require('~/assets/images/line2.png')"
              alt="Подполье Одесса Антикафе пространство"
            />
            <span>2</span>
          </div>
          <small
            >На воротах кодовый замок. Подсказка написана над воротами.</small
          >
        </span>
        <span id="third" class="step">
          <small
            >Зашли во двор? Справа есть пристройка с домофоном - звоните, и
            отворят вам.</small
          >
          <div class="number">
            <img
              :src="require('~/assets/images/circle.png')"
              alt="Подполье Одесса Антикафе пространство"
            />
            <span>3</span>
          </div>
        </span>
      </section>
    </div>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d545.2731816572806!2d30.746376766779903!3d46.46841686299222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c631796232f195%3A0x338aa1633d33e7f2!2z0YPQuy4g0JrQsNC90LDRgtC90LDRjywgNzksINCe0LTQtdGB0YHQsCwg0J7QtNC10YHRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwgNjUwMDA!5e0!3m2!1sru!2sua!4v1634148543903!5m2!1sru!2sua"
      class="map"
      allowfullscreen=""
      loading="lazy"
    ></iframe>
    <div class="contacts">
      <h1 class="desc__header">Как с нами связаться ?</h1>
      <p class="desc__paragraph" id="paragraph__first">
        По вопросам сотрудничества можно обращаться к
        <span>Кириллу (<a href="tel:+380631327600">+380631327600</a>)</span> или
        <span>Павлу (<a href="tel:+380634869957">+380634869957</a>)</span>.
      </p>
      <p class="desc__paragraph">
        А еще есть чат подпольщиков в <span>Телеграмме</span>. В нём можно
        свободно общаться, координировать мероприятия и получать ответы на
        вопросы.
      </p>

      <p class="desc__paragraph">
        Карта для донатов:
        <span
          v-gsap.from="{
            textContent: 0,
            duration: 0.3,
            snap: { textContent: 1 },
          }"
          >{{ card1 }}</span
        >
        <span
          v-gsap.from="{
            textContent: 0,
            duration: 0.3,
            delay: 0.3,
            snap: { textContent: 1 },
          }"
          >{{ card2 }}</span
        >
        <span
          v-gsap.from="{
            textContent: 0,
            duration: 0.3,
            delay: 0.6,
            snap: { textContent: 1 },
          }"
          >{{ card3 }}</span
        >
        <span
          v-gsap.from="{
            textContent: 0,
            duration: 0.3,
            delay: 0.9,
            snap: { textContent: 1 },
          }"
          >{{ card4 }}</span
        >
      </p>
      <span class="icons desc__paragraph">
        <a class="link" href="https://t.me/de_profundis_clamavi">
          <img
            :src="require('~/assets/images/telega.png')"
            alt="Подполье Одесса Антикафе пространство"
          />
        </a>
        <a class="link" href="https://www.instagram.com/podpolie.odessa/">
          <img
            :src="require('~/assets/images/insta.png')"
            alt="Подполье Одесса Антикафе пространство"
          />
        </a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    card1: 4441,
    card2: 1144,
    card3: 5406,
    card4: 1506,
  }),
  mounted() {
    this.$gsap.fromTo(
      ".desc__paragraph",
      { opacity: 0, x: "-10%" },
      {
        opacity: 1,
        x: 0,
        duration: 0.2,
        stagger: 0.3,
        scrollTrigger: {
          trigger: "#paragraph__first",
          start: "bottom bottom",
        },
      }
    );
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 768px) {
    padding: 2rem 2rem 0;
  }

  .steps {
    h1 {
      color: #d9d5cc;
      font-size: 7rem;
      font-weight: 700;

      span {
        color: #bf895a;
      }
    }

    hr {
      margin: 4.2rem 0;
    }

    summary {
      font-family: "Nunito", cursive;
      font-style: italic;
      font-weight: light;
      color: #d9d5cc;
      font-size: 2.19rem;
      letter-spacing: 0.065em;

      @media screen and (max-width: 1500px) {
        font-size: 1.5rem;
      }
    }

    section {
      padding: 7rem 21% 0;
      width: auto;
      min-width: 1240px;
      display: flex;
      flex-direction: column;

      @media screen and (max-width: 1500px) {
        padding: 7rem 10% 0;
      }

      .step {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: center;
        margin: 2rem -1rem;

        * {
          padding: 0 1rem;
        }

        small {
          font-size: 3.75rem;
          color: #bf895a;
          font-weight: bold;
          text-shadow: 0 0 3px #0d0d0d;
        }

        .number {
          position: relative;

          img {
            background: #0d0d0d;
          }

          .line {
            background: unset;
            position: absolute;
            padding: 0;
            margin: 0;

            &.first {
              top: -80%;
              left: 70%;
              z-index: -1;
            }

            &.second {
              bottom: -50%;
              left: 50%;
              z-index: -1;
            }
          }

          span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 7rem;
            color: #d9d5cc;
            font-weight: bold;
          }
        }
      }
    }

    @media screen and (max-width: 768px) {
      h1 {
        font-size: 2.5rem;
      }

      hr {
        margin: 1rem 0;
      }

      summary {
        font-size: 1rem;
      }

      section {
        min-width: unset;
        padding: 2rem 0;

        .step {
          margin: 1rem;

          * {
            padding: 0;
          }

          small {
            font-size: 1.5rem;
            padding: 0 1rem;
          }

          &#second {
            small {
              text-align: right;
            }
          }

          .number {
            span {
              font-size: 5rem;
            }

            img {
              max-width: 110px;
            }

            .line {
              display: none;
            }
          }
        }
      }
    }
  }

  .map {
    border: 6px dashed #d9d5cc;
    width: 70%;
    aspect-ratio: 1.3;
    margin: 4rem 0;
    @media screen and (max-width: 768px) {
      width: calc(100% + 4rem);
      border-left: none;
      border-right: none;
    }
  }

  .contacts {
    width: 100%;

    h1 {
      font-size: 7rem;
      color: #d9d5cc;
      font-weight: bold;
    }

    p {
      color: #d9d5cc;
      font-size: 28px;
      font-family: "Nunito", cursive;
      font-style: italic;
      font-weight: light;
      letter-spacing: 0.065em;
      margin: 1.5em 0;

      span {
        color: #bf895a;
        a {
          color: #bf895a;
          text-decoration: none;
          transition: color 0.15s ease-in;
          &:hover {
            color: #d9d5cc;
          }
        }
      }

      @media screen and (max-width: 1500px) {
        font-size: 2rem;
      }
    }

    .icons {
      display: flex;
      justify-content: center;

      * {
        margin: 0 1rem;
        opacity: 1;
        transition: opacity 150ms ease-in;
        max-height: 100px;
        height: 100px;

        @media screen and (max-width: 1500px) {
          max-height: 50px;
          height: 50px;
        }

        &:hover {
          opacity: 0.7;
        }
      }
    }

    @media screen and (max-width: 768px) {
      h1 {
        font-size: 2.5rem;
      }

      p {
        font-size: 1rem;
        margin: 25px 0;
      }
    }
  }
}
</style>
