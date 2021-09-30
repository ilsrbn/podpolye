<template>
  <div><h1>{{this.slug}}</h1></div>  
</template>

<script>
export default {
  layout: 'main',
  async asyncData({ params }) {
      const slug = params.slug // When calling /abc the slug will be "abc"
      return { slug }
    }
}
</script>

<style lang="scss" scoped>
h1{
  color: wheat;
}

</style>