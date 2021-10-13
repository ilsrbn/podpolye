<template>
  <div class="container">
    <h1>Правила нашего пространства:</h1>
    <ul class="rules">
      <li class="rule">
        <img :src="require('~/assets/images/checkboxTOP.png')" alt="" />
        <span
          >В «Подполье» запрещено курить, употреблять или приносить алкогольные
          напитки, наркотические или токсические вещества. В том числе мы не
          приходим в пространство под алкогольным или другим опьянением</span
        >
      </li>
      <li class="rule highlighted">
        <img :src="require('~/assets/images/checkboxBOT.png')" alt="" />
        <span
          >«Подполье» является неполитическим и нерелигиозным пространством.
          Обговаривай, дискутируй, но НЕ агитируй – уважай мнение и выбор
          других.</span
        >
      </li>
      <li class="rule">
        <img :src="require('~/assets/images/checkboxTOP.png')" alt="" />
        <span
          >«Подполье» является инклюзивным пространством. Тут рады всем, кто
          придерживается наших правил, независимо от возраста, расы, гендера и
          других индивидуальных особенностей.
        </span>
      </li>
      <li class="rule highlighted">
        <img :src="require('~/assets/images/checkboxBOT.png')" alt="" />
        <span
          >Мы заботимся о чистоте пространства и окружающей среды – убираем за
          собой мусор.</span
        >
      </li>
      <li class="rule">
        <img :src="require('~/assets/images/checkboxTOP.png')" alt="" />
        <span
          >Мы не оставляем личных вещей без присмотра. Всё оставленное
          становится общим.</span
        >
      </li>
      <li class="rule highlighted">
        <img :src="require('~/assets/images/checkboxBOT.png')" alt="" />
        <span
          >Мы уважаем команду волонтеров пространства и ценим их усилия, поэтому
          ставим все вещи на свои места и оставляем пространство таким, каким
          оно было до нашего прихода.</span
        >
      </li>
      <li class="rule">
        <img :src="require('~/assets/images/checkboxTOP.png')" alt="" />
        <span
          >Мы сотрудничаем и всегда ищем компромисс и взаимопонимание, а любые
          конфликты выносим за границы пространства.
        </span>
      </li>
      <li class="rule highlighted">
        <img :src="require('~/assets/images/checkboxBOT.png')" alt="" />
        <span
          >Мы уважаем всех посетителей и не мешаем им своими действиями
          (например, шумом). Так же мы приоритетно относимся к мероприятиям,
          которые проходят в «Подполье» и создаем для них рабочую
          атмосферу.</span
        >
      </li>
    </ul>
    <h2>
      Администрация оставляет за собой право требовать от вас покинуть помещение
      без объяснения причин.
    </h2>
    <h1>Благодарим за понимание!</h1>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: min-content;
  max-height: unset;
  margin: 0;
  h1 {
    font-size: 7rem;
    color: #d9d5cc;
  }
  h2 {
    font-size: 3.75rem;
    color: #d9d5cc;
    margin-bottom: 60px;
  }
  @media screen and (max-width: 1500px) {
    h1 {
      font-size: 5rem;
    }

    h2 {
      font-size: 2.5rem;
    }
  }
  .rules {
    display: flex;
    flex-direction: column;
    margin: 2.85rem 0;
    height: auto;
    .rule {
      padding: 1rem 0;
      display: flex;
      align-items: center;
      color: #d9d5cc;
      font-size: 3rem;
      font-weight: 700;
      height: auto;
      &.highlighted {
        color: #bf895a;
      }
    }
    img {
      max-height: 145px;
      margin-right: 1rem;
    }
    @media screen and (max-width: 1500px) {
      .rule {
        font-size: 2rem;
      }
      img {
        max-height: 100px;
      }
    }
  }

  @media screen and (max-width: 768px) {

    h1 {
      font-size: 3rem;
      text-align: center;
    }
    h2 {
      font-size: 2rem;
      margin-bottom: 30px;
    }

    .rules {
      .rule {
        font-size: 1.5rem;
        img {
          max-height: 40px;
        }
      }

    }
  }
}
</style>