<template>
  <transition name="modal-fade">
      <div class="cart_and_order">
        <transition name="cart-fade">
          <div class="cart" v-if="CART_VALUE">
              <div class="cart_nav">
                <button class="close_cart"
                        @click="cartClick()">
                  <i class="fa fa-angle-right" aria-hidden="true"></i>
                </button>
                <div class="cart__title">Корзина</div>
              </div>
              <p class="empty_cart" v-if="!cart_data.length">Ой, пусто!</p>
              <p class="empty_cart_desc" v-if="!cart_data.length">Добавьте товары в корзину, чтобы перейти к оформлению заказа</p>
              <cartItem
                  v-for="(cart_item, index) in cart_data"
                  :key="cart_item.title"
                  :cart_item_data="cart_item"
                  @deleteFromCart="deleteFromCart(index)"
                  @increment="increment(index)"
                  @decrement="decrement(index)"
              >
              </cartItem>
              <div class="cart_total" v-if="cart_data.length">{{cartTotalAmount}} 
              <span class="cart_total" v-if="cartTotalAmount===1">товар </span>
              <span class="cart_total" v-if="cartTotalAmount>=2 && cartTotalAmount<=4">товара </span>
              <span class="cart_total" v-if="cartTotalAmount>=5">товаров </span>
              на сумму: {{cartTotalCost}} ₽ 
              </div>
              <button class="make_order"
                      @click="cartClick();orderClick()"
                      v-if="cart_data.length"
                      >
                Оформить заказ
              </button>
                            <button class="make_order"
                      @click="cartClick()"
                      v-if="!cart_data.length"
                      >
                Вернуться к выбору
              </button>
          </div>
        </transition>

        <transition name="slide-fade">
          <div class="order" v-if="ORDER_VALUE">
            <div class="CartBack">
              <div class="order_nav">
                <button class="back_toCart"
                    @click="orderClick();cartClick()">
                  <i class="fa fa-angle-up" aria-hidden="true"></i>
                </button>
                <div class="cart__title">Оформление заказа</div>
              </div>
              <button class="close_cart x-mark"
                      @click="orderClick()">x</button>
            </div>
            <Form class="order_form" @submit.prevent=""> 
              <div class="mb20">
                <div>
                  <Field v-model="fio" class="order_input" type="text" placeholder="Имя" name="first_name" :rules="[isRequired, validateName]"/>
                </div>
                  <ErrorMessage class="errMessage" name="first_name" /> 
              </div>
              <div class="mb20">             
                <div>
                  <Field v-model="phone" class="order_input" type="text" placeholder="Телефон" name="phone" :rules="[isRequired, validatePhone]" />
                </div>
                  <ErrorMessage class="errMessage" name="phone" />
              </div>
              <div class="select_type">
                <p class="radio_p">Выберите способ получения заказа</p>
                <div class="radio_btns">
                  <div class="form_radio_btn">
                    <input
                        :cafeActive="cafeIsActive"
                        @click="cafeIsActive = !cafeIsActive, setTypeDelivery(1)"
                        :disabled="cafeIsActive"
                        id="radio-1" type="radio" name="order_type" value="cafe" checked>
                    <label for="radio-1">В кафе</label>
                  </div>
                  <div  class="form_radio_btn" >
                    <input
                        @click="cafeIsActive = !cafeIsActive, setTypeDelivery(2)"
                        :disabled="!cafeIsActive"
                        id="radio-2" type="radio" name="order_type" value="delivery">
                    <label for="radio-2">Доставка</label>
                  </div>
                </div>
              </div>
              <div v-if="cafeIsActive" class="select_type">
                <p class="radio_p">Выберите кафе</p>
                <div class="radio_btns">
                  <div class="form_radio_btn">
                    <input id="radio-5" type="radio" name="cafeID" value="mohito" checked @click="setAddress('Мохито')">
                    <label for="radio-5">Мохито</label>
                  </div>
                  <div  class="form_radio_btn" >
                    <input id="radio-6" type="radio" name="cafeID" value="chehiya" @click="setAddress('Чехия')">
                    <label for="radio-6">Чехия</label>
                  </div>
                </div>
              </div>
              <div class="mb20" v-if="!cafeIsActive">
                <div>
                <Field v-model="address" class="order_input" name="address" type="text" placeholder="Адрес" :rules="isRequired" />
                </div>
                <ErrorMessage class="errMessage" name="address" /> 
              </div>
              <div class="mb20" v-if="!cafeIsActive" >
                <div>
                <Field v-model="timeDelivery" class="order_input" name="timeDelivery" type="text" placeholder="Время доставки" :rules="isRequired" />
                </div>
                <ErrorMessage class="errMessage" name="timeDelivery" /> 
              </div>
              <div class="select_type">
                <p class="radio_p">Выберите способ оплаты</p>
                <div class="radio_btns">
                  <div class="form_radio_btn">
                    <input id="radio-3" type="radio" name="pay_type" value="cash" checked @click="setValue(1)">
                    <label for="radio-3">Наличными</label>
                  </div>
                  <div class="form_radio_btn">
                    <input id="radio-4" type="radio" name="pay_type" value="card" @click="setValue(2)">
                    <label for="radio-4">Картой</label>
                  </div>
                </div>
              </div>
              <button class="make_order" @click="postOrder">Отправить заказ</button>
            </Form>
            <span class="request_response">{{successMessage}}</span>
          </div>
        </transition>
      </div>
  </transition>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import {mapGetters} from "vuex"
import {mapActions} from "vuex";
import axios from 'axios';
import cartItem from "./CartItem"


