<template>
  <div class="cartItem_wrapper">
    <div class="cartItem">
      <div class="cartItem_desc">
        <img :src="imgUrl + cart_item_data.thumb" alt="Изображение товара">
        <div class="cartItem__text">
          <div class="item_title"><h4>{{cart_item_data.title}}</h4></div>
          <div class="cartItem_description">{{cart_item_data.description}}</div>
          <div class="cartItem_quantity">
            <div class="cartItem_description">Кол-во: </div>
            <div class="items counter-wrapper">
              <div class="items__control"
                   @click="decrementItem">-</div>
              <div class="items__current">{{cart_item_data.amount}}</div>
              <div class="items__control plus"
                   @click="incrementItem">+</div>
            </div>
          </div>
        </div>
        <button class="dlt_cartItem"
        @click="deleteFromCart">x</button>
      </div>
      <hr>
      <div class="cartItem__count">
        <div class="item_price">{{cart_item_data.price}} ₽</div>
        <div class="item_total">Итого: {{cartItemTotal}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cartItem",
  data() {
    return {
      imgUrl: 'https://lm.perimeter.games',
    }
  },
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    decrementItem() {
      this.$emit('decrement')
    },
    incrementItem() {
      this.$emit('increment')
    },
    deleteFromCart() {
      this.$emit('deleteFromCart')
    }
  },
  computed: {
    cartItemTotal(){
        let itemTotal = this.cart_item_data.price * this.cart_item_data.amount;
        return itemTotal;
      }
  },

}
</script>

<style>

</style>