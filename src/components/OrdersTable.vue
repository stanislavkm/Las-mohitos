<template>
  <div class="admin_tables">
  <h2 class="table_headers">Заказы</h2>
  <table class="adm_table">
    <thead>
    <tr>
      <th style="max-width: 260px" class="col_title w-m210 w-220" scope="col">Заказ</th>
      <th class="col_title" scope="col">Имя</th>
      <th class="col_title" scope="col">Телефон</th>
      <th class="col_title" scope="col">Способ получения заказа</th>
      <th class="col_title" scope="col">Адрес доставки</th>
      <th class="col_title" scope="col">Время доставки</th>
      <th class="col_title" scope="col">Сумма к оплате</th>
      <th class="col_title" scope="col">Способ оплаты</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="order in this.$store.state.orders" :key="order.id">
      <td><span class="adm_input">{{order.order_description}}</span></td>
      <td class="text-center"><span class="adm_input m_l-r-20">{{order.fio}}</span></td>
      <td class="text-center"><span class="adm_input  m_l-r-20">{{order.phone}}</span></td>
      <td class="text-center"><span v-if="order.type_delivery===1" class="adm_input m_l-r-20">Самовывоз</span><span v-if="order.type_delivery===2" class="adm_input">Доставка</span></td>
      <td><input class="adm_input" type="text" :value="`${order.address}`" readonly></td>
      <td><input class="adm_input" type="text" :value="`${order.time_delivery}`" readonly></td>
      <td class="text-center"><span class="adm_input  m_l-r-20">{{order.t_price}}</span></td>
      <td class="text-center"><span v-if="order.type_payment===1" class="adm_input  m_l-r-20">Наличными</span><span v-if="order.type_payment===2" class="adm_input">Картой</span></td>
    </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  name: 'ordersTable',
  methods: {
    ...mapActions([
      'GET_ORDERS',
    ]),
    ...mapMutations([
      'SET_ORDERS_TO_STATE',
    ]),
  },
  mounted() {
    this.GET_ORDERS();
  },
}
</script>

<style scoped>

td, th{
  border: 1px solid #5bc200;
  font-family: 'Oswald', sans-serif;
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

</style>