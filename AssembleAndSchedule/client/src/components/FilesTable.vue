

<template>
    <div class="card">
    <DataTable :value="products" showGridlines stripedRows tableStyle="min-width: 50rem">
        <Column field="fileID" header="File ID"></Column>
        <Column field="fileName" header="File Name"></Column>
        <Column field= "dateAdded" header="Date Added"></Column>
        <Column field="status" header="Status"></Column>
    </DataTable>
</div>
</template>

<script>
import DataTable  from 'primevue/datatable';
import Column from 'primevue/column'
import axios from 'axios';

// import SimpleUpload from 'src/components/SimpleUpload.vue'

export default {
    components: { DataTable, Column },

    data() {
        return {
            products: null,
            fileName: '',
            newFile: '',
            log: ''
        };
    },
    mounted() {
        console.log("mounted")
        this.products = [
            {
                fileID: "fileID",
                fileName: this.fileName,
                dateAdded: new Date().toISOString(),
                // dateAdded: this.getfile.dateAdded,
                status: "Ready",
                newFile: this.getfile(),
                log: console.log(this.newFile)
            }
        ]
        // console.log('File name and ID: ',this.fileID, this.fileName)
    },
    methods: {

        async getfile (){  
            const data = []
            // const file = this.$refs.file.files[0];
            try {
                const res = await axios.get("https://localhost:5001/uploadedFiles/", data);
                console.log('data from axios.get', res)
                JSON.stringify(data)
                this.fileName = res.data[0].name,
                this.dateAdded = res.data[0].LastModifiedDate,
                this.fileID = res.data[0].fileID
                console.log('File name and ID: ', res.data.fileID, this.fileName, data)
            } catch (err) {
                console.error(err)
            }
        },
    }
    
}

</script>
