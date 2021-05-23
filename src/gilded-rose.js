const MAX_QUANTITY = 50;
const MIN_QUANTITY = 0;

const SELLIN_THRESHOLD_QUALITY_INCREASE_BY_2 = 10;
const SELLIN_THRESHOLD_QUALITY_INCREASE_BY_3 = 5;

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  decreaseSellIn() {
    this.sellIn -= 1;
  }

  decreaseQualityBy(amount) {
    this.quality -= amount;
  }

  increaseQualityBy(amount) {
    this.quality += amount;
  }
}

class AgeBrie extends Item {
  constructor(sellIn, quality) {
    super('Aged Brie', sellIn, quality);
  }
  updateQuality() {

  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > MIN_QUANTITY) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].decreaseQualityBy(1);
          }
        }
      } else if (this.items[i].quality < MAX_QUANTITY) {
        this.items[i].quality = this.items[i].quality + 1;
        if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.items[i].sellIn <= SELLIN_THRESHOLD_QUALITY_INCREASE_BY_2) {
            if (this.items[i].quality < MAX_QUANTITY) {
              this.items[i].increaseQualityBy(1);
            }
          }
          if (this.items[i].sellIn <= SELLIN_THRESHOLD_QUALITY_INCREASE_BY_3) {
            if (this.items[i].quality < MAX_QUANTITY) {
              this.items[i].increaseQualityBy(1);
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].decreaseSellIn();
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > MIN_QUANTITY) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].decreaseQualityBy(1);
              }
            }
          } else {
            this.items[i].decreaseQualityBy(this.items[i].quality);
          }
        } else if (this.items[i].quality < MAX_QUANTITY) {
          this.items[i].increaseQualityBy(1);
        }
      }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop,
};
