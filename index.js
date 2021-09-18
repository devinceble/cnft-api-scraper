const axios = require("axios").default;
const baseURL = "https://api.cnft.io";

var pageNum = 1;
var units = [];
var rareItems = ["Charles's samurai", "Cardano astronaut", "Charles's billion dollar console", "Charles's painting", "The mighty one poster", "Gold unicorn trophy", "Black desk", "Charles's safe"];

const api = axios.create({
  baseURL: baseURL,
});

console.log("Retreiving CardanoCity Units from cnft...");

const apiCall = () => {
  const payload = {
    search: "",
    sort: "date",
    order: "desc",
    page: pageNum,
    verified: true,
    project: "CardanoCity",
  };

  api
    .post("/market/listings", payload)
    .then((res) => {
      res.data.assets.forEach((item) => {
        const price = item.price / 1000000;
        const tags = item.metadata.tags;
        const unit = item.metadata.name.split("CardanoCityUnit")[1];
        const contents = tags.filter(
          (tag) => tag && tag.contents && tag.contents.length > 1
        )[0].contents;

        try {
          contents.forEach((itm) => {
            const itemName = itm.name;
            const priceInADA = price;

            if (itemName === ) {
              units.push(unit, itemName, priceInADA);
            } else if (itemName === ) {
              units.push(unit, itemName, priceInADA);
            } else if (itemName === ) {
              units.push(unit, itemName, priceInADA);
            } else if (itemName === ) {
              units.push(unit, itemName, priceInADA);
            } else if (itemName === ) {
              units.push(unit, itemName, priceInADA);
            } else if (itemName === ) {
              units.push(unit, itemName, priceInADA);
            } else if (itemName === ) {
              units.push(unit, itemName, priceInADA);
            } else if (itemName === ) {
              units.push(unit, itemName, priceInADA);
            }
          });
        } catch (err) {
          console.log("Discovered error with: ", unit, " - ", err);
        }
      });
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
};

const interval = setInterval(apiCall, 1000);

if (pageNum > 3) {
  clearInterval(interval);

  units.forEach((unit) => {
    console.log(unit, " - Item: ", itemName, " Price: ", priceInADA, "ADA");
  });

  console.log(
    "They had their chance to be apart of our glorious metaverse. WIPE THE FLOOOOOOOR WITH THESE FOOLS! CITIZEN'S STRONK!"
  );
}
