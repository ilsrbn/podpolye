<template>

  <div>
    <RoadMap/>
  </div>

</template>

<script>
export default {
  head:() => ({
    title: 'Контакты - Подполье - Одесса'
  }),
  layout: 'main',
  mounted() {
    console.log(this.$route)
  }

}
</script>

<style>

</style>
