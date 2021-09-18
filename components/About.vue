<template>
  <div class="container">
    <div class="splash splash_big"><div class="splash__header">Что такое ПОДПОЛЬЕ?</div></div>
    <div class="splash"><div class="splash__header">Для чего наше пространство?</div></div>
    <div class="splash"><div class="splash__header">Какие меропрития вы проводите?</div></div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin-top: 2rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .splash {
    background-image: url('@/assets/images/index__splash.png');
    width: 47.5rem;
    height: 13.25rem;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 1;

    cursor: pointer;

    transition-property: opacity;
    transition-duration: 150ms;
    transition-timing-function: ease-in;

    display: flex;
    justify-content: center;
    align-items: center;

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
    }
  }



  .splash_big{
    width: 70rem;
    height: 18rem;

    .splash__header {
      font-size: 5.7rem;
      margin-right: 17rem;
      margin-bottom: 3rem;
    }
  }
}
</style>