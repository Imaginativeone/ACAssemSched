import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import VueExcelEditor from 'vue3-excel-editor'

import PrimeVue from 'primevue/config'
// import {ripple} from 'primevue'
// import Button from "primevue/button"
import TabMenu from "primevue/tabmenu"
import DataTable from 'primevue/datatable'
// import Column from 'primevue/column'
// import ToastService from 'primevue/toastservice'
// import Toast from 'primevue/toast'
// import Tooltip from 'primevue/tooltip'
import './assets/tailwind.css'

// Require statements
require("@/assets/main.scss")

createApp(App).use(router).mount('#app')
// App.mount('#app')
// App.use(router)


/* App Use Section */
// App.use(VueExcelEditor)

/* PrimeVue Components */ 
App.component('PrimeVue', PrimeVue);
// App.use(ToastService);
// Aapp.directive('tooltip', Tooltip);
// App.component('Button', Button);
App.component('TabMenu', TabMenu);
App.component('DataTable', DataTable);
// App.component('Column', Column);
// app.component('Toast', Toast);


