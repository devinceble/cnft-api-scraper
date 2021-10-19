const axios = require("axios").default;
const jsonfile = require("jsonfile");
const file = "cnft-units.json";
const baseURL = "https://api.cnft.io";
const colors = require("colors");

const args = require("yargs").argv;
const { mode, rareitem, maxprice } = args;

const api = axios.create({
  baseURL: baseURL,
});

let pageNum = 1;
let rawUnits = [];
let rareItemsList = [
  "Charles's samurai",
  "Cardano astronaut",
  "Charles's billion dollar console",
  "Charles's painting",
  "The mighty one poster",
  "Gold unicorn trophy",
  "Black desk",
  "Charles's safe",
];

const apiCall = () => {
  if (40 >= pageNum) {
    const payload = {
      search: "",
      sort: "date",
      order: "desc",
      page: pageNum,
      verified: true,
      project: "CardanoCity",
      count: 200,
    };

    console.log("Getting units for page: ".green, pageNum);

    api
      .post("/market/listings", payload)
      .then((res) => {
        rawUnits.push(...res.data.assets);
      })
      .catch((err) => {
        console.log(
          "Error Sending the Request For Page: ",
          pageNum,
          " Error: ",
          err
        );
      });

    pageNum++;
  } else {
    clearIntervalAndWriteFile();
  }
};

const printRareUnits = () => {
  const units = jsonfile.readFileSync(file);
  let processedUnits = [];

  units.forEach((item) => {
    const priceInADA = item.price / 1000000;
    const unit = extractUnitNum(item);
    const value = extractValue(item);

    if (unit) {
      const contents = extractContents(item);
      const valuePerADA =
        value && priceInADA ? Math.trunc(value / priceInADA) : "N/A";

      try {
        contents.forEach((itm) => {
          const itemName = itm.name.toLowerCase();
          if (itemName.includes(rareitem.toLowerCase())) {
            if (maxprice && maxprice < priceInADA) {
              return;
            } else {
              processedUnits.push({
                unit,
                itemName,
                priceInADA,
                value,
                valuePerADA,
              });
            }
          }
        });
      } catch (err) {
        console.log("Discovered error with: ", item, " - ", err);
      }
    }
  });

  const sortedUnitsByItem = processedUnits.sort((a, b) => {
    return a.priceInADA - b.priceInADA;
  });

  if (sortedUnitsByItem?.length > 0) {
    console.table(sortedUnitsByItem);
    showPaperHandsMsg();
  } else {
    console.log(
      `\nNo ${rareitem} found below ${maxprice} ADA... ARE WE MOONING?`.red
    );
  }
};

if (mode === "get-units") {
  console.log("\nRetreiving CardanoCity units from cnft...\n");
  const interval = setInterval(apiCall, 3000 * Math.random());

  function clearIntervalAndWriteFile() {
    console.log(
      "\n========================================================================================================="
        .cyan
    );
    console.log(
      `\nSuccessfully retreived ${rawUnits.length} CardanoCity units from cnft...`
        .magenta
    );
    clearInterval(interval);
    jsonfile.writeFileSync(file, rawUnits);
    console.log(
      "Stored CardanoCity units locally, so you can perform searches for rare items and low units!"
        .magenta
    );
    console.log(
      "\n========================================================================================================="
        .cyan
    );
  }
} else if (mode === "find-items") {
  printRareUnits();
}

function extractUnitNum(item) {
  if (item?.metadata?.name) {
    if (item.metadata.name.includes("CardanoCityUnit"))
      return Number(item.metadata.name.split("CardanoCityUnit")[1]);
  } else return "N/A";
}

function extractValue(item) {
  const tags = item?.metadata?.tags;
  if (tags && tags.length > 1) {
    return Number(
      tags.filter((tag) => tag && tag.value && tag.value.length > 1)[0]?.value
    );
  } else return "N/A";
}

function extractContents(item) {
  const tags = item?.metadata?.tags;
  if (tags && tags.length > 1) {
    return tags.filter(
      (tag) => tag && tag.contents && tag.contents.length > 1
    )[0]?.contents;
  } else return "N/A";
}

function showPaperHandsMsg() {
  console.log(
    "\n========================================================================================================="
      .cyan
  );
  console.log(
    "\n                       They had their chance to be apart of our glorious metaverse."
      .green,
    "\n\n                  WIPE THE FLOOOOOOOR WITH THESE PAPERHANDED BITCHES. CITIZEN'S STRONK!"
      .green
  );
  console.log(
    "\n========================================================================================================="
      .cyan
  );
}
