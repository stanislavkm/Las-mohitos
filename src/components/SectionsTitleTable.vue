<template>
  <div class="admin_tables">
    <h2 class="table_headers">Товары секций</h2>
    <table class="adm_table">
      <thead>
      <tr>
        <th class="col_title" scope="col">Наименование секции</th>
        <th class="col_title" scope="col">Товары для секции</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(section, id) in this.$store.state.titles" :key="id">
        <td><input class="adm_input" type="text" :value="`${section.title}`" readonly></td>
        <td class="w100px"><button class="sections_btn" @click="ProductsAddFormActive">Товары</button></td>
      </tr>
      </tbody>
    </table>
    <button  class="add_btn" @click="SectionsFormActive">Добавить секцию</button>

    <div class="Form_window" v-if="isSectionsFormActive">
      <div class="Form_window_header">
        <h3>Добавление товара</h3>
        <button class="close_Form" @click="SectionsFormActive">X</button>
      </div>
      <form class="Form" @submit.prevent>
        <input class="Form_input" v-model="sectionTitle" type="text" placeholder="Название секции">
        <button class="add_btn" @click="ADD_TO_TITLES(sectionTitle)">Добавить секцию</button>
      </form>
    </div>

    <div class="products_add_form" v-if="isProductsAddFormActive">
      <div class="products_add_form_header">
        <h3>Товары</h3>
        <button>X</button>
      </div>
      <div>
        <input type="checkbox" id="Плов" name="Плов"
               checked>
        <label for="Плов">Плов</label>
      </div>
      <div>
        <input type="checkbox" id="Пельмени" name="Пельмени"
               checked>
        <label for="Пельмени">Пельмени</label>
      </div>
    </div>
  </div>
</template>

<script>

import {mapActions, mapMutations} from 'vuex'
export default {
  name: 'titlesTable',
  data(){
    return{
      isSectionsFormActive: false,
      isSectionProductsActive: false,
      isProductsAddFormActive: false,
      sectionTitle: '',
    }
  },
  components: {
  },
  computed: {
  },
  methods:{
    ...mapActions([
      'GET_TITLES_FROM_API',
        'ADD_TO_TITLES'
    ]),
    ...mapMutations([
        'SET_TITLE_TO_STATE'
    ]),
    SectionsFormActive(){
      this.isSectionsFormActive = !this.isSectionsFormActive;
    },
    SectionProductsActive(){
      this.isSectionProductsActive = !this.isSectionProductsActive;
    },
    ProductsAddFormActive(){
      this.isProductsAddFormActive = !this.isProductsAddFormActive;
    }
  },
  mounted() {
    this.GET_TITLES_FROM_API()
  }
}
</script>

<style scoped>
*{
  font-family: 'Oswald', sans-serif;
}
.products_add_form_header{
  display: flex;
  justify-content: space-between;
}
.products_add_form_header button{
  height: 16px;
  font-size: 0.8rem;
}
.products_add_form{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px 30px;
  width: 200px;
  height: 300px;
  background: #a1e755;
}
.products_add_form h3{
  margin-bottom: 10px;
}
.products_add_form input{
  margin-right: 6px;
}
.products_add_form label{
  font-size: 1.2rem;
}
td, th{
  word-wrap:break-word;
  border: 1px solid #5bc200;
}
.w100px{
  width: 100px;
}
.w100px>button{
  width: 100%;
}
.sections_btn{
  background: #8ddc36;
}
.adm_input{
  height: 30px;
}
.sectionsCheckbox{
  display: flex;
  justify-content: flex-start;
}
</style>