<template>
  <header :class="classN">
    <div class="header-container">
      <nuxt-link class="logo" to="/">
        <img src="~/assets/images/logo/wide2.png" alt="Подполье Одесса Антикафе пространство"/>
      </nuxt-link>
      <nav>
        <nuxt-link class="item" to="/">Главная</nuxt-link>
        <nuxt-link class="item" to="/gallery">Галерея</nuxt-link>
        <nuxt-link class="item" to="/rules">Правила</nuxt-link>
        <nuxt-link class="item" to="/contacts">Контакты</nuxt-link>
        <div class="links">
          <a class="link" href="https://t.me/de_profundis_clamavi">
            <img :src="require('~/assets/icons/tg_icon.svg')" alt="Подполье Одесса Антикафе пространство"/>
          </a>
          <a class="link" href="https://www.instagram.com/podpolie.odessa/">
            <img :src="require('~/assets/icons/inst_icon.svg')" alt="Подполье Одесса Антикафе пространство"/>
          </a>
        </div>
      </nav>
    </div>
    <div class="header__container-mobile">
      <nuxt-link class="logo" to="/">
        <img src="@/assets/images/logo/wide2.png" alt="Подполье Одесса Антикафе пространство"/>
      </nuxt-link>
      <div @click="$emit('showMenu')" class="icon__container">
        <button class="hamburger hamburger--collapse" :class="isNav? 'is-active' : ''" type="button">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  layout: 'main',
  props: ["classN", "isNav"],
  name: "Header",
};
</script>

<style lang="scss">
header {
  z-index: 5000;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  padding: 0;
  background: rgba(22, 22, 22, 0.77);
  position: fixed;
  top: -5rem;
  height: auto;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;

  box-shadow: -2px 0 0.5rem 0.2rem black;

  .header-container {
    @media screen and (max-width: 1024px) {
      display: none;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 80px;

    .logo {
      max-height: 50px;
      margin-right: 1rem;

      img {
        max-height: inherit;
      }
    }

    nav {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 34px;

      .item, .item:visited {
        font-family: 'Amatic SC';
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        text-decoration: none;
        color: #D9D5CC;

        cursor: pointer;
        transition: color 150ms ease-in;


        &:hover {
          color: #8c7764;
        }

        &.nuxt-link-exact-active {
          color: #8c7764;
          transition: color 150ms ease-in;
        }
      }

      .links {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 34px;

        .link {
          opacity: 1;
          transition: opacity 150ms ease-in;

          img {
            max-height: inherit;
          }

          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  }

  .header__container-mobile {
    display: none;
    position: relative;

    @media screen and (max-width: 1024px) {
      display: flex;
      width: 100%;
      max-width: 100vw;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;

      .logo {
        flex: 0 1 50%;

        img {
          max-width: 100%;
        }
      }
      .icon__container {
        flex: 0 1 50%;
        position: relative;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .hamburger-inner, .hamburger-inner::after, .hamburger-inner::before {
          background-color: #d9d5cc;
        }
        .hamburger-box:focus-visible {
          outline: none;
          border: none;
        }
        .hamburger:focus-visible {
          border: none;
          outline: none;
        }
        .hamburger:hover,
        .hamburger.is-active:hover {
          opacity: 1;
        }


        .show {
          position: absolute;
          opacity: 1;
          top: 50%;
          transform: translateY(-50%);
          right: 0;
          transition: opacity 150ms ease-in;
        }

        .hide {
          position: absolute;
          opacity: 0;
        }
      }
    }
  }
}
</style>
