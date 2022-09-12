<template>
  <CafeLayout>
    <CartOrder :cart_data="CART">
    </CartOrder>
    <section class="home_section" id="home">
      <div class="home_wrapper">
        <h1>Лас МОХИТОС</h1>
        <p>Уникальное по своему формату и специфике заведение шаговой доступности в Томске. Вкладывая в каждое
          творение частицу своей души, будь то кондитерский шедевр или свежая выпечка из сдобного теста,
          мы всегда стремимся создать праздник в будни.</p>
      </div>
    </section>
    <section class="food_section bg_lime">
      <h2>Почему мы</h2>
      <div class="about_us">
        <div class="about_us__item">
          <div class="about_us__icon"><i class="fa fa-child" aria-hidden="true"></i></div>
          <h3>Качество</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ipsam eos ab aliquam. Inventore cupiditate qui deleniti perspiciatis nostrum minus dignissimos voluptate quis veritatis nisi commodi ipsum, libero quo tempore!</p>
        </div>
        <div class="about_us__item">
          <div class="about_us__icon"><i class="fa fa-check" aria-hidden="true"></i></div>
          <h3>Качество</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ipsam eos ab aliquam. Inventore cupiditate qui deleniti perspiciatis nostrum minus dignissimos voluptate quis veritatis nisi commodi ipsum, libero quo tempore!</p>
        </div>
        <div class="about_us__item">
          <div class="about_us__icon"><i class="fa fa-cloud" aria-hidden="true"></i></div>
          <h3>Качество</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ipsam eos ab aliquam. Inventore cupiditate qui deleniti perspiciatis nostrum minus dignissimos voluptate quis veritatis nisi commodi ipsum, libero quo tempore!</p>
        </div>
      </div>
    </section>
    <foodsection v-for="(section, index) in this.$store.state.titles"
                 :key="index"
                 :title="section.title"

    ></foodsection>
    <!--                 :class="{ 'bg_light': index % 2 == 0 }"  -->
    <mealsSection></mealsSection>
  </CafeLayout>

</template>

<script>
import CafeLayout from "../layouts/CafeLayout"
import foodsection from "../components/FoodSection";
import mealsSection from "../components/MealsSection"
import CartOrder from "../components/CartOrder";
import {mapActions, mapGetters} from "vuex";
export default {
  name: 'Home',
  data () {
    return {
      showMobileMenu: false,
      scrollPosition: null,
    }
  },

  components: {
    CafeLayout,
    foodsection,
    CartOrder,
    mealsSection,
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY
    },
    ...mapActions([
 //     'GET_ITEMS_FROM_API'
    ]),
  },
  computed: {
    ...mapGetters([
        'TITLES',
        'CART'
    ]),
  },
  mounted() {
//    this.GET_ITEMS_FROM_API();
    window.addEventListener('scroll', this.updateScroll);
  }
}
</script>

<style>

</style>