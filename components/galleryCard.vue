<template>
  <div class="gallery__card" :class="{'gallery__card-left': direction === 'left', 'gallery__card-right': direction === 'right'}">
    <div class="gallery__images">
      <template v-if="item.attachments.length">
      <img :src="item.attachments[0].file_url" alt="">
      <img v-if="item.attachments[1]" :src="item.attachments[1].file_url" alt="">
      </template>
    </div>
    <div class="gallery__text">
      <h4>{{ item.title }} <br /> <span>({{ formatDate(item.event_date) }})</span></h4>
      <p class="truncate">{{ item.description }}</p>
      <nuxt-link :to="'/gallery/' + item.id">
        <button class="gallery__button">Смотреть</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('ru-RU', { year: '2-digit', month: 'short', day: 'numeric' })

    }
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    direction: {
      type: String,
      default: 'left'
    }
  },
}
</script>
<style scoped lang="scss">
.gallery__card {
  color: white;
  border-block: 2px solid rgba(217, 213, 204, 1);
  padding-block: 40px;
  display: flex;
  gap: 20px;
  &-left {
    flex-direction: row;
  }
  &-right {
    flex-direction: row-reverse;
  }

  @media screen and (max-width: 992px) {
    flex-direction: column-reverse;
  }
}

.gallery__images {
  flex: 1 0 50%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  img {
    width: 100%;
    height: 22.3vw;
    object-fit: cover;
    @media screen and (max-width: 992px) {
      height: calc(50vw - 50px);
    }
  }
}

.gallery__text {
  display: flex;
  flex-direction: column;
  width: 100%;
  h4 {
    br {
      display: none;
    }
    font-family: 'Amatic SC', cursive;
    font-size: 72px;
    font-weight: 700;
    line-height: 91px;
    letter-spacing: 0em;
    text-align: right;
    color: rgba(217, 213, 204, 1);
  }
  p {
    margin-top: 10px;
    font-family: 'Nunito', sans-serif;
    font-size: 36px;
    font-style: italic;
    font-weight: 300;
    line-height: 45px;
    letter-spacing: 0em;
    text-align: right;
    color: rgba(191, 137, 90, 1);

  }
  span {
    display: inline-block;
  }
  a {
    align-self: flex-end;
    margin-top: auto;
  }
  .gallery__button {
    padding: 0.5em 1em;
    font-family: 'Nunito', serif;
    font-size: 24px;
    font-weight: 500;
    font-style: italic;
    line-height: 1.2em;
    letter-spacing: 0em;
    background: rgba(191, 137, 90, 1);
    color: black;
    outline: none;
    border-radius: 48px;
    border: none;

    cursor: pointer;
    transition: all 150ms ease-in;
    &:hover {
      background: #8c7764;
      color: white;
    }
  }
  @media screen and (max-width: 992px) {
    h4 {
      font-size: 48px;
      line-height: 1.2em;
      line-break: none;
      text-align: center;
      br {
        display: block;
      }
      span {
        font-size: 36px;
        line-height: 1.2em;
      }
    }
    p {
      font-size: 24px;
      line-height: 1.2em;
    }
    a {
      margin-top: 24px;
    }
    .gallery__button {
      font-size: 18px;
    }
  }
}
.truncate {
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  text-align: justify;
}
</style>
