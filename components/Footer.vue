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
  width: 100%;
  padding: 4rem 1rem;

  background-color: #000204;

  .footer-container {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    text-align: center;

    div {
      font-family: 'Oswald';
      color: white;
      
      i {
        color:#bf9a78;
      }
    }
  }
}
</style>