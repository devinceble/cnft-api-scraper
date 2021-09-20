<img src="https://cardanocity.io/static/media/cardanocity_logo.66fd0067.svg" style="display: flex; margin: auto"/>

# Installation

This tool uses NodeJS 15.4.0, there are tons of tutorials out there on how to download and install NodeJS.
This readme will not be a Node tutorial unfortunately. Once you have node installed and have pulled down the git repo to your PC run the following to install the project:

```bash
npm i
```

## **Next, open your terminal and determine which mode you would like to run**

#### There are 3 modes to run. First you must retrieve the units then you can run rare item and floorbuster mode. Please do NOT retrieve the units more than once every 3-4 hours, cnft.io is a very important part of the CNFT ecosystem at the moment, and bringing it down could prove to be catastrophic at a time when ethereum refugees are flooding into the CNFT world.

<hr>

#### Please note the rare item mode isn't really optimized yet, when I have the time I will group the rare items together and add an option to show only items below a certain price.

<hr>

<br>

**Retrieve the units from cnft.io**:

```bash
node index.js --mode=get-units
```

**Find items with 10% rarity or less (BETA MODE PLEASE BEAR WITH ME)**:

```bash
node index.js --mode=find-rare-items
```

**FLOORBUSTER MODE!!!**:

For floorbuster mode, this will find how much ADA it would cost and how many units sold it would take to bust the floor to specified ADA amount, in this example to get the floor to 35 ADA run:

```bash
node index.js --mode=floorbuster --floorPrice=35
```
