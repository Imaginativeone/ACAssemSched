<template>
    <span class="packetButtonGroup">
      <Button 
      label="Create Packsize" 
      v-if="!isSuccessfull" 
      @click="sendPacksizeFile"
      class="p-button-raised p-button-rounded"
      :disabled="$route.name == 'History'"/>
  
      <Button 
      label="Packsize Created" 
      v-if="isSuccessfull" 
      @click="sendPacksizeFile"
      class="p-button-raised p-button-rounded"
      icon="pi pi-check-square"
      :disabled="true"/>
  
      <Button 
      label="Line 1 Packets" 
      @click="printPackets(1)"
      class="p-button-raised p-button-rounded"
      :disabled="$route.name == 'History'"/>
  
      <Button 
      label="Line 2 Packets" 
      @click="printPackets(2)"
      class="p-button-raised p-button-rounded"
      :disabled="$route.name == 'History'"/>
  
      <Button 
      label="Create FlexiData"
      class="p-button-raised p-button-rounded"
      v-if="!isFlexiDataLoading" 
      @click="createFlexiDataExcelFiles" 
      :disabled="$route.name == 'History'"
      />
  
      <Button
      label="Processing .."
      class="p-button-raised p-button-rounded"
      v-if="isFlexiDataLoading" 
      :disabled="true"/>
  
  
      <!-- <button v-if="!isFlexiDataLoading" @click="createFlexiDataExcelFiles" :disabled="$route.name == 'History'" style="width: 165px;">
        Create FlexiData
      </button>
      <button v-if="isFlexiDataLoading" :disabled="true" style="width: 165px;">
        Processing...<span><div class="buttonSpinner"></div></span>
      </button> -->
    </span>
  </template>
  
  <script>
  import usePacksize from "@/composables/usePacksize.js";
  import useFlexiData from "@/composables/useFlexiData.js";
  import router from "../router/index.js";
  import { todaysDate } from "@/utils/date.js";
  import { watchEffect } from '@vue/runtime-core';
  import { useToast } from 'primevue/usetoast';
  
  export default {
    setup() {
      const toast = useToast();
      const { sendPacksizeFile, isSuccessfull } = usePacksize();
  
      const { createFlexiDataExcelFiles, isFlexiDataLoading } = useFlexiData();
  
      const printPackets = (lineNumber) => {
        router.push({
          name: "Packets",
          params: { lineOrAframe: lineNumber, packetDate: todaysDate.value },
        });
      };
  
      watchEffect(() => {if (isSuccessfull.value == true) {toast.add({ severity: 'success', summary: 'Packsize Files Created', life: 3000 })}})
      
      return {
        isSuccessfull,
        sendPacksizeFile,
        printPackets,
        createFlexiDataExcelFiles,
        isFlexiDataLoading,
      };
    },
  };
  </script>
  
  <style lang="scss">
  span {
    content: "\2705";
    font-size: 13px;
  }
  
  </style>
  