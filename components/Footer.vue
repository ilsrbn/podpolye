<template>
  <footer>
    <div class="footer__container">
      <div class="footer__item">
        <img
          :src="require('~/assets/images/logo/Лого.png')"
          alt="Лого Подполья"
        />
      </div>
      <div class="footer__item text">
        <div class="text-top">
          Некоммерческий, аполитичный, нерелигиозный проект. Сейчас он создается
          исключительно силами инициативной группы единомышленников, волонтеров
          и меценатов. Мы всегда рады помощи и открыты для общения и
          сотрудничества.
        </div>
        <div class="text-bottom">
          <span>2021</span>
          <img :src="require('~/assets/images/copyright.png')">
          <span>Designed by <a href="https://instagram.com/earl_g6">EarlG6</a></span>
          <span>Coded by <a href="https://t.me/Zhyvny">Serbin</a></span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
footer {
  width: auto;
  max-width: 100vw;
  overflow-x: hidden;
  padding: 0 2rem 2rem;
  margin: 0;
  margin-top: 2rem;

  background-color: #0d0d0d;
  border-top: 6px dashed #d9d5cc;

  .footer__container {
    display: flex;
    justify-content: space-around;
    align-content: center;

    .footer__item {
      flex: 0 1 35%;
      display: flex;
      justify-content: center;
      align-items: center;

      &.text {
        flex: 0 1 65%;
        border-left: 2px solid #d9d5cc;
        padding-left: 1rem;
        flex-direction: column;
        .text-top {
          font-size: 3.438rem;
          color: #d9d5cc;
          font-weight: 700;
        }
        .text-bottom {
          align-self: flex-end;
          color: #d9d5cc;
          font-size: 1.875rem;
          margin-left: -5rem;
          padding-top: 1rem;
          font-weight: 700;
          width: 120%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          border-top: 2px solid #d9d5cc;
          * {
            margin: 0 0.5vw;
          }
          a {
            margin: 0;
            color: #BF895A;
            transition: color 150ms ease-in;
            cursor: pointer;

            &:hover {
              color: #8C7764;
            }
          }
        }
      }
    }
  }
}
</style>