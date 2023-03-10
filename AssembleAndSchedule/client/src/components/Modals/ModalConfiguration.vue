<template>
    <transition name="modal-animation">
      <div v-show="modalConfigurationActive" class="modal">
        <transition name="modal-animation-inner">
          <div v-show="modalConfigurationActive" class="modal-inner">
            <i @click="close" class="far fa-times-circle"></i>
            <!-- Modal Content -->
            <div class="modal-content">
              <h1>Configuration Settings</h1>
              <div>
                <table id="tblConfiguration">
                  <tbody>
                    <tr v-for="config in configuration" :key="config.name">
                      <td>{{ config.name }}</td>
                      <td><input type="text" v-model="config.value" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="buttonFooter">
              <button @click="saveSettings" type="button">Save</button> &nbsp;
              <button @click="closeConfigurationModal">Close</button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </template>
  
  <script>
  import { ref } from "vue";
  import { useToast } from "primevue/usetoast";
  import useConfiguration from "@/composables/useConfiguration.js";
  
  export default {
    props: ["modalConfigurationActive"],
    setup(props, { emit }) {
      const toast = useToast();
      const results = ref([]);
  
      const { configuration, saveConfiguration } = //, errorConfig
        useConfiguration();
  
      // watchEffect(() => {
      //   if (errorConfig.value.length > 0) {
      //     alert(errorConfig.value);
      //   }
      // }); //throw(errorConfig.value);
  
      async function saveSettings() {
const response = await saveConfiguration(configuration.value);
toast.add({ severity: 'info', summary: "Configuration Settings Saved", life: 2000 });
closeConfigurationModal();
console.log(`Save settings response: ${response}`);
}
  
      const closeConfigurationModal = () => {
        results.value = [];
        emit("closeConfigurationModal");
      };
  
      return {
        results,
        configuration,
        saveSettings,
        closeConfigurationModal,
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .modal-content {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }
  tbody tr {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
  tr:nth-of-type(odd) {
    background: #ecf0f1;
  }
  input[type="text"] {
    text-align: center;
  }
  </style>
  