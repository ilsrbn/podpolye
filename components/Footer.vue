<template>
  <footer>
    <div class="footer-container">
      <div>Designed by: VOVANDOS</div>
      <div>Coded by: Serbin Inc.</div>
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
    }
  }
}
</style>