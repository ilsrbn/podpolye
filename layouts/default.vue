<template>
  <div class="all">
    <Header @showMenu="showMenu" :classN="appear ? 'hide' : 'show'" />
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
    appear: true,
    isNav: false,
  }),

  methods: {
    showMenu() {
      this.isNav = !this.isNav;
    },
    handleScroll() {
      if (!this.isNav) {
        if (window.scrollY <= window.innerHeight * 0.2) {
          this.appear = true;
        } else {
          this.appear = false;
        }
      }
    },
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<style lang="scss" scoped>
.all {
  position: relative;
  .hide {
    opacity: 0;
    transform: translateY(0);
    transition-property: opacity transform;
    transition-duration: 200ms;
    transition-timing-function: ease-in;
  }

  .show {
    opacity: 1;
    transform: translateY(5rem);
    transition-property: opacity transform;
    transition-duration: 200ms;
    transition-timing-function: ease-in;
  }

  .cnt {
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
    display: none;
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

      &.nav {
        animation: fadeIn 200ms forwards;
        margin: -1rem 0;
      }
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

@keyframes fadeOut {
  to {
    opacity: 0;
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>