const axios = require("axios").default;
const jsonfile = require("jsonfile");
const file = "cnft-units.json";
const baseURL = "https://api.cnft.io";
const colors = require("colors");

const args = require("yargs").argv;
const { mode, floorPrice, rareItemPrice } = args;

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
  if (175 >= pageNum) {
    const payload = {
      search: "",
      sort: "date",
      order: "desc",
      page: pageNum,
      verified: true,
      project: "CardanoCity",
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
    const price = item.price / 1000000;
    const unit = extractUnitNum(item);
    const value = extractValue(item);

    if (unit) {
      const contents = extractContents(item);
      const valuePerADA = value && price ? Math.trunc(value / price) : "N/A";

      try {
        contents.forEach((itm) => {
          const itemName = itm.name;
          const priceInADA = price;
          const foundUnit = rareItemsList.filter(
            (rareItem) => rareItem === itemName
          );

          if (foundUnit.length > 0) {
            processedUnits.push({
              unit,
              itemName,
              priceInADA,
              value,
              valuePerADA,
            });
          }
        });
      } catch (err) {
        console.log("Discovered error with: ", item, " - ", err);
      }
    }
  });

  const sortedUnitsByItem = processedUnits.sort();

  // sortedUnitsByItem.forEach(({ unit, itemName, priceInADA, value}) => {
  //   console.log(unit, " - Item: ", itemName, " Price: ", priceInADA, "ADA", " Value: ", value);
  // });

  console.table(sortedUnitsByItem);
  showPaperHandsMsg();
};

const printFloorbuster = () => {
  const units = jsonfile.readFileSync(file);
  let totalADACost = 0;
  let totalUnits = 0;
  let processedUnits = [];

  units.forEach((item) => {
    const price = item.price / 1000000;
    if (price <= floorPrice) {
      processedUnits.push(item);
    }
  });
  processedUnits.forEach((item) => {
    totalADACost += item.price / 1000000;
    totalUnits++;
  });
  const totalADA = totalADACost.toLocaleString();

  console.log(
    "\n========================================================================================================="
      .cyan
  );
  console.log(
    `\n              To bust the current floor and raise it to ${floorPrice} ADA, it would cost`
      .red,
    `ONLY ${totalADA} ADA!`.green.red
  );
  console.log(
    `\n\n                                         ONLY ${totalUnits} units left to go!`
      .green
  );
  console.log(
    `\n\n                                     BUST THAT FLOOR LET'S GOOOOOOOO`
      .red
  );
  console.log(
    `\n\n                                  FIRST WE TAKE OVER CNFT, THEN THE WORLD.`
      .red
  );
  console.log(
    `\n\n                                             CITIZEN'S STRONK!`.magenta
  );
  console.log(
    "\n========================================================================================================="
      .cyan
  );
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
      "Stored CardanoCity units locally, so you can perform searches for rare items and busting the floor price"
        .magenta
    );
    console.log(
      "\n========================================================================================================="
        .cyan
    );
  }
} else if (mode === "find-rare-items") {
  printRareUnits();
} else if (mode === "floorbuster") {
  printFloorbuster();
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
