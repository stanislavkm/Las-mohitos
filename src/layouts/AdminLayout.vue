<template>
  <div class="admin_header">
    <div class="admin_header_nav">
      <ul class="admin_ul">
        <li class="admin_ul_li">
          <a href="/admin/products">Товары</a>
        </li>
        <hr>
        <li class="admin_ul_li">
          <a href="/admin/sections">Секции</a>
        </li>
        <hr>
        <li class="admin_ul_li">
          <a href="/admin/users">Пользователи</a>
        </li>
        <hr>
        <li class="admin_ul_li">
          <a href="/admin/meals">Комплексные обеды</a>
        </li>
        <hr>
        <li class="admin_ul_li">
          <a href="/admin/orders">Заказы</a>
        </li>
      </ul>
      <button @click="logOut"
              class="log_out">
        ВЫЙТИ
      </button>
    </div>


    <div class="date">
      {{localWeekDay}}
      <br>
      {{localDate}}
      <br>
      {{time}}
    </div>

  </div>
    <slot>
      <router-view></router-view>
    </slot>
  <!-- button v-if="isLoggedIn"-->
</template>

<script>
//import axios from 'axios';
export default {
  name: "AdminLayout",
  data(){
    return{
      date: new Date(),
      interval: null,
      isOpen: true,
      time: null,
    }
  },
  created() {
    setInterval(() => this.time = new Date().toLocaleTimeString(), 1000);
  },
  computed: {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
    localWeekDay() {
      let weekDay;
      let dayOptions = {weekday: 'long'};
      let Day = (new Intl.DateTimeFormat('ru-RU', dayOptions).format(weekDay));
      const result = Day.charAt(0).toUpperCase() + Day.slice(1);
      return result;
    },
    localDate() {
      let date;
      let dateOptions = {year: 'numeric', month: 'long', day: 'numeric'};
      let Date = (new Intl.DateTimeFormat('ru-RU', dateOptions).format(date));
      return Date;
    }
  },
    methods: {
//      logout: function () {
//        this.$store.dispatch('logout')
//            .then(() => {
//              this.$router.push('/auth')
//            })
//      },
        logOut() {
          this.$store.dispatch('logOut')
            .then(() => {
              this.$router.push('/auth')
            })
    },
  },


}
</script>

<style>
.admin_header{
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  padding: 20px 0 20px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #8cda37;
}
.admin_ul{
  list-style: none;
}
.admin_ul_li{
  margin-bottom: 15px;
}
.admin_ul_li > a{
  color: #0a6500;
  font-family: 'Oswald', sans-serif;
  font-size: 1.6rem;
  font-weight: 300;
  text-decoration: none;
}
.admin_ul_li > a:hover{
  color: #FFFFFF;
}
.log_out{
  margin-top: 20px;
  padding: 5px;
  background: ghostwhite;
}
.date{
  letter-spacing: 1px;
  color: #ffffff;
  font-family: 'Oswald', sans-serif;
  font-size: 1.8rem;
  font-weight: 300;
}
</style>