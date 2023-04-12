

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
    async mounted() {
        console.log("mounted")
        this.products = await this.getfile()
        console.log('File name and ID: ', this.fileID, this.fileName)
    },
    methods: {

        async getfile (){  
            const data = []
            // const file = this.$refs.file.files[0];
            try {
                const res = await axios.get("/uploadedFiles", data);
                console.log('data from axios.get', res)

                if (!res.data || !res.data.length)
                    return []
                    
                console.log('data from axios.get', res)
                JSON.stringify(data)
                this.fileName = res.data.name,
                this.dateAdded = res.data.LastModifiedDate,
                this.fileID = res.data.fileID
                console.log('File name and ID: ', res.data.fileID, this.fileName, res, data)
                return res.data
            } catch (err) {
                console.error(err)
            }
        },
    }
    
}

</script>
