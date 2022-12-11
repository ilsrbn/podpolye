<template>
  <div class="pg">
    <div class="block">
      <span class="image">
        <LampIcon />
      </span>
      <span class="text">
        <h1>Ой... Ошибочка)</h1>
        <p>Такой страницы нет. Если что- это 404 ошибка)</p>
        <nuxt-link class="link" to="/">Домой</nuxt-link>
      </span>
    </div>
  </div>
</template>

<script>
import LampIcon from '@/assets/images/404lamp.svg?inline'
export default {
  layout: "error",
  components: {
    LampIcon
  }
};
</script>

<style lang="scss" scoped>
.pg {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9999;
  background: #0d0d0d;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .block {
    display: flex;
    width: 80%;
    justify-content: space-around;
    align-items: center;
    .image svg {
      max-height: 150px;
      max-width: 150px;
      aspect-ratio: 1;
    }

    .text {
      color: #d9d5cc;
      display: flex;
      flex-direction: column;
      h1 {
        font-size: 3rem;
      }
      p {
        font-size: 1.5rem;
        font-family: "Nunito", cursive;
        font-weight: 300;
        font-style: italic;
      }
      .link {
        padding-top: 1rem;
        color: #bf895a;
        font-size: 2rem;
        transition: color 150ms ease-in;

        &:hover {
          color: #8c7764;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .block {
      flex-direction: column;
      justify-content: space-between;
      .text {
        align-items: center;
        text-align: center;
        .link {
          width: 100%;
          text-align: center;
        }
      }

    }
  }
}
</style>
