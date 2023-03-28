<template>
    <div>
       <button class="div" @click="showFileContents"> The Clean-UP Component HAS loaded! Where's the Data?!</button>
       <input type="file">
       <textarea cols="30" rows="20"></textarea>
    </div>
    
    
    <!-- Data Grid Header -->
    <div v-bind:disabled="isDisabled" class="tableHeader" >
          <div class="noPtrEvnts">
            <div class="noPtrEvnts">
              <div class="tableCell">
                <div class="tableCellData" v-bind="showFileContents">
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
<div>
  <form id="'form"> 
    <input type="file" id="docpicker" accept=".txt" required multiple />
    
  </form> 
</div>

<div id="output"></div>

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
          // const dataFile = this.file
          const file = fetch("https://localhost:3305/uploadedFiles/").then(response => {return response.json(); })
          console.log(file);
        },
        textToJSON() {
            console.log(this.file)
            var lines = this.file.split('\n')

            var result = []

            var headers = lines[0].split('|')

            for (var i = 1; i < lines.length; i++) {
                var obj = {}
                var currentline = lines[i].split('|')

                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j]
                }

                result.push(obj)
            }
            console.log('data', result)
        }, 
        showFileContents(){
          // For testing, Try this function on the Casement Vue to see the file
          let input = document.querySelector('input');
          let textArea = document.querySelector('textarea');
          
          document.getElementById('docpicker').addEventListener('change', function(event){
            event.preventDefault();

            var fr = new FileReader();
            fr.onload = function(){
              document.getElementById("output").textContent = fr.result;
            }

            fr.readAsText(this.file[0])
          });

          input.addEventListener('change', () => {
            let files = input.files;

            if(files.length == 0) return;

            const file = this.file[0];

            let reader = new FileReader();

            reader.onload = (e) => {
              const file = e.target.result;
              const lines = file.split(/\r\n|\n/);
              textArea.value = lines.join('\n')
            };

            reader.onerror = (e) => alert(e.target.name);

            reader.readAsText(file);
          })

        //   document.getElementById('inputfile')
        //     .addEventListener('change', function() {
              
        //     var fr=new FileReader();
        //     fr.onload=function(){
        //         document.getElementById('outputFile')
        //                 .textContent=fr.result;
        //     }
              
        //     fr.readAsText(this.files[0]);
        // })
        }
    }
}
</script>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  textarea{
    margin-top: 15px;
    width: 50%;
  }

</style>