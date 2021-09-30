<template>
  <div class="container2">
    <div class="splash splash_big">
      <div class="splash__header">Что такое ПОДПОЛЬЕ?</div>
      <div class="splash__subheader">
        Это некомерческое городское пространство для интеллектуального (и не
        очень) отдыха, развития или работы. Мы подготовили ответы на вопросы для
        тех, кто недавно узнал о нас:
      </div>
    </div>
    <div
      class="splash"
      :class="spreaded1 ? 'wide' : ''"
      @click="spreaded1 = !spreaded1"
    >
      <div class="splash__header">Для чего наше пространство?</div>
    </div>
    <div
      class="splash"
      :class="spreaded2 ? 'wide' : ''"
      @click="spreaded2 = !spreaded2"
    >
      <div class="splash__header">Какие меропрития вы проводите?</div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    spreaded1: false,
    spreaded2: false,

  })
  
};
</script>

<style lang="scss" scoped>
.container2 {
  margin: 2rem 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  border-bottom: 6px dashed #d9d5cc;


  .splash {
    background-image: url("@/assets/images/index__splash-2.png");
    width: 47.5rem;
    height: 13.25rem;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 1;
    margin-bottom: 0;

    cursor: pointer;

    transition-property: opacity margin-bottom;
    transition-duration: 150ms;
    transition-timing-function: ease-in;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.splash_big {
      background-image: unset;
      width: 100%;
      cursor: default;
      .splash__header,
      .splash__subheader {
        color: #d9d5cc;
        width: 80%;
        margin: 0;
        text-align: left;
        margin: 1rem 0;
      }

      .splash__subheader {
        line-height: 2.5rem;
        font-size: 1.4rem;
        font-weight: 200;
        font-style: italic;
        color: rgba($color: #d9d5cc, $alpha: 0.7);
      }
    }

    &.splash_big:hover {
      opacity: unset;
      .splash__subheader {
        color: rgba($color: #d9d5cc, $alpha: 0.7);
      }
    }

    .splash__header {
      color: #592202;
      margin-right: 7rem;
      font-size: 3.75rem;

      transition: color 150ms ease-in;
    }

    &:hover {
      opacity: 0.5;

      .splash__header {
        color: white;
      }

      .splash__subheader {
        color: white;
      }
    }
  }

  .wide {
    margin-bottom: 15rem;
    transition: margin-bottom 100ms ease-in;
  }

  .splash_big {
    width: 70rem;
    height: 18rem;

    .splash__header {
      font-size: 5.7rem;
      margin-right: 17rem;
    }

    .splash__subheader {
      font-family: "Merriweather";

      color: #400d09;
      transition: color 150ms ease-in;
      font-size: 1.2rem;
      width: 70%;
    }
  }
}
</style>