

<template>
    <div class="card">
    <DataTable :value="files" scrollable scrollHeight="500px" :virtualScrollerOptions="{itemSize: 56}" selectionMode="single" v-model:selection="selectedFile"
            @rowSelect="onRowSelect" dataKey="fileID"
            showGridlines stripedRows tableStyle="min-width: 50rem">
            
        <Column field="fileName" header="File Name"></Column>
        <!-- <Column field= "dateAdded" header="Date Added"></Column> -->
        <!-- <Column field="status" header="Status"></Column> -->
        
    </DataTable>
</div>
</template>

<script>
import DataTable  from 'primevue/datatable';
import Column from 'primevue/column'
import axios from 'axios';

export default {
    components: { DataTable, Column },

    data() {
        return {
            files: null,
            selectedFile: null,
        }
    },
    async mounted() {
        console.log("mounted")

        // expecting to get the below json array structure from the backend:
        // this.files = [{fileID: '1111', fileName: 'filename'}]
        this.files = await this.getfiles()
    },

    methods: {

        async getfiles() {  
            try {
                const res = await axios.get("http://localhost:5001/uploadedFiles");
                console.log('1st data from axios.get:', res.data)

                if (!res || !res.data || !res.data.files) {
                    console.log("RES HAS No Data HERE YET")
                    return null
                }
                    
                return  res.data.files
            } catch (err) {
                console.error(err)
            }
        },
       
        async onRowSelect() {
            console.log("selected file: ", this.selectedFile)
            this.$emit('loadSpreadSheet', this.selectedFile.fileID + '_' + this.selectedFile.fileName)
        }
        
    }
    
}

</script>
