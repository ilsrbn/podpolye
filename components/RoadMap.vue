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
            <img :src="require('~/assets/images/circle.png')" alt="" />
            <span>1</span>
          </div>
        </span>
        <span id="second" class="step">
          <div class="number">
            <img :src="require('~/assets/images/circle.png')" alt="" />
            <img
              class="line first"
              :src="require('~/assets/images/line1.png')"
              alt=""
            />
            <img
              class="line second"
              :src="require('~/assets/images/line2.png')"
              alt=""
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
            <img :src="require('~/assets/images/circle.png')" alt="" />
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
      <h1>Как с нами связаться ?</h1>
      <p>
        По вопросам сотрудничества можно обращаться к
        <span>Кириллу (+380631327600)</span> или
        <span>Павлу (+380634869957)</span>.
      </p>
      <p>
        А еще есть чат подпольщиков в <span>Телеграмме</span>. В нём можно
        свободно общаться, координировать мероприятия и получать ответы на
        вопросы.
      </p>
      <span class="icons">
        <a class="link" href="https://t.me/de_profundis_clamavi">
          <img :src="require('~/assets/images/telega.png')" alt="" />
        </a>
        <a class="link" href="https://www.instagram.com/podpolie.odessa/">
          <img :src="require('~/assets/images/insta.png')" alt="" />
        </a>
      </span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
      font-family: "Merriweather", cursive;
      font-style: italic;
      font-weight: light;
      color: #d9d5cc;
      font-size: 2.19rem;
      letter-spacing: 0.065em;
    }

    section {
      padding: 7rem 21% 0;
      width: auto;
      display: flex;
      flex-direction: column;

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
  }
  .map {
    border: 6px dashed #d9d5cc;
    height: 40vw;
    width: 70%;
    margin: 4rem 0;
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
      font-size: 3.4rem;
      font-family: "Merriweather", cursive;
      font-style: italic;
      font-weight: light;
      letter-spacing: 0.065em;
      margin: 68px 0;
      span {
        color: #bf895a;
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

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
}
</style>