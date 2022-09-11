<template>
  <section class="food_section" id="meal">
    <h2>Комплексные обеды</h2>
    <div class="faq">
        <div v-for="(dayName, index) in Object.keys(this.$store.state.complexItems)" :key="index" class="faq-item">
          <input class="faq-input" type="checkbox" :id="`faq_${index+1}`">
          <label  class="faq-title" :for="`faq_${index+1}`">{{dayName}}</label>
          <div class="faq-text">
            <div class="food_wrapper">
              <item v-for="item in this.$store.state.complexItems[`${dayName}`]" :key="item.id"
                :item_data="item"
                @addToCart="addToCart"
              ></item>
            </div>
          </div>
                <hr class="faq_line">
        </div>
    </div>
  </section>
</template>

<script>
import item from '../components/item'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'mealsSection',
  components: {
    item
  },
  data(){
    return{
      daysArr: [1,2,3,4,5,6,7],
    }
  },
  methods:{
    ...mapActions([
      'GET_COMPLEX_ITEMS_FROM_API',
      'ADD_TO_CART'
    ]),
    addToCart(data) {
      this.ADD_TO_CART(data)
    }
  },
  mounted() {
    this.GET_COMPLEX_ITEMS_FROM_API()
  },
  computed: {
      ...mapGetters([
        'COMPLEX_ITEMS',
      ]),
  },
}
</script>

<style>
.food_section{
  padding-bottom: 100px;
}
</style>


