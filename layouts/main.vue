<template>
  <div class="all">
    <Header @showMenu="showMenu" :isNav="isNav" class="show"/>
    <nuxt @showMenu="showMenu" keep-alive class="cnt" :class="isNav ? 'hide' : ''"/>
    <LazyFooter class="footer" :class="isNav ? 'hide' : ''"/>
    <nav :class="isNav ? 'nav' : ''">
      <nuxt-link class="item" to="/">Главная</nuxt-link>
      <span :class="$route.path === '/rules' ? 'nuxt-link-exact-active' : ''" class="item" @click="rou('/rules')">Правила</span>
      <span :class="$route.path === '/gallery' ? 'nuxt-link-exact-active' : ''" class="item" @click="rou('/gallery')">Галерея</span>
      <span :class="$route.path === '/contacts' ? 'nuxt-link-exact-active' : ''" class="item" @click="rou('/contacts')">Контакты</span>
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
    rou(way) {
      this.showMenu()
      this.$router.push(way)
    }
  },
};
</script>
<style lang="scss" scoped>
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s;
}
.layout-enter,
.layout-leave-active {
  opacity: 0;
}

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
    display: none;
    @media screen and (max-width: 768px) {
      position: absolute;
      top: 0;
      left: 0;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100vw;
      height: 100vh;
      overflow-x: hidden;
      opacity: 0;
      background: #0d0d0d;
      animation: fadeOut 400ms forwards;

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
        animation: fadeIn 400ms forwards;
        margin: -1rem 0;
        display: flex;
      }
    }
  }
}

.fade-enter-active {
  animation: fadeIn .3s ease-in;
}

.fade-leave-active {
  animation: fadeOut .3s ease-in;
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
