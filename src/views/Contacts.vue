<template>
  <CafeLayout>
    <div class="white_bg">
      <CartOrder :cart_data="CART">
      </CartOrder>
      <section class="contacts_section">
        <div class="contacts">
          <div class="contacts__svetlyi">
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A5147b5903c247d157dc9bc338dcd03bfe2369ffa9d6d52c2a92ffd9555049d73&amp;source=constructor" width="550" height="260" frameborder="0"></iframe>
            <div class="contacts_description">
              <div class="contacts_title">Кафе-пекарня Лас Мохитос</div>
              <div class="contacts_desc"><i class="fa contacts_icon fa-map-marker" aria-hidden="true"></i>Поселок Светлый, 15А</div>
              <div class="contacts_desc"><i class="fa contacts_icon clock_icon fa-clock-o" aria-hidden="true"></i>9:00 - 20:00</div>
              <div class="contacts_desc"> <i class="fa contacts_icon fa-phone" aria-hidden="true"></i>+7 (952) 679-40-33</div>
            </div>
          </div>
          <hr class="contacts_btw">
          <div class="contacts__svetlyi">
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A840b81e31685150c5ba3f1479ab7e58d388e3e0f0571090215d740a4cfdfa23e&amp;source=constructor" width="550" height="260" frameborder="0"></iframe>
            <div class="contacts_description">
              <div class="contacts_title">Кафе-пекарня Чехия</div>
              <div class="contacts_desc"><i class="fa contacts_icon fa-map-marker" aria-hidden="true"></i>ул. Партизанская, 8В</div>
              <div class="contacts_desc"><i class="fa contacts_icon fa-clock-o" aria-hidden="true"></i>9:00 - 20:00</div>
              <div class="contacts_desc"><i class="fa contacts_icon fa-phone" aria-hidden="true"></i>+7 (952) 182-04-30</div>
            </div>
          </div>
          <hr class="contacts_btw">
          <div class="contacts__paritzanskaya">
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aee8bf0b8c6da52d9840f92e01c697c27984a33e6c7df32dd153044a6e52f60ca&amp;source=constructor" width="550" height="260" frameborder="0"></iframe>
            <div class="contacts_description">
              <div class="contacts_title">Кафе-пекарня Лас Мохитос</div>
              <div class="contacts_desc"><i class="fa contacts_icon fa-map-marker" aria-hidden="true"></i>ул. Клюева, 20/3</div>
              <div class="contacts_desc"><i class="fa contacts_icon fa-clock-o" aria-hidden="true"></i>9:00 - 20:00</div>
              <div class="contacts_desc"><i class="fa contacts_icon fa-phone" aria-hidden="true"></i>+7 (952) 679-40-62</div>
            </div>
          </div>          
        </div>
      </section>
    </div>
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
import {mapGetters} from "vuex";
import CartOrder from "../components/CartOrder";
export default {
  name: "Contacts",
  components:{
    CafeLayout,
    CartOrder,
  },
  computed: {
    ...mapGetters([
      'CART'
    ]),
  }
}
</script>

<style>

</style>