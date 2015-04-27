var World = require('../build/World.js');
var Cell = require('../build/Cell.js');

describe("Cell", function() {

  var world;
  var deadCell;
  var livingCell;

  beforeEach(function() {
    world = new World(3, 3);
    deadCell = world.getCell(0, 0);
    livingCell = world.getCell(1, 1);
    livingCell.alive = true;
  });

  it("has a position", function() {
    var livingCell = world.getCell(0, 1);
    expect(livingCell.x).toBe(0);
    expect(livingCell.y).toBe(1);
  });

  it("is dead in the beginning", function() {
    expect(deadCell.alive).toBe(false);
  });

  it("dies of underpopulation when 1 neighbour is alive", function() {
    spyOn(livingCell, 'getLivingNeighbours').and.returnValue(1);
    expect(livingCell.next().alive).toBe(false);
  });

  it("survives when 2 neighbours are alive", function() {
    spyOn(livingCell, 'getLivingNeighbours').and.returnValue(2);
    expect(livingCell.next().alive).toBe(true);
  });

  it("survives when 3 neighbours are alive", function() {
    spyOn(livingCell, 'getLivingNeighbours').and.returnValue(3);
    expect(livingCell.next().alive).toBe(true);
  });

  it("dies of overpopulation when 4 neighbours are alive", function() {
    spyOn(livingCell, 'getLivingNeighbours').and.returnValue(4);
    expect(livingCell.next().alive).toBe(false);
  });

  it("reproduces when it is dead and 3 neighbours are alive", function() {
    spyOn(deadCell, 'getLivingNeighbours').and.returnValue(3);
    expect(deadCell.next().alive).toBe(true);
  });

  // This test made me implement World.getNeighbours()
  it("calculates the number of living neighbours", function() {
    expect(livingCell.getLivingNeighbours()).toBe(0);
    world.getCell(0, 0).alive = true;
    world.getCell(2, 2).alive = true;
    expect(livingCell.getLivingNeighbours()).toBe(2);
  });

});