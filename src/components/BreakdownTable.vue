<template>
  <table id="breakdown-table">
    <template v-for="row in tableData" >
      <el-tooltip
        v-if="row.tooltip"
        :key="row.id" 
        effect="dark" 
        :content="row.tooltip" 
        placement="top">
        <template v-if="row.name=='Subtotal'">
          <tr class="subtotal-row">
            <td>{{ row.name }}</td>
            <td>{{ row.value }}</td>
          </tr>          
        </template>
        <template v-else-if="row.name=='Total Cost'">
          <tr class="total-row">
            <td>{{ row.name }}</td>
            <td>{{ row.value }}</td>
          </tr>          
        </template>
        <template v-else>
          <tr>
            <td>{{ row.name }}</td>
            <td>{{ row.value }}</td>
          </tr>
        </template>
      </el-tooltip>
      <template v-else>
        <template v-if="row.name=='Subtotal'">
          <tr class="subtotal-row" :key="row.id">
            <td>{{ row.name }}</td>
            <td>{{ row.value }}</td>
          </tr>          
        </template>
        <template v-else-if="row.name=='Total Cost'">
          <tr class="total-row" :key="row.id">
            <td>{{ row.name }}</td>
            <td>{{ row.value }}</td>
          </tr>          
        </template>
        <template v-else>
          <tr :key="row.id">
            <td>{{ row.name }}</td>
            <td>{{ row.value }}</td>
          </tr>
        </template>
      </template>
    </template>
  </table>
</template>

<script>
export default {
  name: "BreakdownTable",
  props: {
    tableData: Array,
  }
}
</script>

<style>
#breakdown-table {
  width: 100%;
  border-collapse: collapse;
}

#breakdown-table td {
  padding: 12px;
  font-size: 14px;
}

#breakdown-table td:nth-child(2) {
  text-align: right;
}

#breakdown-table tr {
  border-bottom: 1px #EBEEF5 solid;
  transition: background-color 0.5s;
}

#breakdown-table tr:hover {
  background-color: #ebebeb;
}

.subtotal-row{
  background-color: rgb(231, 217, 189);
}

.total-row{
  background-color: #b9e79f;
}

.total-row td, .subtotal-row td{
  font-weight: bold;
}
</style>