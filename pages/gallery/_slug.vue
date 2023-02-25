<template>
  <div class="gallery__oneItem">
    <div class="gallery__oneItem-header">
      <h1>{{ title }}</h1>
      <span>{{ formatDate(event_date) }}</span>
    </div>
    <p>{{ description }}</p>
    <gallery-layout>
      <img v-for="(image, i) in attachments" :src="image.file_url" @click="$refs['image-preview'].show(image.file_url)" :key="i" alt="">
    </gallery-layout>
    <lazy-image-preview-modal ref="image-preview" />
  </div>
</template>
<script>

export default {
  layout: 'main',
  data: () => ({
    baseUrl: 'https://api.podpolye.org/api/post/',
    title: null,
    description: null,
    event_date: null,
    attachments: []
  }),
    methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
    }
  },
  async created() {
    const { slug } = this.$route.params
    try {
      const { title, description, event_date, attachments } = await this.$axios.$get(this.baseUrl + slug)
      this.title = title
      this.description = description
      this.event_date = event_date
      this.attachments = attachments
    } catch (e) {
      console.log({e});
    }
  }
}
</script>
<style lang="scss" scoped>
.gallery__oneItem {
  padding: 1rem 2rem;

  &-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    span {
      font-size: 5rem;
      color: #d9d5cc;
    }

      @media screen and (max-width: 992px) {
      flex-direction: column;
      align-items: flex-start;
      justify-content: unset;

      span {
        font-size: 2rem;
        line-height: 1.2em;
      }
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
    margin-top: 24px;
  }
}
p {
   margin-top: 10px;
  font-family: 'Nunito', sans-serif;
  font-size: 28px;
  font-style: italic;
  font-weight: 300;
  line-height: 1.2em;
  letter-spacing: 0em;

  margin-bottom: 24px;

  color: rgba(191, 137, 90, 1);

  @media screen and (max-width: 992px) {

      font-size: 20px;
      line-height: 1.2em;

  }

}
img {
  width: 100%;
  height: 22.5vw;
  object-fit: cover;
  @media screen and (max-width: 1239px) {
    height: 42vw;
  }
  @media screen and (max-width: 500px) {
    height: auto;
  }
}
</style>
