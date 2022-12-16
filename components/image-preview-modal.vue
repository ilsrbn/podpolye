<template>
  <lazy-modal v-model="isOpen">
    <img :src="image" />
  </lazy-modal>
</template>

<script>


export default {
  name: "image-preview-modal",
  components: {
  },
  data: () => ({
    image: null,
    isOpen: false
  }),
  methods: {
    show(image) {
      this.image = image
      this.isOpen = true;
    },
    hide() {
      this.image = null
      this.isOpen = false
    },
  }
}
</script>

<style scoped lang="scss">

    img {
      height: auto;
      object-fit: contain;
      max-height: 90vh;
      max-width: 100%;
    }
</style>
