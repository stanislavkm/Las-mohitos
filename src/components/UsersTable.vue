<template>
    <div class="admin_tables">
    <h2 class="table_headers">Пользователи</h2>
    <table class="adm_table">
      <thead>
      <tr>
        <th class="col_title" scope="col">Номер телефона</th>
        <th class="col_title" scope="col">Пароль</th>
        <th class="col_title" colspan="2">Элементы управления</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in this.$store.state.users" :key="index"
          :user_data="user">
        <td><input class="adm_input" type="text" :value="`${user.phoneNumber}`" readonly></td>
        <td><input class="adm_input" type="text" :value="`${user.password}`" readonly></td>
        <td class="row_btn"><button><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
        <td class="row_btn"><button><i class="fa fa-times" aria-hidden="true"></i></button></td>
      </tr>
      </tbody>
    </table>
      <button class="add_btn" @click="UsersFormActive">Добавить пользователя</button>
      <div class="Form_window" v-if="isUsersFormActive">
        <div class="Form_window_header">
          <h3>Добавление товара</h3>
          <button class="close_Form" @click="UsersFormActive">X</button>
        </div>
        <form class="Form" @submit.prevent>
          <input class="Form_input" v-model="newUser.phoneNumber" type="text" placeholder="Номер телефона">
          <input class="Form_input" v-model="newUser.password" type="text" placeholder="Пароль">
          <button class="add_btn" @click="ADD_TO_USERS(newUser)">Добавить пользователя</button>
        </form>
      </div>
    </div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
export default {
  name: 'usersTable',
  data(){
    return{
      user_data: {
        type: Object,
        default() {
          return{}
        }
      },
      isUsersFormActive: false,
      newUser: {
        phoneNumber: '',
        password: '',
      },
    }
  },
  components:{

  },
  computed: {
  },
  methods:{
    ...mapActions([
      'GET_USERS_FROM_API',
        'ADD_TO_USERS'
    ]),
    ...mapMutations([
      'SET_USER_TO_STATE'
    ]),
    UsersFormActive(){
      this.isUsersFormActive = !this.isUsersFormActive;
    }
  },
  mounted() {
    this.GET_USERS_FROM_API()
  }
}
</script>

<style scoped>

td, th{
  font-family: 'Oswald', sans-serif;
  word-wrap:break-word;
  border: 1px solid #5bc200;
}
.w100px{
  width: 100px;
}
.w100px>button{
  width: 100%;
}
.row_btn{
  width: 35px;
  height: 23px;
  border: none;
}
.row_btn>button{
  background: #a1e755;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.row_btn>button:hover{
  background: #5bc200;
}
.row_btn>button:active{
  background: #5bc200;
}
.adm_input{
  text-align: center;
  font-size: 1.2 rem;
  padding: 0 5px;
  border: none;
  height: 30px;
}
</style>