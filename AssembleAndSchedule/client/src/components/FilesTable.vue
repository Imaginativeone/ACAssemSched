

<template>
    <div class="card">
    <DataTable :value="products" showGridlines stripedRows tableStyle="min-width: 50rem">
        <Column field="fileID" :value="fileName " header="File ID"></Column>
        <Column field={{ SimpleUpload- }} header="File Name"></Column>
        <Column field= "dateAdded" header="Date Added"></Column>
        <Column field="status" header="Status"></Column>
    </DataTable>
</div>
</template>

<script>
import DataTable  from 'primevue/datatable';
import Column from 'primevue/column'
import axios from 'axios';

// import SimpleUpload from '../components/SimpleUpload.vue'

export default {
    components: { DataTable, Column },

    data() {
        return {
            products: null,
            fileName: '',
            files: '',
            log: ''
        };
    },
    async mounted() {
        console.log("mounted")
        this.products = await this.getfile()
        // this.files = this.findFile()
        console.log('File name and ID: ', this.fileID, this.fileName)
    },
    methods: {

        async getfile (){  
            // const data = ''
            // const res = []
            // const file = this.$refs.file.files[0];
            try {
                const res = await axios.get("http://localhost:5001/uploadedFiles");
                this.files = res
                console.log('1st data from axios.get:', res)

                if (!res || !res.length)
                    return console.log("RES HAS No Data HERE YET")
                    
                console.log('data from axios.get', res)
                // JSON.stringify(res)
                this.fileName = res.name,
                this.dateAdded = res.LastModifiedDate,
                this.fileID = res.fileID
                console.log('File name and ID: ', res.fileID, this.fileName, res)
                return res
            } catch (err) {
                console.error(err)
            }
        },
        findFile(){
          //  const listOfFiles= '' This function is just for comparison and troubleshooting
          const files = fetch("/uploadedFiles").then(response => {return response.json(); })
          console.log(files);
        }
    }
    
}

</script>
