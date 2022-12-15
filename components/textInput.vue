<template>
  <div class="searchInput" :class="{ focus: !!value.length }">
    <label for="searchInput">Найти событие</label>
    <input type="text" id="searchInput"  :value="value" @input="$emit('input', $event.target.value)">
    <img src="@/assets/icons/search.svg" alt="Search Icon"/>
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.searchInput {
  position: relative;
  width: 100%;
  input {
    background: #0d0d0d;
    border: 1px solid white;
    border-radius: 32px;
    padding-block: 5px;
    padding-left: 24px;

    font-family: Amatic SC;
    font-size: 40px;
    font-weight: 700;
    line-height: 50px;
    letter-spacing: 0.025em;
    color: rgba(217, 213, 204, 1);

    min-width: 25vw;
    width: 100%;

  }
  label {
    position: absolute;
    left: 24px;
    top: 50%;
    background: #0d0d0d;
    padding-inline: 5px;
    transform: translateY(-50%);
    color: rgba(217, 213, 204, 1);
    font-size: 40px;
    scale: 1;

    transition: all 150ms ease-in;
  }
  &.focus, &:has(input:focus) {
    label {
      top: 0;
      font-size: 16px;
    }
  }

  img {
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
