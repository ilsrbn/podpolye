<template>
  <header :class="classN">
    <div class="header-container">
      <nuxt-link class="logo" to="/">
        <img src="@/assets/images/logo/wide2.png" alt="Логотип Подполья" />
      </nuxt-link>
      <nav>
        <nuxt-link class="item" to="/">Главная</nuxt-link>
        <nuxt-link class="item" to="/events">События</nuxt-link>
        <nuxt-link class="item" to="/rules">Контакты</nuxt-link>
      </nav>
    </div>
    <div class="header__container-mobile">
      <nuxt-link class="logo" to="/">
        <img src="@/assets/images/logo/wide2.png" alt="Логотип Подполья" />
      </nuxt-link>
      <div
        @click="$emit('showMenu')"
        class="icon"
        :class="isNav ? 'close' : 'hamburger'"
      >
        <svg
          v-if="!isNav"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#FFFFFF"
        >
          <path
            d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"
          />
        </svg>
        <svg
        v-else
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#FFFFFF"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
          />
        </svg>
      </div>
    </div>
  </header>
</template>
<script>
export default {
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
  background: #bf895a;
  position: fixed;
  top: -5rem;
  height: auto;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;

  box-shadow: -2px 0 0.5rem 0.2rem black;

  .header-container {
    @media screen and (max-width: 768px) {
      display: none;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;

    .logo {
      max-width: 10rem;
      margin-right: 1rem;

      img {
        max-width: 10rem;
      }
    }

    nav {
      display: flex;

      width: 50%;
      justify-content: flex-end;

      .item {
        margin: 0 2rem;
        color: #400d09;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 1.5rem;
        text-decoration: none;

        cursor: pointer;
        transition: color 150ms ease-in;

        &:hover {
          color: #8c7764;
        }

        &:last-child {
          margin-right: 0;
        }

        &.nuxt-link-exact-active {
          color: #d9d5cc;
          transition: color 150ms ease-in;
        }
      }
    }
  }

  .header__container-mobile {
    display: none;
    position: relative;

    @media screen and (max-width: 768px) {
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
      .icon {
        flex: 0 1 50%;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>