<template>
  <header>
    <div class="header-container">
      <nuxt-link class="logo" to="/">
        <img src="@/assets/images/logo/wide2.png" alt="Логотип Подполья" />
      </nuxt-link>
      <nav>
        <nuxt-link class="item" to="/">Главная</nuxt-link>
        <nuxt-link class="item" to="/announcements">События</nuxt-link>
        <nuxt-link class="item" to="/rules">правила</nuxt-link>
      </nav>
    </div>
  </header>
</template>
<script>
export default {
    name: 'Header'
}
</script>

<style lang="scss">
header {
  width: 100%;
  padding: 0 2rem;
  background: #bf9a78;
  position: sticky;
  top: 0;
  height: auto;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;

  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;

    .logo {
      max-width: 10rem;
      margin-right: 1rem;

      img {
        max-width: 10rem;
      }
    }

    nav {
      display: flex;

      .item {
        margin: 0 2rem;
        color: #592202;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 1.5rem;
        text-decoration: none;

        cursor: pointer;
        transition: color 150ms ease-in;

        &:hover {
          color: #995e3c;
        }

        &:last-child {
          margin-right: 0;
        }

        &.nuxt-link-active {
          color: white;
        }
      }
    }
  }
}
</style>