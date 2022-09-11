<template>
  <section class="food_section" :id=title>
    <h2>{{title}}</h2>
    <div class="food_wrapper">
      <item v-for="item in this.$store.state.items[title]" :key="item.id"
          :item_data="item"
          @addToCart="addToCart"
      ></item>
    </div>
  </section>
</template>

<script>
import item from '../components/item'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'foodsection',
  components: {
    item
  },
  props:
    ['title']
  ,
  data(){
    return{
    }
  },
  computed: {
      ...mapGetters([
        'TITLES',
      ]),
  },
  methods:{
    ...mapActions([
      'GET_TITLES_FROM_API',
      'GET_ITEMS_FROM_API',
      'ADD_TO_CART'
    ]),
    addToCart(data) {
      this.ADD_TO_CART(data)
    }
  },
  mounted() {
 //   this.GET_ITEMS_FROM_API()
  }
}
</script>

<style>
</style>