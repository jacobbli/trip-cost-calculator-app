<template>
  <table id="comparison-table">
    <tr>
      <th></th>
      <th>Original Cost Breakdown</th>
      <th>Adjusted Cost Breakdown</th>
    </tr>
    <template v-for="row in tableData" >
        <template v-if="row.name=='Subtotal'">
          <tr class="subtotal-row" :key="row.id" >
            <td>{{ row.name }}</td>
            <el-tooltip
              v-if="row.originalTooltip"
              effect="dark"
              :content="row.originalTooltip"
              placement="top">
              <td>{{ row.original }}</td>
            </el-tooltip>
            <td v-else>{{ row.original }}</td>
            <el-tooltip
              v-if="row.adjustedTooltip"
              effect="dark"
              :content="row.adjustedTooltip"
              placement="top">
              <td>{{ row.adjusted }}</td>
            </el-tooltip>
            <td v-else>{{ row.adjusted }}</td>
          </tr>
        </template>
        <template v-else-if="row.name=='Total Cost'">
          <tr class="total-row" :key="row.id" >
            <td>{{ row.name }}</td>
            <el-tooltip
              v-if="row.originalTooltip"
              effect="dark"
              :content="row.originalTooltip"
              placement="top">
              <td>{{ row.original }}</td>
            </el-tooltip>
            <td v-else>{{ row.original }}</td>
            <el-tooltip
              v-if="row.adjustedTooltip"
              effect="dark"
              :content="row.adjustedTooltip"
              placement="top">
              <td>{{ row.adjusted }}</td>
            </el-tooltip>
            <td v-else>{{ row.adjusted }}</td>
          </tr>
        </template>
        <template v-else>
          <tr :key="row.id" >
            <td>{{ row.name }}</td>
            <el-tooltip
              v-if="row.originalTooltip"
              effect="dark"
              :content="row.originalTooltip"
              placement="top">
              <td>{{ row.original }}</td>
            </el-tooltip>
            <td v-else>{{ row.original }}</td>
            <el-tooltip
              v-if="row.adjustedTooltip"
              effect="dark"
              :content="row.adjustedTooltip"
              placement="top">
              <td>{{ row.adjusted }}</td>
            </el-tooltip>
            <td v-else>{{ row.adjusted }}</td>
          </tr>
        </template>
    </template>
  </table>
</template>

<script>
export default {
  name: "ComparisonTable",
  props: {
    tableData: Array,
  }
}
</script>

<style>
#comparison-table {
  width: 100%;
  border-collapse: collapse;
}

#comparison-table td {
  padding: 12px;
  font-size: 14px;
}

#comparison-table td:nth-child(2), #comparison-table td:nth-child(3) {
  text-align: center;
}

#comparison-table tr {
  border-bottom: 1px #EBEEF5 solid;
  transition: background-color 0.5s;
}

#comparison-table tr:hover {
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