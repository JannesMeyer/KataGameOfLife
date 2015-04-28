var World = require('../build/World.js');
var Cell = require('../build/Cell.js');

describe("World", function() {

  var world;

  beforeEach(function() {
    world = new World(3, 3);
  });

  it("returns a cell inside the bounds", function() {
    expect(world.getCell(2, 2)).toEqual(jasmine.any(Cell));
  });

  it("doesn't return a cell outside the bounds", function() {
    expect(world.getCell(-1, -1)).toBeUndefined();
    expect(world.getCell( 3,  3)).toBeUndefined();
  });

  it("has up to eight neighbors per cell", function() {
    expect(world.getNeighbours(world.getCell(1, 1)).length).toBeLessThan(9);
  });

  it("pretty-prints the current state", function() {
    world.getCell(1, 1).alive = true;
    expect(world.toString()).toBe('Generation 1:\n3 3\n...\n.*.\n...');
  });

  it("loads the state from text and calculates the next generation", function() {
    var world = World.fromString('Generation 1:\n\
4 8\n\
........\n\
....*...\n\
...**...\n\
........').next();
    expect(world.toString()).toBe('Generation 2:\n\
4 8\n\
........\n\
...**...\n\
...**...\n\
........');
  });

  it("doesn't mix up old and new state when iterating", function() {
    var world = World.fromString('Generation 1:\n\
4 8\n\
...*....\n\
....*...\n\
..***...\n\
........').next();
    expect(world.toString()).toBe('Generation 2:\n\
4 8\n\
........\n\
..*.*...\n\
...**...\n\
...*....');
  });

});