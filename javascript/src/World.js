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
  if (lines.length < 3) {
    throw new Error("Input string is not in the correct format");
  }

  var gen = lines[0].match(/^Generation (\d+):$/);
  if (gen === null) {
    throw new Error("Couldn't read the generation from the input string");
  }

  var size = lines[1].split(' ').map(Number);
  if (size.length !== 2) {
    throw new Error("Couldn't read the dimensions from the input string");
  }

  var state = lines.slice(2).map(line => line.split('').map(chr => chr === '*'));

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
  this.rows.forEach((row, y) => row.forEach((cell, x) => {
    return cell.alive = state.hasOwnProperty(y) && state[y][x];
  }));
};

World.prototype.next = function() {
  this.generation++;

  var neighbours = this.rows.map(row => row.map(cell => {
    return this.getNeighbours(cell).filter(cell => cell.alive).length;
  }));

  this.rows.forEach((row, y) => row.forEach((cell, x) => cell.next(neighbours[y][x])));

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