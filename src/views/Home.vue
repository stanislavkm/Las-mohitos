<template>
  <CafeLayout>
    <CartOrder :cart_data="CART">
    </CartOrder>
    <section class="home_section" id="home">
      <div class="home_wrapper">
        <h1>Лас МОХИТОС</h1>
        <p>Уникальное по своему формату и специфике заведение шаговой доступности в Томске. Вкладывая в каждое
          творение частицу своей души,
          мы всегда стремимся создать праздник в будни.</p>
      </div>
    </section>
    <section class="about_us_section bg_lime">
      <h2 class="white_header">Почему мы</h2>
      <div class="about_us">
        <div class="about_us__item">
          <div class="about_us__icon"><i class="fa fa-child" aria-hidden="true"></i></div>
          <h3>Ассортимент</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ipsam eos ab aliquam. Inventore cupiditate qui deleniti perspiciatis nostrum!</p>
        </div>
        <div class="about_us__item">
          <div class="about_us__icon"><i class="fa fa-check" aria-hidden="true"></i></div>
          <h3>Качество</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ipsam eos ab aliquam. Inventore cupiditate qui deleniti perspiciatis nostrum!</p>
        </div>
        <div class="about_us__item">
          <div class="about_us__icon"><i class="fa fa-cloud" aria-hidden="true"></i></div>
          <h3>Быстрая доставка</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ipsam eos ab aliquam. Inventore cupiditate qui deleniti perspiciatis nostrum!</p>
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
  <footer class="colored">
    <div class="footer_nav">
      <div class="about__tel">
        <a class="coloredFootLink" href="tel:+79521820430" title="Звонок +7 (952) 182-04-30">
          +7 (952) 182-04-30
        </a>
      </div>
      <div class="about__mail">
        <a class="coloredFootLink" href="https://www.instagram.com/lasmohitos_kafe/"  title="Instagram/Lasmohitos">
          <i class="fa fa-instagram" aria-hidden="true"></i>
        </a>
        <a class="coloredFootLink" href="https://wa.me/+79526794033" title="WhatsApp/Lasmohitos">
          <i class="fa fa-whatsapp" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </footer>
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