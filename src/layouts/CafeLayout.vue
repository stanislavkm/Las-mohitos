<template>
  <header
      :class="[{colored: scrollPosition > 40}, contactClass]">
    <div class="header_nav">
      <router-link class="logo" to="/"><img src="../images/las-m_logo.png" alt=""></router-link>
      <div class="menu_toggle"
           @click="showMobileMenu = !showMobileMenu"
           :class="[showMobileMenu ? '_active' :'', {coloredMenu: scrollPosition > 40}, whiteToggleMenu]">
        <span></span>
      </div>
      <ul :class="showMobileMenu ? '_active' :''">
        <li v-for="(section, id) in this.$store.state.titles" :key="id" >
        <a class="header_li"
        :class="[{coloredLink: scrollPosition > 40}, whiteLink]" 
        :href="`/#${section.title}`"
        @click="closeMenu()">{{section.title}}</a>
        </li>
        <li><a class="header_li" href="/#meal" :class="[{coloredLink: scrollPosition > 40}, whiteLink]" @click="closeMenu()" >Комплексные обеды</a></li>
        <li><router-link class="header_li" :class="[{coloredLink: scrollPosition > 40}, whiteLink]" @click="closeMenu()" to="/contacts">О нас</router-link></li>
      </ul>
      <button class="phone_cart cart_btn" @click="modalClick();cartClick()"><i class="fa fa-shopping-cart" aria-hidden="true"></i></button>
      <button class="cart_btn" @click="modalClick();cartClick()">Корзина</button>
    </div>
  </header>
  <slot>
    <router-view></router-view>
  </slot>
  <footer
      :class="[{colored: scrollPosition > 40}, contactClass]">
    <div class="footer_nav"
         :class="[{footer_align: scrollPosition > 40}, footer_btw]">
      <div class="about__tel">
        <a :class="[{coloredFootLink: scrollPosition > 40 }, whiteLink]" href="tel:+79521820430" title="Звонок +7 (952) 182-04-30">
          +7 (952) 182-04-30
        </a>
      </div>
      <div class="about__mail">
        <a :class="[{coloredFootLink: scrollPosition > 40 }, whiteLink]" href="https://www.instagram.com/lasmohitos_kafe/"  title="Instagram/Lasmohitos">
          <i class="fa fa-instagram" aria-hidden="true"></i>
        </a>
        <a :class="[{coloredFootLink: scrollPosition > 40 }, whiteLink]" href="https://wa.me/+79526794033" title="WhatsApp/Lasmohitos">
          <i class="fa fa-whatsapp" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import {mapActions} from "vuex";
import {mapGetters} from "vuex";
export default {
  name: 'CafeLayout',
  data () {
    return {
      showMobileMenu: false,
      scrollPosition: null,
    }
  },
  components: {

  },
  methods: {
    closeMenu(){
      this.showMobileMenu = !this.showMobileMenu
    },
    updateScroll() {
      this.scrollPosition = window.scrollY
    },
    modalClick(){
      this.TOGGLE_MODAL_VALUE()
    },
    cartClick(){
      this.TOGGLE_CART_VALUE()
    },
    ...mapActions([
      'GET_TITLES_FROM_API',
//      'GET_ITEMS_FROM_API',
      'TOGGLE_MODAL_VALUE',
      'TOGGLE_CART_VALUE'
    ]),
  },
  mounted() {
//    this.GET_ITEMS_FROM_API();
//    this.GET_TITLES_FROM_API();
    window.addEventListener('scroll', this.updateScroll);
  },
  watch: {
showMobileMenu: {
showMobileMenu: true,
handler(val) {
document.body.classList.toggle('_lock', val);
},
},
},
  computed: {
    ...mapGetters([
      'TITLES',
      'MODAL_VALUE',
      'CART_VALUE',
    ]),
    whiteToggleMenu(){
      return {
        'coloredMenu': this.$route.path === '/contacts',
      }      
    },
    whiteLink(){
      return {
        'coloredFootLink': this.$route.path === '/contacts',
      }
    },
    contactClass() {
      return {
        'contactClass': this.$route.path === '/contacts',
      }
    },
    footer_btw() {
      return {
      'footer_btw': this.$route.path === '/contacts',
      }
    }
  },

}
</script>

<style>

.contactClass{
  background: linear-gradient(to right, #9fcf75, #55a93a);
  box-shadow: 0 5px 17px 0 rgb(34 60 80 / 15%);
}
.footer_btw{
  justify-content: space-between;
}
.modal-fade-enter-active {
  transform: translateY(0);
  transition: all 0.5s ease-in;
}

.modal-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.modal-fade-enter-from{
  transform: translateX(100vh);
  opacity: 1;
}
.modal-fade-leave-to {
  transform: translateX(100vh);
  opacity: 1;
}
</style>
