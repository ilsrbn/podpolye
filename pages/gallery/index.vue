<template>
  <div class="gallery">
    <h1> <img src="@/assets/icons/lines-to-left.svg" alt=""> Галерея событий <img src="@/assets/icons/lines-to-right.svg" alt=""></h1>
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
    baseUrl: 'https://back.podpolye-api.serbin.co/api/post',
    search: null,
    posts: []
  }),
  async created() {
    try {
      const resp = await this.fetchItems()
      this.posts = resp.filter(post => post.posted)
    } catch(e) {
      console.log({e})
    }
    
  },
  methods: {
    fetchItems() {
      return this.$axios.$get(this.baseUrl + this.buildQuery())
    },
    buildQuery() {
      if (this.search) return '?' + new URLSearchParams(this.search).toString()
      else return ''
    }
  }
}
</script>
<style lang="scss" scoped>
.gallery {
  padding: 2rem 1rem;
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