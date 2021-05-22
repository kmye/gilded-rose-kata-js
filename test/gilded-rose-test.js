const { expect } = require('chai');
const { Shop, Item } = require('../src/gilded-rose');

describe('Gilded Rose', () => {
  context('item name is foo', () => {
    it('returns the correct item name, sell-in and quality', () => {
      const gildedRose = new Shop([new Item('foo', 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).to.equal('foo');
    });

    it('returns sellIn as -1 when sellIn is 0', () => {
      const gildedRose = new Shop([new Item('foo', 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(-1);
    });

    it('returns the quality as 0 when quality is 0', () => {
      const gildedRose = new Shop([new Item('foo', 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    });



    it('decreases quality by 2 when sell-in is 0', () => {
      const gildedRose = new Shop([new Item('foo', 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(8);
    });
  })

  context('item is Aged Brie', () => {
    it('increases quality when sell-in is 0', () => {
      const gildedRose = new Shop([new Item('Aged Brie', 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(12);
    });

    it('quality never more than 50', () => {
      const gildedRose = new Shop([new Item('Aged Brie', 0, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });
  })
});
