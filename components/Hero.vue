<template>
  <div class="container" @click="shadow = !shadow">
    <img class="background" src="@/assets/images/gallery/1-test.jpg" alt="" />
    <img
      class="title"
      :class="shadow ? 'light' : ''"
      src="@/assets/images/logo/wide2.png"
    />
    <svg
      class="arrow"
      width="26.442059"
      height="70.16523"
      viewBox="0 0 6.9961279 18.564551"
      version="1.1"
      id="svg5"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <g id="layer1" transform="translate(-9.7311026,-3.0519878)">
        <path
          style="
            fill: none;
            fill-opacity: 0;
            stroke: #bf895a;
            stroke-width: 0.26458334;
            stroke-linecap: round;
            stroke-linejoin: bevel;
            stroke-miterlimit: 4;
            stroke-dasharray: none;
            stroke-opacity: 1;
            paint-order: markers fill stroke;
          "
          d="m 12.567708,15.875 v 2.116667 h -1.322916 l 1.984374,3.44154 1.984375,-3.44154 H 13.890625 V 15.875 Z"
          id="path14970"
        />
      </g>
    </svg>
    <!--<svg
   class="arrow"
   width="16.730911"
   height="14.508376"
   viewBox="0 0 4.4267202 3.8386746"
   version="1.1"
   id="svg5"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs2">
    <linearGradient
       id="linearGradient18227">
      <stop
         style="stop-color:#000000;stop-opacity:1;"
         offset="0"
         id="stop18225" />
    </linearGradient>
  </defs>
  <g
     id="layer1"
     transform="translate(-11.015807,-17.859376)">
    <path
       style="fill:none;fill-opacity:1;stroke:#bf895a;stroke-width:0.264583;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:markers fill stroke"
       d="m 13.229159,19.191571 -0.661451,-1.199904 h -1.322916 l 1.984367,3.44154 1.984382,-3.44154 h -1.322916 z"
       id="path14970" />
  </g>
</svg>-->
  </div>
</template>

<script>
export default {
  data: () => ({
    shadow: false,
  }),
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  max-height: 100vh;
  .title {
    position: absolute;
    width: 200%;
    padding: 0 55%;
    left: -50%;
    background-color: rgba(0, 0, 0, 0.9);
    transition-property: background-color;
    transition-duration: 100ms;
    transition-timing-function: ease-in-out;
    height: 100%;
    object-fit: contain;
    animation: appear 3s;
    &.light {
      background-color: rgba(0, 0, 0, 0.2);
      transition-property: background-color;
      transition-duration: 100ms;
      transition-timing-function: ease-in;
    }
  }

  .arrow {
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    width: 200px;
    height: 300px;

    animation: arrowJump 2s infinite;

    path {
      fill: rgba($color: #bf895a,  $alpha: 0);
      stroke-dasharray: 25 !important;
      stroke-dashoffset: 25;
      animation-name: draw;
      animation-delay: 3s;
      animation-duration: 3s;
      animation-fill-mode: forwards;
      stroke: #bf895a;
      stroke-width: 0.26458334;
      stroke-linecap: round;
      stroke-linejoin: bevel;
      stroke-miterlimit: 4;
      stroke-opacity: 1;
      paint-order: markers fill stroke;
    }
  }

  .background {
    animation: appear 2s;
    min-height: 100vh;

    @media screen and (max-width: 768px) {
      object-fit: cover;
      object-position: left;
    }
  }
}

@keyframes arrowJump {
  0% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(50px);
  }
  100% {
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes appear {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>