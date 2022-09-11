<template>

    <div class="admin_tables">
      <h2 class="table_headers">Все товары</h2>
      <table class="adm_table">
        <thead>
        <tr>
          <th class="col_title" scope="col">Наименование товара</th>
          <th class="col_title" scope="col">Вес товара</th>
          <th class="col_title" scope="col">Изображение товара</th>
          <th class="col_title" scope="col">БЖУ товара <br> (ккал/гр)</th>
          <th class="col_title  w-m210" scope="col">Описание товара <br> (не более 80 символов)</th>
          <th class="col_title" scope="col">Цена товара <br> (₽)</th>
          <th class="col_title" colspan="3">Элементы управления</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in this.$store.state.allItems" :key="item.id"
        >
          <td><input class="adm_input" type="text" v-model="item.title" :readonly="item.isReadonly" :class="item.isReadonly ? '' : 'blocked'"></td>
          <td><input class="adm_input  m_l-r-20" type="text" v-model="item.weight" :readonly="item.isReadonly" :class="item.isReadonly ? '' : 'blocked'"></td>
          <td><input class="adm_input" type="file" ref="thumb" v-on:change="onFileChange" :class="item.isReadonly ? '' : 'blocked'"></td>
          <td><input class="adm_input" type="text" v-model="item.utility" :readonly="item.isReadonly" :class="item.isReadonly ? '' : 'blocked'"></td>
          <td><textarea class="adm_input w100" type="text" v-model="item.description" :readonly="item.isReadonly" :class="item.isReadonly ? '' : 'blocked'"></textarea></td>
          <td><input class="adm_input" type="text" v-model=item.price :readonly="item.isReadonly" :class="item.isReadonly ? '' : 'blocked'"></td>
          <td class="row_btn"><button class="edit_btn" data-title="Изменить описание"  @click="makeEditable(item)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
          <td class="row_btn"><button class="edit_btn" data-title="Сохранить изменения" @click="updateProduct(item)"><i class="fa fa-check" aria-hidden="true"></i></button></td>
          <td class="row_btn"><button class="edit_btn" data-title="Удалить товар" @click="removeProduct(item.id)"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
        </tr>
        </tbody>
      </table>
      <button class="add_btn" @click="productFormActive">Добавить товар</button>
      <div class="Form_window" v-if="isProductFormActive">
        <div class="Form_window_header">
          <h3>Добавление товара</h3>
          <button class="close_Form" @click="productFormActive">X</button>
        </div>
        <form class="productForm" @submit.prevent="">
          <input class="Form_input" v-model="title" type="text" placeholder="Наименование товара">
          <input class="Form_input" type="file" ref="thumb" v-on:change="handleFileUpload()" placeholder="Изображение товара">
          <input class="Form_input" v-model="utility" type="text" placeholder="БЖУ товара">
          <textarea class="Form_input" v-model="description" type="text" placeholder="Описание товара"></textarea>
          <input class="Form_input" v-model="price" type="text" placeholder="Цена товара">
          <input class="Form_input" v-model="weight" type="text" placeholder="Вес товара">
          <button class="add_btn" @click="sendData">Добавить товар</button>
        </form>
      </div>
    </div>

</template>

<script>
import {mapActions, mapMutations} from 'vuex'
//import {isReadonly} from "vue";

