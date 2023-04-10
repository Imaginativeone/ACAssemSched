

<template>
    <div class="card">
    <DataTable :value="products" showGridlines stripedRows tableStyle="min-width: 50rem">
        <Column field="fileID" header="File ID"></Column>
        <Column field="fileName" header="File Name"></Column>
        <Column field="dateAdded" header="Date Added"></Column>
        <Column field="status" header="Status"></Column>
    </DataTable>
</div>
</template>

<script>
import DataTable  from 'primevue/datatable';
import Column from 'primevue/column'
// import SimpleUpload from 'src/components/SimpleUpload.vue'

export default {
    components: { DataTable, Column },

    data() {
        return {
            products: null,
            fileName: ""
        };
    },
    mounted() {
        console.log("mounted")
        this.products = [
            {
                fileID: '111',
                fileName: "SimpleUpload.fileName",
                dateAdded: new Date().toISOString(),
                status: "Ready",
            }
        ]
    }
    
}

</script>
