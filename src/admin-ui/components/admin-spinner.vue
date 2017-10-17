<style lang="scss">
  @import "../style/vars";
  .admin-spinner-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .admin-spinner {
    position: relative;
    display: inline-block;
    width: 100px;
    height: 100px;
  }
  // tec type style
  .admin-spinner-tec-outside {
    @extend .admin-spinner-container;
    border-radius: 100%;
    border: 2px solid $primary;
    border-bottom-color: transparent;
    border-top-color: transparent;
    animation: tec-outside 5s infinite ease-in-out;
  }
  .admin-spinner-tec-inside {
    @extend .admin-spinner-container;
    border-radius: 100%;
    border: 4px solid $primary;
    border-right-color: transparent;
    animation: tec-inside 3s infinite ease-in-out;
  }
  .admin-spinner-tec-dot {
    @extend .admin-spinner-container;
    border-radius: 100%;
    background-color: $primary;
    opacity: .6;
    animation: tec-dot 2s infinite ease-in-out;
  }
  @keyframes tec-outside {
    0% {
      transform: rotate(0deg) scale(1, 1);
    }
    20% {
      transform: rotate(960deg) scale(1, 1);
    }
    40% {
      transform: rotate(0deg) scale(1, 1);
    }
    60% {
      transform: rotate(675deg) scale(.3, .3);
    }
    80% {
      transform: rotate(0deg) scale(1, 1);
    }
    100% {
      transform: rotate(0deg) scale(1, 1);
    }
  }
  @keyframes tec-inside {
    0% {
      transform: rotate(0deg) scale(.7, .7);
    }
    20% {
      transform: rotate(720deg) scale(.7, .7);
    }
    40% {
      transform: rotate(0deg) scale(.7, .7);
    }
    60% {
      transform: rotate(720deg) scale(.4, .4);
    }
    100% {
      transform: rotate(0deg) scale(.7, .7);
    }
  }
  @keyframes tec-dot {
    0% {
      transform: scale(.2, .2);
    }
    30% {
      transform: scale(.3, .3);
    }
    50% {
      transform: scale(.1, .1);
    }
    80% {
      transform: scale(.3, .3);
    }
    100% {
      transform: scale(.2, .2);
    }
  }
  // debounce type style
  .admin-spinner-debounce {
    @extend .admin-spinner-container;
    border-radius: 100%;
    background-color: $primary;
    opacity: .4;
  }
  .admin-debounce-1 {
    animation: debounce-1 2s infinite ease-in-out;
  }
  .admin-debounce-2 {
    animation: debounce-2 2s infinite ease-in-out;
  }
  @keyframes debounce-1 {
    0% {
      transform: scale(1, 1)
    }
    50% {
      transform: scale(0, 0)
    }
    100% {
      transform: scale(1, 1)
    }
  }
  @keyframes debounce-2 {
    0% {
      transform: scale(0, 0)
    }
    50% {
      transform: scale(1, 1)
    }
    100% {
      transform: scale(0, 0)
    }
  }
  // circle style
  .admin-spinner-circle {
    @extend .admin-spinner-container;
    position: relative;
  }
  .admin-spinner-circle-container {
    @extend .admin-spinner-container;
    background: none;
  }
  .admin-circle-dot {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 50%;
    width: 13%;
    height: 13%;
    border-radius: 100%;
    background-color: $primary;
    animation: ball 1.2s infinite ease-in-out;
  }
  @for $i from 1 through 20 {
    .admin-circle-container-#{$i} {
      transform: rotate(#{$i * 30}deg); 
    }
    .admin-circle-container-#{$i} > .admin-circle-dot {
      animation-delay: #{$i / 10}s
    }
  }
  @keyframes ball {
    0%, 39%, 100% {
        opacity: 0
    }
    40% {
        opacity: 1
    }
  }
</style>
<template>
  <div class="admin-spinner" :style="{ width: size, height: size}">
    <template v-if="type === 'tec'">
      <div class="admin-spinner-tec-dot" :style="{ 'background-color': color }"></div>
      <div class="admin-spinner-tec-inside"
        :style="{ 'border-width': parseInt(size) / 25 + 'px', 'border-color': color, 'border-right-color': 'transparent' }"></div>
      <div class="admin-spinner-tec-outside"
        :style="{ 'border-width': parseInt(size) / 100 + 'px', 'border-left-color': color, 'border-right-color': color }"></div>
    </template>
    <template v-if="type === 'debounce'">
      <div class="admin-spinner-debounce admin-debounce-1" :style="{ 'background-color': color }"></div>
      <div class="admin-spinner-debounce admin-debounce-2" :style="{ 'background-color': color }"></div>
    </template>
    <template v-if="type === 'circle'">
      <div class="admin-spinner-circle">
        <div
          class="admin-spinner-circle-container"
          v-for="i in 20"
          :class="'admin-circle-container-' + i">
          <span class="admin-circle-dot"
          :style="{ 'background-color': color }"></span>  
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:
  
  export default {
    name: 'admin-spinner',
    props: {
      size: [String, Number],
      color: String,
      type: {
        type: String,
        default: 'tec'
      }
    }
  }
</script>