export default {
  name: "CartAndOrder",
  components: {
    cartItem,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
        valueType: 1,
        cafeName: 'Мохито',
        fio: '',
        phone: '',
        timeDelivery: '',
        cartTotal: this.cartTotalCost,
        cafeIsActive: true,
        address: '',
        deliveryType: 1,
        successMessage: '',
    }
  },
  computed: {
    cartTotalCost() {
      return this.cart_data.reduce((acc, n) => acc + n.price * n.amount, 0);
    },
    cartTotalAmount(){
      return this.cart_data.reduce((acc, n) => acc + n.amount, 0);
    },
    cartTotalItems() {
      return this.cart_data.reduce((acc, rec) => acc + rec.amount, 0);
    },
    orderDesc() {
      return this.cart_data.reduce((acc, rec) => acc + `${rec.title} ,`, '')
    },
    itemDesc(){
      return this.cart_data.reduce((acc, rec, index) => [...acc, `${index+1}. ${rec.title} : ${rec.amount} шт., итого: ${rec.amount*rec.price}`], [])
    },
    ...mapGetters([
      'MODAL_VALUE',
      'CART_VALUE',
      'ORDER_VALUE'
    ])
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    onSubmit() {
      this.successMessage = 'Удачно отправлено!';
    },
    isRequired(value) {
      if (value && value.trim()) {
        return true;
      }
      return 'Ой! Нам необходимо это поле';
    },
    validateName(value) {
      // if the field is empty
      if (value.length <4) {
        return 'Это поле должно содержать больше 4 символов';
      }
      // All is good
      return true;
    },
    validatePhone(value){
      if (value.length <6){
        return 'Это поле не должно занимать меньше 6 символов';
      }
      if (value.length >15){
        return 'Это поле не должно занимать больше 15 символов';
      }
      return true;
    },
    setTypeDelivery(deliveryType) {
      this.deliveryType = deliveryType;
    },
    setAddress(cafeName) {
      this.cafeName = cafeName;
    },
    setValue(valueType) {
      this.valueType = valueType;
    },
//    onSubmit(){
 //     console.log(this.form)
 //   },
    postOrder() {
      const order_descriptionStr = this.itemDesc;
      const order_description = JSON.stringify(order_descriptionStr);
      const orderDataStr = {t_price: this.cartTotalCost, fio: this.fio, phone: this.phone, 
                            type_payment: this.valueType, address: this.cafeIsActive ? this.cafeName : this.address, 
                             t_count: this.cartTotalItems, order_description, 
                             type_delivery: this.deliveryType, time_delivery: !this.cafeIsActive ? this.timeDelivery : '---'}
      axios.post(`https://lm.perimeter.games/api/v1/order`, orderDataStr)
          .then((response) => {
            console.log(response);
            if (!response.data.success){
              this.successMessage = 'Упс! Данные не были отправлены. Проверьте, пожалуйста, их заполнение!';
            }
            else {
              this.successMessage = 'Данные успешно отправлены!';
            }
 //           this.successMessage = 'Удачно отправлено!';
          })
          .catch((error) => {
            console.log(error);
          });
    },
    ...mapActions([
      'DELETE_FROM_CART',
      'INCREMENT_CART_ITEM',
      'DECREMENT_CART_ITEM'
    ]),
    increment(index) {
      this.INCREMENT_CART_ITEM(index)
    },
    decrement(index) {
      this.DECREMENT_CART_ITEM(index)
    },
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index)
    },
    modalClick() {
      this.TOGGLE_MODAL_VALUE()
    },
    cartClick() {
      this.TOGGLE_CART_VALUE()
    },
    orderClick() {
      this.TOGGLE_ORDER_VALUE()
    },
    ...mapActions([
      'TOGGLE_MODAL_VALUE',
      'TOGGLE_CART_VALUE',
      'TOGGLE_ORDER_VALUE'
    ]),
  },
}
</script>

<style scoped>

.modal-fade-enter-active {
  transform: translateY(0);
  transition: all 0.8s ease-in;
}

.modal-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.modal-fade-enter-from{
  transform: translateX(100vh);
  opacity: 1;
}
.modal-fade-leave-to {
  transform: translateX(100vh);
  opacity: 1;
}

.slide-fade-enter-active {
  transform: translateY(0);
  transition: all 0.8s ease-in;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from{
  transform: translateY(100vh);
  opacity: 1;
}
.slide-fade-leave-to {
  transform: translateY(100vh);
  opacity: 1;
}

.cart-fade-enter-active {
  transform: translateY(0);
  transition: all 0.8s ease-in;
}
.cart-fade-leave-active {
  transform: translateY(0);
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.cart-fade-enter-from{
  transform: translateY(-100vh);
  opacity: 1;
}
.cart-fade-leave-to {
  transform: translateY(-100vh);
  opacity: 1;
}



.cart::-webkit-scrollbar{
  width: 10px;
}
.cart::-webkit-scrollbar-thumb{
  border-radius: 4px;
  height: 80px;
  box-shadow: inset 1px 1px 1px #fcfcfc;
  background-color: #abd326;
}
.cart::-webkit-scrollbar-track{
  border: 1px solid whitesmoke;
}
.order::-webkit-scrollbar{
  width: 10px;
}
.order::-webkit-scrollbar-thumb{
  border-radius: 4px;
  height: 80px;
  box-shadow: inset 1px 1px 1px #fcfcfc;
  background-color: #abd326;
}
.order::-webkit-scrollbar-track{
  border: 1px solid whitesmoke;
}
</style>