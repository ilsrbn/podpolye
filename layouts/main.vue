<template>
  <div class="all">
    <Header @showMenu="showMenu" class="show" />
    <nuxt keep-alive class="cnt" :class="isNav ? 'hide' : ''" />
    <LazyFooter class="footer" :class="isNav ? 'hide' : ''" />
    <nav :class="isNav ? 'nav' : ''">
      <nuxt-link class="item" to="/">Главная</nuxt-link>
      <nuxt-link class="item" to="/events">События</nuxt-link>
      <nuxt-link class="item" to="/rules">Контакты</nuxt-link>
    </nav>
  </div>
</template>

<script>
export default {
  data: () => ({
    isNav: false,
  }),
  methods: {
    showMenu() {
      this.isNav = !this.isNav;
    },
  },
};
</script>
<style lang="scss" scoped>
.all {
  position: relative;
  .show {
    opacity: 1;
    transform: translateY(5rem);
    transition-property: opacity transform;
    transition-duration: 200ms;
    transition-timing-function: ease-in;
    position: fixed;
  }
  .cnt {
    margin-top: 5rem;
    &.hide {
      display: none;
    }
  }

  .footer {
    &.hide {
      display: none;
    }
  }

  nav {
    @media screen and (max-width: 768px) {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100vw;
      height: 100vh;
      overflow-y: hidden;
      opacity: 0;
      background: #0d0d0d;
      animation: fadeOut 200ms forwards;

      &.nav {
        animation: fadeIn 200ms forwards;
        margin: -1rem 0;
        .item {
          margin: 0;
          padding: 1rem 0;
          color: #bf895a;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
          font-weight: 600;
          font-size: 2rem;
          text-decoration: none;

          cursor: pointer;
          transition: color 150ms ease-in;

          &:hover {
            color: #8c7764;
          }

          &.nuxt-link-exact-active {
            color: #d9d5cc;
            transition: color 150ms ease-in;
          }
        }
      }
    }
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>