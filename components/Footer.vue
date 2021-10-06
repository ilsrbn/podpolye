<template>
  <footer>
    <div class="footer-container">
      <div>Designed by <i>VOVANDOS</i></div>
      <div>Coded by <i>Serbin Inc.</i></div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss">
footer {
  width: auto;
  padding: 4rem 0 2rem;
  margin: 0 2rem;


  background-color: #0d0d0d;
  border-top: 3px dashed #D9D5CC;

  .footer-container {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    text-align: center;

    div {
      font-family: 'Merriweather', serif;
      color: #D9D5CC;
      
      i {
        color:#8C7764;
      }
    }
  }
}
</style>