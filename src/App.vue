<template>

  <AppLayout :class="showMobileMenu ? '_lock' : ''">
      <router-view/>
  </AppLayout>


</template>

<script>
import AppLayout from '@/layouts/AppLayout'
import {mapActions} from "vuex";
import {mapGetters} from "vuex";

export default {
  name: 'App',
  data () {
    return {
      showMobileMenu: false,
      scrollPosition: null,
    }
  },
  components: { AppLayout },
  methods: {
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
      'GET_ITEMS_FROM_API',
      'TOGGLE_MODAL_VALUE',
      'TOGGLE_CART_VALUE'
    ]),
  },
  mounted() {
    this.GET_ITEMS_FROM_API();
    this.GET_TITLES_FROM_API();
    window.addEventListener('scroll', this.updateScroll);
  },
  computed: {
    ...mapGetters([
        'TITLES',
        'MODAL_VALUE',
        'CART_VALUE',
    ]),
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
