<template>
    <div>
       <button v-bind:disabled="isDisabled" > The Clean-UP Component HAS loaded! Where's the Data?!</button>
    </div>
    <!-- Data Grid Header -->
    <div v-bind:disabled="isDisabled" class="tableHeader" >
          <div class="noPtrEvnts">
            <div class="noPtrEvnts">
              <div class="tableCell">
                <div class="tableCellData">
                  Proj
                </div>
              </div>
              <div class="tableCell">
                <div class="tableCellData">
                  Customized Item
                </div>
              </div>
              <div class="tableCell">
                <div class="tableCellData">
                 Upd Grp
                </div>
              </div>
              <div class="tableCell">
                <div class="tableCellData">
                 Upd Seq
                </div>
              </div>
              <div class="tableCell">
                <div class="tableCellData">
                 PRP QTY
                </div>
              </div>
              <div class="tableCell">
                <div class="tableCellData">
                  Unit Type
                </div>
              </div>
              <div class="tableCell">
                <div class="tableCellData">
                  Product Type
                </div>
              </div>
              <div class="tableCell">
                <div class="tableCellData">
                  Int/Ext
                </div>
              </div>
              <div class="tableCell">
                <div class="tableCellData">
                  Grille Type
                </div>
              </div>
              <div class="tableCell">
                <div class="tableCellData">
                  Grille Type
                </div>
              </div>
              <div class="tableCell">
                <div class="tableCellData">
                  Grille Type
                </div>
              </div>
              <div class="tableCell">
                <div class="tableCellData">
                  Plan Fin Date
                </div>
              </div>
            </div>
          </div>
        </div>

<!--  +++++++++++++++-- data columns format before cleanUp --+++++++++++++++++++++++++++++++++  -->
    <!-- <vue-excel-editor ref="grid" v-model="file">
        <vue-excel-column field="part_data"   label="Part Data" type="string" width="80px" key-field />
        <vue-excel-column field="proj"   label="Project"        type="string" width="150px" />
        <vue-excel-column field="custItem"  label="Custom Item" type="string" width="130px" />
        <vue-excel-column field="updGrp" label="Update Group"   type="string" width="50px" />
        <vue-excel-column field="updSeq" label="Update Sequence" type="string" width="70px" />
        <vue-excel-column field="planFinDt" label="Plan Finish Date" type="date"   width="80px" />
        <vue-excel-column field="sort1" label="Sort 1" type="string" width="50px" />
        <vue-excel-column field="sort2" label="Sort 2" type="string" width="50px" />
        <vue-excel-column field="sort3" label="Sort 3" type="string" width="50px" />
        <vue-excel-column field="Sort4" label="Sort 4" type="string" width="50px" />
        <vue-excel-column field="sort5" label="Sort 5" type="string" width="50px" />
        <vue-excel-column field="sort6" label="Sort 6" type="string" width="50px" />
        <vue-excel-column field="feat1" label="Feat 1" type="string" width="50px" />
        <vue-excel-column field="feat2" label="Feat 2" type="string" width="50px" />
        <vue-excel-column field="feat3" label="Feat 3" type="string" width="50px" />
        <vue-excel-column field="feat4" label="Feat 4" type="string" width="50px" />
        <vue-excel-column field="feat5" label="Feat 5" type="string" widcth="50px" />
        <vue-excel-column field="feat6" label="Feat 6" type="string" width="50px" />
        <vue-excel-column field="feat7" label="Feat 7" type="string" width="50px" />
        <vue-excel-column field="lino" label="Line Number" type="string" width="50px" />
        <vue-excel-column field="prp_qty" label="PRP QTY" type="string" width="50px" />
  </vue-excel-editor> -->

        <!-- <vue-excel-column field="updGrp" label="Update Group"   type="string" width="50px" :options="['F','M','U']" /> -->


</template>

<script>
// import schData from '../composables/data.json'
// import SimpleUpload from './SimpleUpload.vue'
// import excelFile from '../composables/data.xlsx'
// import FileReader from "./FileReader.vue"


export default {
    name: 'CleanUp',
    data(){
        return{
            file: 'file',
            text: "",
            isDisabled: false
        }
    },
    components: {
        
    },
    methods: {
        getFile(){
          fetch("/uploadedFile/${{this.file}}").then(response => {return response.json(); })
        },
        convert2Json(){
            // Require library
            
            const reader = require('xlsx')

            // read file
            const file = reader.readFile(this.file)
            console.log(JSON.stringify(file))

            let data = []

            const sheets = file.SheetNames

            for(let i=0; i < sheets.length; i++){
                const temp = reader.utils.sheet_to_json(
                    file.Sheets[file.SheetNames[i]])
                    temp.forEach((res) => {
                    data.push(res)
                })
            }
        }
    }
}
</script>