const { expect } = require('chai');
const { Shop, Item } = require('../src/gilded-rose');

describe('Gilded Rose', () => {
  it('shop should empty items when nothing supplied', () => {
    const gildedRose = new Shop();
    expect(gildedRose.items.length).to.equal(0);
  })

  it('shop should return all the items in constructor', () => {
    const gildedRose = new Shop([new Item('foo', 0, 0)]);
    expect(gildedRose.items.length).to.equal(1);
  })

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
    it('sellIn will decrease', () => {
      const gildedRose = new Shop([new Item('Aged Brie', 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(9);
    });

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

  context('item is Sulfuras', () => {
    it('sellIn will not decrease', () => {
      const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(0);
    });

    it('quality will not decrease or increase', () => {
      const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(10);
    });

    it('quality will not decrease or increase when sellin is -1', () => {
      const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', -1, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(10);
    });
  })

  context('item is Backstage passes', () => {
    it('sellIn will decrease by 1', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(9);
    });

    it('quality increase by 1 when sellin is more than 10', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 12, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(11);
    });

    it('quality increase by 2 when sellin is 10 days', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(12);
    });

    it('quality capped at 50 when sellin is 10 days', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it('quality increase by 3 when sellin is 5 days', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(13);
    });

    it('quality capped at 50 when sellin is 5 days', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 48)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it('quality become 0 when sellin is 0', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    });
  })
});
