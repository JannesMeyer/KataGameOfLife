import Cell from './Cell';

export default function World(width, height, generation = 1, initialState) {
  this.width = width;
  this.height = height;
  this.generation = generation;
  this.rows = create(height, y => create(width, x => new Cell(x, y, this)));
  if (initialState !== undefined) {
    this.setState(initialState);
  }
}

World.fromString = function(text) {
  var lines = text.split('\n');
  var gen = lines[0].match(/^Generation (\d+):$/);
  var size = lines[1].split(' ').map(Number);
  var state = lines.slice(2).map(line => line.split('').map(str => str === '*'));
  return new World(size[1], size[0], Number(gen[1]), state);
};

/**
 * Pretty-prints the current state as ASCII art
 */
World.prototype.toString = function() {
  var lines = [
    'Generation ' + this.generation + ':',
    this.height + ' ' + this.width
  ];

  this.rows.forEach(function(row) {
    lines.push(row.map(function(cell) {
      return cell.alive ? '*' : '.';
    }).join(''));
  });

  return lines.join('\n');
};

World.prototype.getCell = function(x, y) {
  if (typeof x !== 'number' || isNaN(x)) {
    throw new TypeError("The first argument is not a number");
  }
  if (typeof y !== 'number' || isNaN(y)) {
    throw new TypeError("The second argument is not a number");
  }
  if (x < 0 || x >= this.width ||
      y < 0 || y >= this.height) {
    return undefined;
  }
  return this.rows[y][x];
};

World.prototype.getNeighbours = function({ x, y }) {
  return [
    this.getCell(x - 1, y - 1),
    this.getCell(x,     y - 1),
    this.getCell(x + 1, y - 1),
    this.getCell(x - 1, y    ),
    this.getCell(x + 1, y    ),
    this.getCell(x - 1, y + 1),
    this.getCell(x,     y + 1),
    this.getCell(x + 1, y + 1)
  ].filter(Boolean);
};

World.prototype.setState = function(state) {
  this.rows.forEach((row, y) => row.forEach((cell, x) => cell.alive = state[y][x]));
};

World.prototype.next = function() {
  this.generation++;
  this.rows.forEach(row => row.forEach(cell => cell.next()));
  return this;
};

/**
 * Creates an array of `length`, initialized to the values
 * supplied by `callback`
 */
function create(length, callback) {
  var a = [];
  for (var i = 0; i < length; ++i) {
    a[i] = callback(i);
  }
  return a;
}