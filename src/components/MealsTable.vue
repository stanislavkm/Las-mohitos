<template>
  <div class="admin_tables">
  <h2 class="table_headers">Комплексные обеды</h2>
  <table class="adm_table">
    <thead>
    <tr>
      <th class="col_title" scope="col">День недели</th>
      <th class="col_title" scope="col">Товары дня</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td><input class="adm_input" type="text" value="Понедельник" readonly></td>
      <td class="w100px"><button class="sections_btn">Товары</button></td>
    </tr>
    <tr>
      <td><input class="adm_input" type="text" value="Вторник" readonly></td>
      <td class="w100px"><button class="sections_btn">Товары</button></td>
    </tr>
    <tr>
      <td><input class="adm_input" type="text" value="Среда" readonly></td>
      <td class="w100px"><button class="sections_btn">Товары</button></td>
    </tr>
    <tr>
      <td><input class="adm_input" type="text" value="Четверг" readonly></td>
      <td class="w100px"><button class="sections_btn">Товары</button></td>
    </tr>
    <tr>
      <td><input class="adm_input" type="text" value="Пятница" readonly></td>
      <td class="w100px"><button class="sections_btn">Товары</button></td>
    </tr>
    <tr>
      <td><input class="adm_input" type="text" value="Суббота" readonly></td>
      <td class="w100px"><button class="sections_btn">Товары</button></td>
    </tr>
    <tr>
      <td><input class="adm_input" type="text" value="Воскресенье" readonly></td>
      <td class="w100px"><button class="sections_btn">Товары</button></td>
    </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
export default {
  name: 'mealsTable',
}
</script>

<style scoped>
*{
  font-family: 'Oswald', sans-serif;
}
td, th{
  height: 35px;
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
  text-align: center;
  padding: 0 5px;
  border: none;
  height: 30px;
}
</style>