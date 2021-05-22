const { expect } = require('chai');
const { Shop, Item } = require('../src/gilded-rose');

describe('Gilded Rose', () => {
  it('should return the correct item name, sellin and quality', () => {
    const gildedRose = new Shop([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal('foo');
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].sellIn).to.equal(-1);
  });
});
