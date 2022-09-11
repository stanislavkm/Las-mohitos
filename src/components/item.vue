<template>
  <div class="item">
    <img :src="imgUrl + item_data.thumb" alt="Изображение товара">
    <div class="item_info">
      <div class="item_description">
        <div class="item_title"><h4>{{item_data.title}}, {{item_data.weight}}гр</h4></div>
        <div class="item_bju">{{item_data.utility}}</div>
        <div class="item_desc">{{item_data.description}}</div>
        <div class="item_price">{{item_data.price}} ₽</div>
      </div>
      <div class="item_controller">
        <button class="item_btn"
          @click="addToCart">
          В корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'item',
  data(){
    return{
      imgUrl: 'https://lm.perimeter.games',
    }
  },
  props: {

    item_data: {
      type: Object,
      default() {
        return{}
      }
    }
  },
  methods: {
    ...mapActions([

    ]),
    addToCart(){
      this.$emit('addToCart',this.item_data)
    },
  }
}
</script>

<style>
</style>