<img src="https://cardanocity.io/static/media/cardanocity_logo.66fd0067.svg" style="display: flex; margin: auto"/>

# Installation

```bash
npm i
```

## **Open your terminal and determine which mode you would like to run**

### There are 3 modes to run, first you must retrieve the units then you can run rare item and floorbuster mode.

<hr>

#### Please note the rare item mode isn't really optimized yet, when I have the time I will group the rare items together and add an option to show only items below a certain price.

<hr>

<br>

**Retrieve the units from cnft.io**:

```bash
node index.js --mode=get-units
```

**Find items with 10% rarity or less**:

```bash
node index.js --mode=find-rare-items
```

**FLOORBUSTER MODE!!!**:

For floorbuster mode, this will find how much ADA it would cost and how many units sold it would take to bust the floor to specified ADA amount, in this example to get the floor to 45 ADA run:

```bash
node index.js --mode=floorbuster --floorPrice=40
```
