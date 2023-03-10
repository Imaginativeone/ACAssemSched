import useSchedule from "@/composables/useSchedule.js";
import useConfiguration from "@/composables/useConfiguration.js";
import api from "@/ScheduleApiService.js";
import { formatDate } from "@/utils/date.js";
import { ref, computed } from "vue";

import useCompleteSchedule from "@/composables/useCompleteSchedule.js";

export default () => {
  const { lineOne, lineTwo } = useSchedule();
  const { configMap } = useConfiguration();
  const responses = ref([]);
  const isSuccessfull = ref(false);
  const packsizeQtyPerFile = computed(() => {
    return configMap?.value.get("Packsize Qty Per File");
  });

  const sendPacksizeFile = () => {
    const lineOneRushReorderRacks = lineOne.value
      .filter((s) => !s.packsizeCompleted && s.rushOrReorder)
      .sort((a, b) => (a.sequence < b.sequence ? 1 : -1));
    const lineOneNormalRacks = lineOne.value
      .filter((s) => !s.packsizeCompleted && !s.rushOrReorder)
      .sort((a, b) => (a.sequence < b.sequence ? 1 : -1));
    const lineTwoRushReorderRacks = lineTwo.value
      .filter((s) => !s.packsizeCompleted && s.rushOrReorder)
      .sort((a, b) => (a.sequence < b.sequence ? 1 : -1));

    const lineTwoNormalRacks = lineTwo.value
      .filter((s) => !s.packsizeCompleted && !s.rushOrReorder)
      .sort((a, b) => (a.sequence < b.sequence ? 1 : -1));
    uploadRacks(1, true, lineOneRushReorderRacks);
    uploadRacks(1, false, lineOneNormalRacks);
    uploadRacks(2, true, lineTwoRushReorderRacks);
    uploadRacks(2, false, lineTwoNormalRacks);
  };

  const reverseNumbering = (titleDataMap) => {
    let nonHdnCount = 0;
    let hdnCount = 0;
    for (const [key] of titleDataMap.entries()) {
      if (key.includes("(HDN)")) {
        hdnCount += 1;
      } else {
        nonHdnCount += 1;
      }
    }
    const reversedNumberingMap = new Map();
    for (const [key, value] of titleDataMap.entries()) {
      if (nonHdnCount > 0 || hdnCount > 0) {
        const stringSplitStart = key.split("[")[0];
        const stringSplitEnd = key.split("]")[1];
        let newKey;
        if (key.includes("(HDN)")) {
          newKey = `${stringSplitStart}[${hdnCount}]${stringSplitEnd}`;
        } else {
          newKey = `${stringSplitStart}[${nonHdnCount}]${stringSplitEnd}`;
        }
        reversedNumberingMap.set(newKey, value);
        if (key.includes("(HDN)")) {
          hdnCount -= 1;
        } else {
          nonHdnCount -= 1;
        }
      }
    }
    return reversedNumberingMap;
  };

  const uploadRacks = async (lineNumber, rushReorder, line) => {
    if (line) {
      const lineContent = buildFileContent(lineNumber, rushReorder, line);
      const lineContentNumberingReversed = reverseNumbering(lineContent);
      for (const [key, value] of lineContentNumberingReversed.entries()) {
        // Skip when no content
        if (value == "") {
          continue;
        }
        let myBuffer = [...Buffer.from(value)];
        await api.upload(key, myBuffer);
      }
      for (const rack of line) {
        const model = {
          aframenumber: rack.aframenumber,
          dateCreated: rack.dateCreated,
          line: rack.line,
          sequence: rack.sequence,
          packsizeCompleted: true,
          packetPrinted: rack.packetPrinted,
          custom: rack.custom,
        };
        const dateFormatted = formatDate(model.dateCreated);
        const { postRack } = useCompleteSchedule(
          model.aframenumber,
          dateFormatted,
          model
        );
        const response = await postRack();
        rack.completed = true;
        responses.value.push(response);
      }
      if (responses.value.length != 0) {
        const reducer = (previousValue, currentValue) =>
          previousValue + currentValue;
        isSuccessfull.value =
          responses.value.reduce(reducer) == responses.value.length * 200;
      }
    }
  };

  const buildFileContent = (lineNumber, rushReorder, line) => {
    const titleContentMap = new Map();

    let titleBuilder = "";
    if (lineNumber == 1) {
      titleBuilder += "Line1";
    } else {
      titleBuilder += "Line2";
    }
    if (rushReorder) {
      titleBuilder += "(Rush)";
    }
    let racks = [];
    let racksHdn = [];

    // Loop through racks in line
    for (var idx = 0; idx < line.length; idx++) {
      // If line has already been completed or if it's a custom, skip
      if (line[idx].packsizeCompleted || line[idx].custom) {
        //customs don't have a shape (or other fields) because it isn't saved anywhere
        continue;
      }
      // Loop through fx's in rack
      for (var i = 0; i < line[idx].asnline.length; i++) {
        // Exclude mulled units from packsize
        if (
            line[idx]?.asnline[i]?.ordBaseHist?.awno?.includes("MULL") || 
            line[idx]?.asnline[i]?.ordBaseHist?.awno?.includes("MFX")  ||
            line[idx]?.asnline[i]?.ordBaseHist?.awno?.includes("MCA")
            ) {
          continue;
        }
        let hdnRecord = false;
        if (line[idx]?.asnline[i]?.ordBaseHist?.awno?.includes("HDN")) {
          hdnRecord = true;
        }

        const aframe = line[idx].asnline[i].aframenumber;
        const fx = line[idx].asnline[i].fxno;
        const packsizeLength =
          line[idx].asnline[i].ordBaseHist.calculatedField.cartonLength;
        const packsizeWidth =
          line[idx].asnline[i].ordBaseHist.calculatedField.cartonWidth;
        const packsizeHeight =
          line[idx].asnline[i].ordBaseHist.calculatedField.cartonHeight;
        const glassQty = line[idx].asnline[i].glassqty;
        let rackObj = {
          aframe: aframe,
          fxno: fx,
          l: packsizeLength,
          w: packsizeWidth,
          h: packsizeHeight,
          qty: glassQty,
        };

        if (hdnRecord) {
          racksHdn.push(rackObj);
        } else {
          racks.push(rackObj);
        }
      }
    }

    // Normal Racks
    let title;
    let fileQty = 0;
    let content = "";
    let prevAframe;
    let fileNum = 0;
    let firstRecord = "";
    let lastRecord = "";
    for (let rack of racks) {
      if (rack.aframe == prevAframe) {
        continue;
      }

      const rackGrouped = racks.filter((s) => s.aframe == rack.aframe);
      const rackQty = rackGrouped
        .map((s) => s.qty)
        .reduce((prev, next) => prev + next, 0);
      // If the new rack qty would bring over packsizeQtyPerFile, set in title/content mapping start over
      if (fileQty + rackQty > packsizeQtyPerFile.value) {
        fileNum += 1;
        title = `${titleBuilder}[${fileNum}]${firstRecord}${lastRecord}`;
        titleContentMap.set(title, content);
        fileQty = 0;
        content = "";
        firstRecord = "";
        lastRecord = "";
      }
      while (fileQty + rackQty <= packsizeQtyPerFile.value) {
        for (let fx of rackGrouped) {
          // Hard-coded '50' is the machine code
          let strBuilder = `${fx.fxno}$50$${fx.l}$${fx.w}$${fx.h}$$$$${fx.qty}\n`;

          if (firstRecord == "") {
            firstRecord = `-${fx.aframe}-${fx.fxno}`;
          }
          content += strBuilder;
          prevAframe = fx.aframe;
          lastRecord = `-${fx.aframe}-${fx.fxno}`;
        }
        fileQty += rackQty;
        break;
      }
    }
    fileNum += 1;
    title = `${titleBuilder}[${fileNum}]${firstRecord}${lastRecord}`;
    titleContentMap.set(title, content);
    fileQty = 0;
    firstRecord = "";
    lastRecord = "";

    // Hdn Racks
    fileQty = 0;
    content = "";
    prevAframe = 0;
    fileNum = 0;
    for (let rack of racksHdn) {
      if (rack.aframe == prevAframe) {
        continue;
      }

      const rackGrouped = racksHdn.filter((s) => s.aframe == rack.aframe);
      const rackQty = rackGrouped
        .map((s) => s.qty)
        .reduce((prev, next) => prev + next, 0);
      // If the new rack qty would bring over ${packsizeQtyPerFile}, set in title/content mapping start over
      if (fileQty + rackQty > packsizeQtyPerFile.value) {
        fileNum += 1;
        title = `${titleBuilder}(HDN)[${fileNum}]${firstRecord}${lastRecord}`;
        titleContentMap.set(title, content);
        fileQty = 0;
        content = "";
        firstRecord = "";
        lastRecord = "";
      }
      while (fileQty + rackQty <= packsizeQtyPerFile.value) {
        for (let fx of rackGrouped) {
          // Hard-coded '50' is the machine code
          let strBuilder = `${fx.fxno}$50$${fx.l}$${fx.w}$${fx.h}$$$$${fx.qty}\n`;

          if (firstRecord == "") {
            firstRecord = `-${fx.aframe}-${fx.fxno}`;
          }
          content += strBuilder;
          prevAframe = fx.aframe;
          lastRecord = `-${fx.aframe}-${fx.fxno}`;
        }
        fileQty += rackQty;
        break;
      }
    }
    fileNum += 1;
    title = `${titleBuilder}(HDN)[${fileNum}]${firstRecord}${lastRecord}`;
    titleContentMap.set(title, content);
    fileQty = 0;
    firstRecord = "";
    lastRecord = "";

    return titleContentMap;
  };
  return {
    isSuccessfull,
    sendPacksizeFile,
  };
};
