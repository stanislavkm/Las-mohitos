<template>
  <login-layout>
    <section class="loginPage">
      <div class="tabs">
        <input id="tab1" type="radio" name="tabs" checked>
        <label for="tab1" title="Вкладка 1">Вход</label>

        <input id="tab2" type="radio" name="tabs">
        <label for="tab2" title="Вкладка 2">Регистрация</label>

        <section id="content-tab1">
          <Form @submit.prevent="">
            <hr>
            <div>
            <label for="phoneNumber"><b>Email</b></label>
            <Field type="text" v-model="logPhone" placeholder="Введите email" name="logEmail" id="phoneNumber" :rules="[isRequired, validateEmail]"/>
            <ErrorMessage class="errMessage" name="logEmail" />  
            </div>
            <div>
            <label for="pass"><b>Пароль</b></label>
            <Field type="password" v-model="logPass" placeholder="Введите пароль" name="logPass" id="pass" :rules="[isRequired, validatePass]" />
            <ErrorMessage class="errMessage" name="logPass" />  
            </div>
            <hr>

            <button class="registerbtn" @click="logUser">Войти</button>

          </Form>
        </section>
        <section id="content-tab2">
          <Form @submit.prevent="">
            <hr>
            <div>
            <label for="reg_phone"><b>Email</b></label>
            <Field type="text" v-model="regPhone" placeholder="Введите email" name="regEmail" id="reg_phone" :rules="[isRequired, validateEmail]" />
            <ErrorMessage class="errMessage" name="regEmail" />  
            </div>
            <div>
            <label class="mb20" for="reg_pass"><b>Пароль</b></label>
            <Field type="password" v-model="regPass" placeholder="Введите пароль" id="reg_pass" name="regPhone" :rules="[isRequired, validatePass]" />
            <ErrorMessage class="errMessage" name="regPhone" />  
            </div>
<!--            <label for="reg_passRep"><b>Повторите пароль</b></label> -->
<!--            <input type="password" v-model="repeatedRegPass" placeholder="Повторите пароль" id="reg_passRep" required> -->
                <hr> 

            <button class="registerbtn" @click="regUser">Зарегестрироваться</button>

          </Form>
        </section>

      </div>
    </section>
  </login-layout>

</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import LoginLayout from "../layouts/LoginLayout"
//import axios from 'axios';
export default {
  name: "Login",
  data(){
    return{
      logPhone: '',
      logPass:'',
      regPhone: '',
      regPass: '',
      is_admin: null,
    }
  },
  methods: {
    regUser() {
      const regData = {email: this.regPhone, password: this.regPass}
      this.$store.dispatch('regUser', regData)
          .then(() => this.$router.push('/auth'))
         .catch(err => console.log(err))
    },
//    logUser() {
//      const logData = {email: this.logPhone, password: this.logPass}
//      axios.post(`https://lm.perimeter.games/api/v1/login`, logData)
//          .then((response) => {
//            console.log(response.data);
//            this.$router.push('/admin');
//          })
//          .catch((error) => {
//            console.log(error);
//          });
//    },
    logUser() {
      const logData = {email: this.logPhone, password: this.logPass}
      this.$store.dispatch('logUser',logData)
          .then(() => this.$router.push('/admin'))
          .catch(err => console.log(err))
    },
//    login: function () {
//      let logPhone = this.logPhone
//      let logPass = this.logPass
//      this.$store.dispatch('login', { logPhone, logPass})
//          .then(() => this.$router.push('/admin'))
//          .catch(err => console.log(err))
//    },
//    register: function () {
//      let data = {
//        phone: this.regPhone,
//        password: this.regPass,
//        repeatedPass: this.repeatedRegPass,
//        is_admin: this.is_admin
//      }
//      this.$store.dispatch('register', data)
//          .then(() => this.$router.push('/'))
//          .catch(err => console.log(err))
//    },
    isRequired(value) {
      if (value && value.trim()) {
        return true;
      }
      return 'Необходимо это поле';
    },
    validateEmail(value) {
      // if the field is empty
      if (!value) {
        return 'Необходимо это поле';
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return 'Неверный формат поля email';
      }
      // All is good
      return true;
    },
    validatePass(value) {
      // if the field is empty
      if (value.length <6) {
        return 'Это поле должно содержать больше 6 символов';
      }
      // All is good
      return true;
    },
  },
  components: {
    LoginLayout,
    Form,
    Field,
    ErrorMessage,
  }
}
</script>


<style scoped>
/* Базовый контейнер табов */
.tabs {
  min-width: 320px;
  max-width: 600px;
  padding: 0;
  margin: 0 auto;
  transform: translateY(20vh);
  -webkit-box-shadow: 0 5px 17px 0 rgba(34, 60, 80, 0.15);
  -moz-box-shadow: 0 5px 17px 0 rgba(34, 60, 80, 0.15);
  box-shadow: 0 5px 17px 0 rgba(34, 60, 80, 0.15);
}
/* Стили секций с содержанием */
.tabs>section {
  display: none;
  padding: 15px;
  background: #fff;
  border: 1px solid #ddd;
}
.tabs>section>.auth_form {
  margin: 0 0 5px;
  line-height: 1.5;
  color: #383838;
  /* прикрутим анимацию */
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}
/* Описываем анимацию свойства opacity */

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/* Прячем чекбоксы */
.tabs>input {
  display: none;
  position: absolute;
}
/* Стили переключателей вкладок (табов) */
.tabs>label {
  display: inline-block;
  margin: 0 0 -1px;
  padding: 15px 25px;
  font-weight: 600;
  text-align: center;
  color: #aaa;
  border: 0px solid #ddd;
  border-width: 1px 1px 1px 1px;
  background: #f1f1f1;
  border-radius: 3px 3px 0 0;
}
/* Шрифт-иконки от Font Awesome в формате Unicode */
.tabs>label:before {
  font-family: fontawesome;
  font-weight: normal;
  margin-right: 10px;
}
.tabs>label[for*="1"]:before {
  content: "\f2c2";
}
.tabs>label[for*="2"]:before {
  content: "\f084";
}
/* Изменения стиля переключателей вкладок при наведении */

.tabs>label:hover {
  color: #888;
  cursor: pointer;
}
/* Стили для активной вкладки */
.tabs>input:checked+label {
  color: #555;
  border-top: 1px solid #009933;
  border-bottom: 1px solid #fff;
  background: #fff;
}
/* Активация секций с помощью псевдокласса :checked */
#tab1:checked~#content-tab1, #tab2:checked~#content-tab2, #tab3:checked~#content-tab3, #tab4:checked~#content-tab4 {
  display: block;
}
/* Убираем текст с переключателей
* и оставляем иконки на малых экранах
*/

@media screen and (max-width: 680px) {
  .tabs>label {
    font-size: 0;
  }
  .tabs>label:before {
    margin: 0;
    font-size: 18px;
  }
}
/* Изменяем внутренние отступы
*  переключателей для малых экранов
*/
@media screen and (max-width: 400px) {
  .tabs>label {
    padding: 15px;
  }
}
/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 5px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit/register button */
.registerbtn {
  background-color: #4CAF50;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity:1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}
</style>