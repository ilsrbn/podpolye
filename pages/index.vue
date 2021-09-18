<template>
  <div class="content">
    <Hero />
    <LazyAbout />
    <LazyGallery />
  </div>
</template>


<style>
body {
  font-family: "Amatic SC";
  overflow-x: hidden;
  background-color: #000204;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.content {
  max-width: 100vw;
  min-height: 100vh;
}
</style>