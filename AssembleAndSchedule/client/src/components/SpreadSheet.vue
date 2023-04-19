<template>
  <div class="table">
    <hot-table 
      ref="hotTableComponent"
      :data="data" :rowHeaders="true" :colHeaders="true" 
      licenseKey="non-commercial-and-evaluation">
    </hot-table>
  </div>
</template>
  
  <script>
    import { defineComponent } from 'vue';
    import { HotTable } from '@handsontable/vue3';
    import { registerAllModules } from 'handsontable/registry';
    import 'handsontable/dist/handsontable.full.css';
    import axios from 'axios';
  
    // register Handsontable's modules
    registerAllModules();
  
    export default defineComponent({
      data() {
        return {
          data: [
            ['Proj', 'Customized Item', 'Upd Grp', 'Upd Seq', 'PRP Qty', 'Unit Type', 'Product Type', 'Int/Ext','Grille Type', 'Plan Fin Date', 'Unique ID', 'New Batch','New Bin', 'Original Type'],
            ['P36924', 'CD  STOK14495150', 120, 55, 1, 'unit', 'CD', 'STOK', 'if', 'n', '01-17-23'], 
            ['P36924', 'CD  STOK14495150', 120, 60, 1, 'unit', 'CD', 'STOK', 'if', 'n', '01-17-23' ],
            ['S39044', 'CD  STOK14504454', 120, 65, 1, 'unit', 'CD', 'STOK', 'if', 'n',' 01-17-23'],
            ['I92112', 'CS  WHWH13786837',	10	, 5,	1, 'unit', 'CS','WHWH', 'if',' n',	' 01-16-23' ],
            ['P34473', 'CS  WHWH 14183365',	10,	10,	1, 'unit',	'CS',	'WHWH', 'if', 'n',	'01-18-23'], 
            ['P34473', 'CS  WHWH14183366',	10,	15,	1,	'unit',	'CS',	'WHWH', 'if',  'n',	 '01-18-23' ],
            ['S32273', 'CS WHWH14183563',	  10,	20,	1,	'unit',	'CS',	'WHWH', 'if', 'n', '01-16-23' ]

          ],
        };
      },
      methods: {
        async loadSS(fileName) {
          const res = await axios.get("http://localhost:5001/fileContent?filename=" +  fileName);
          this.$refs.hotTableComponent.hotInstance.loadData(res.data);
        }
      },
      components: {
        HotTable,
      }
    });
  </script>

  <style>
  .table {
    padding-left: 100px;
  }

</style>