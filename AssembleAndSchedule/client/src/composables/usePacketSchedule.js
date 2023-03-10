import { ref } from "vue";
import api from "@/ScheduleApiService.js";
//import { todaysDate } from "@/utils/date.js";

const schedule = ref([]);
schedule.value.dataLoaded = false;
const hasHDNs = ref([]);
const error = ref([]);

export default () => {
  const waitFor = (time) => {
    return new Promise((resolve) => {
      //, reject
      setTimeout(() => resolve(true), time);
    });
  };

  function calculateLineals(sides) {
    let maxCut = 91; // We lose six inches due to the angle of the cut or clamping of the lineal
    let ninetySevensCount = 0;
    let oneFiftiesCount = 0;
    let numberOfCuts = 0; // To account for the one inch loss between cuts
    let totalLength = 0;
    let index = 0; // Index of the smallest element that can be used in a combination for a lineal

    sides.sort((a, b) => {
            return a - b;
        })

        for(let i = sides.length - 1; i > index; i--) {
            totalLength = sides[i];

        if(sides[i] > maxCut) { // Any sides larger than 91 inches will use a 150 inch lineal
            oneFiftiesCount++;
            continue;
        } else if (sides[i] <= 0) continue;

        for(let j = index; j < i; j++) {
            if(sides[j] <= 0) {
                continue;
            }
            
            index = j;
            totalLength += sides[j];
            numberOfCuts++;
            
            if(totalLength > maxCut - numberOfCuts) {
                ninetySevensCount++;
                numberOfCuts = 0;
                break;
            }
            
        }

        if(index + 1 == i) {
            switch(totalLength) {
                case totalLength > maxCut - numberOfCuts: ninetySevensCount + 2; break;
                default: ninetySevensCount++;    
            };
        }
    }   
    
        return ({
            nintySevens: ninetySevensCount, 
            oneFifties: oneFiftiesCount
        });
}
  function loadToPlantShip(load) {
    switch (load) {
      case "MON - F":
        return "SUN - S";
      case "MON - S":
        return "MON - T";
      case "MON - T":
        return "SUN - F";
      case "TUE - F":
        return "MON - S";
      case "TUE - S":
        return "TUE - T";
      case "TUE - T":
        return "MON - F";
      case "WED - F":
        return "TUE - S";
      case "WED - S":
        return "WED - T";
      case "WED - T":
        return "TUE - F";
      case "THU - F":
        return "WED - S";
      case "THU - S":
        return "THU - T";
      case "THU - T":
        return "WED - F";
      case "FRI - F":
        return "THU - S";
      case "FRI - S":
        return "FRI - T";
      case "FRI - T":
        return "THU - F";
      case "SAT - F":
        return "FRI - S";
      case "SAT - S":
        return "SAT - T";
      case "SAT - T":
        return "FRI - F";
      case "SUN - F":
        return "SAT - S";
      case "SUN - S":
        return "SUN - T";
      case "SUN - T":
        return "SAT - F";
    }
  }

  function fillScrewKit(glassType, shape, EJ)
  {
    if (glassType.includes("LM") || glassType.includes("IR") || glassType.startsWith("I389") || glassType.includes("TI") || glassType.includes("389I"))
    {
      if (shape.includes("SPRING") || shape.includes("GOTH") || shape.includes("FULL ROUND"))
        return "SL Kit";
      else if (EJ.includes("APLD"))
        return "Apld Kit";
      else
        return "Reg Kit";
    }
    else
      return "No Kit";
  }

  const buildSchedule = async (lineOrAframe, packetDate) => {
    try {
      schedule.value.dataLoaded = false;

      // Clear schedule so it can be reset
      schedule.value = [];

      // Fetch completed racks
      if (lineOrAframe.length == 1)//it's a line
        schedule.value = await api.getPacketData(lineOrAframe, packetDate); //todaysDate.value        
      else//aframe print - always pass date in case of aframe number reuse
        schedule.value = await api.getPacketDataForAframe(lineOrAframe, packetDate);

      //translate day-shift, mark cancelled and HDN items
      for (let idxSched = 0; idxSched < schedule.value.length; idxSched++) {
        const rack = schedule.value[idxSched];
        rack.hasHDNs = false;

        for (
          let idxAsn = 0;
          idxAsn < schedule.value[idxSched].asnline.length;
          idxAsn++
        ) {
          const asnline = rack.asnline[idxAsn];
          const obHist = asnline.ordBaseHist;
          const sHist = obHist.shipHist;

          sHist.adjustedPlantShip = loadToPlantShip(
            sHist.loadDay + " - " + sHist.loadShift
          );

          obHist.calculatedField.adjustedScrewKit = fillScrewKit(
            obHist.glasstype, obHist.shape, obHist.extjamb
          );

          if (obHist.sentFlg == "C") obHist.cancelledMsg = "Cancelled";
          else if (obHist.sentFlg == "D") obHist.cancelledMsg = "Deleted";
          else obHist.cancelledMsg = "";

          if (obHist.extjamb.startsWith("APLD")) obHist.APLD = "APLD";
          else obHist.APLD = "";

          if (obHist.grilleInformation !== null) {
            if (obHist.grilleInformation.customEjSize !== "")
              obHist.customEJLabelText = "Custom EJ:";
            else obHist.customEJLabelText = "";
          } else obHist.customEJLabelText = "";

          // obHist.totalLength = obHist.ordDimensionHist.aside + obHist.ordDimensionHist.bside + obHist.ordDimensionHist.cside + 
          //   obHist.ordDimensionHist.dside + obHist.ordDimensionHist.eside + obHist.ordDimensionHist.fside;

          obHist.lineals = calculateLineals([obHist.ordDimensionHist.aside, 
            obHist.ordDimensionHist.bside, 
            obHist.ordDimensionHist.cside, 
            obHist.ordDimensionHist.dside,
            obHist.ordDimensionHist.eside,
            obHist.ordDimensionHist.fside]);

          asnline.hasHDNs = false;
          //obHist.hasHDNs = false;

          if (obHist.awno != null) {
            if (obHist.awno.includes("HDN")) {
              hasHDNs.value = true;
              rack.hasHDNs = true;
              asnline.hasHDNs = true;
              //obHist.hasHDNs = true;
            }
          }
        }
      }

      //hasHDNs.value = schedule.value?.filter(x => x.hasHDNs).length > 0; //just racks with HDNs

      //Data is loaded, but wait a second so Packets screen loaded when we set dataloaded to true - which prompts Packets.vue to Print().  Not waiting = blank print screen.
      await waitFor(1500);
      schedule.value.dataLoaded = true;
      await waitFor(1000);
      schedule.value.dataLoaded = false; //shut this off again for next print
    } catch (ex) {
      //error object seen by calling components, rethrown error seen by calling composables
      error.value = ex.stack; //stack has error message AND detail
      await waitFor(1000); //watcheffect won't see the change if you change it right back
      error.value = ""; //shut this off again for next run
      //throw('Rethrown: ' + ex.stack); //only use if called from composable - error seen by calling composables and in F12 but not calling components
    }
  };

  return {
    schedule,
    buildSchedule,
    hasHDNs,
    error,
  };
};
