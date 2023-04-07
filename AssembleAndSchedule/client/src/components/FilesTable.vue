

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

export default {
    components: { DataTable, Column },

    data() {
        return {
            products: null
        };
    },
    mounted() {
        console.log("mounted")
        this.products = [
            {
                fileID: '111',
                fileName: "june_orders",
                dateAdded: new Date().toISOString(),
                status: "Ready",
            }
        ]
    }
    
}

</script>
