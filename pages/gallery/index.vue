<template>
  <div class="gallery">
    <div class="gallery__header">
      <h1> <img src="@/assets/icons/lines-to-left.svg" alt=""> Галерея событий <img src="@/assets/icons/lines-to-right.svg" alt=""></h1>
      <text-input class="textInput" v-model="search" @input="getItems" />
    </div>
    <hr>
    <gallery-card v-for="(post, i) in posts" :key="i" :item="post" />
  </div>
</template>

<script>
import galleryCard from '~/components/galleryCard.vue'
export default {
  components: { galleryCard },
  layout: 'main',
  head:() => ({
    title: 'Галерея - Подполье - Одесса'
  }),
  data: () => ({
    baseUrl: 'https://api.podpolye.org/api/post',
    search: '',
    posts: []
  }),
  created() {
    this.getItems()
  },
  methods: {
    async getItems() {
      try {
        const resp = await this.fetchItems()
        this.posts = resp.filter(post => post.posted)
      } catch(e) {
        console.log({e})
      }
    },
    fetchItems() {
      return this.$axios.$get(this.baseUrl + this.buildQuery())
    },
    buildQuery() {
      if (this.search) return '?' + new URLSearchParams({ search: this.search }).toString()
      else return ''
    }
  }
}
</script>
<style lang="scss" scoped>
.gallery {
  padding: 1.5rem 1rem 2rem;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-block: 24px;
    h1 {
      flex-basis: 60%;
    }
    .textInput {
      flex-basis: 40%;
    }
    @media screen and (max-width: 992px) {
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
      gap: 32px;
    }
  }
}
h1 {
  font-size: 7rem;
  color: #d9d5cc;
  img {
    max-height: 0.7em;
  }
  @media screen and (max-width: 992px) {
    font-size: 2.5rem;
  }
}
</style>