export default {
  data(){
    return{
      disableInput: true,
      // isReadonly: true,
      isProductFormActive: false,
      file: '',
      title: '',
      utility: '',
      description: '',
      thumb: '',
      price: '',
      weight: '',
//        isReadOnly: true,
      
    }
  },
  computed:{
    itemsArray () {
      return this.$store.state.items
    },
  },
  name: 'productsTable',
  components: {
  },
  methods:{
    makeEditable(item) {
      item.isReadonly = !item.isReadonly
      console.log(item.isReadonly)
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    updateProduct(item){
      console.log(item)
      if (!item.isReadonly){
        item.isReadonly = !item.isReadonly
      }
      this.UPDATE_PRODUCT(item)
    },
    removeProduct(id){
      console.log(id)
      this.REMOVE_PRODUCT(id)
    },
    sendData(){
     let Item = new FormData();
     Item.append('thumb', this.thumb)
     Item.append('title', this.title)
     Item.append('description', this.description)
     Item.append('utility', this.utility)
     Item.append('price', this.price)
     Item.append('weight', this.weight)
//      let Item = {title: this.title, utility:  this.utility, description: this.description, thumb: this.thumb, price: this.price, weight: this.weight};
//       console.log(Item)
      this.$store.dispatch('ADD_TO_PRODUCTS', Item)
    },
    removeItem(){
      let id = this.id
      this.$store.dispatch('REMOVE_PRODUCT', id)
      console.log(id)
    },
    handleFileUpload(){
      this.thumb = this.$refs.thumb.files[0];
    },
    ...mapActions([
        'UPDATE_PRODUCT',
        'GET_ALL_ITEMS',
        'GET_ITEMS_FROM_API',
        'ADD_TO_PRODUCTS',
        'REMOVE_PRODUCT',
        'ATTR_TOGGLE'
    ]),
    ...mapMutations([
        'SET_ALL_ITEMS',
        'SET_PRODUCT_TO_STATE',
        'REMOVE_PRODUCT_FROM_STATE'
    ]),
    // attr_toggle(index){
    //   ///let row = this.$store.state.items.find((items)
    //     //  this.itemsArray.find((items) => items.index === index)
    //   // let row = this.$store.state.items.findIndex(el => el.index === index)
    //   // let row = this.$store.state.items.find(item => item.index === index)
    //   let row = this.$store.state.items[index];
    //   console.log(row);
    //   row.isReadonly = !row.isReadonly;
    //   // this.isReadonly = !this.isReadonly;
    //   // this.disableInput = !this.disableInput;
    // },
    // attr_toggle(item){
    //   ///let row = this.$store.state.items.find((items)
    //   //  this.itemsArray.find((items) => items.index === index)
    //   // let row = this.$store.state.items.findIndex(el => el.index === index)
    //   // let row = this.$store.state.items.find(item => item.index === index)
    //   item.isReadonly = !item.isReadonly;
    //   console.log(item);
    //   // this.isReadonly = !this.isReadonly;
    //   // this.disableInput = !this.disableInput;
    // },
    productFormActive(){
      this.isProductFormActive = !this.isProductFormActive;
    },
    // createProduct(){
    //   const newPost = {
    //     id: Date.now(),
    //     title: this.title,
    //     body: this.body,
    //   }
    //   this.posts.push(newPost)
    // },
  },
  mounted() {
    this.GET_ITEMS_FROM_API();
    this.GET_ALL_ITEMS();
  }
}
</script>

<style scoped>
.edit_btn{
  position: relative;
  color: gray;
}
.edit_btn:hover::after {
  content: attr(data-title);
  position: absolute; /* Абсолютное позиционирование */
  left: 20%; top: 30%; /* Положение подсказки */
  z-index: 1; /* Отображаем подсказку поверх других элементов */
  background: rgba(255,255,230,0.9); /* Полупрозрачный цвет фона */
  font-family: Arial, sans-serif; /* Гарнитура шрифта */
  font-size: 11px; /* Размер текста подсказки */
  padding: 5px 10px; /* Поля */
  border: 1px solid #333; /* Параметры рамки */
}
.blocked{
  font-weight: 600;
  color: #e76f4f
}
.adm_table{
  margin-bottom: 20px;
}
ul{
  margin: 0;
  padding: 0 !important;
}
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
.row_btn>button:hover{
  background: #5bc200;
}
.row_btn>button:active{
  background: #5bc200;
}
.add_btn{
  font-family: 'Oswald', sans-serif;
  margin-top: 10px;
  width: 130px;
  height: 35px;
  background: #a1e755;
  cursor: pointer;
}
.Form_window{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #3d8c00;
  border: 2px solid #3d8c00;
  background: #a1e755;
  padding: 15px;
  width: 300px;
  text-align: center;
}
.Form_window_header{
  display: flex;
  justify-content: space-between;
}
.Form{
  display: flex;
  flex-direction: column;
}
.Form_input{
  padding-left: 5px;
  height: 30px;
  border: 1px solid #53b400;
  margin-top: 10px;
  font-family: 'Oswald', sans-serif;
}
</style>