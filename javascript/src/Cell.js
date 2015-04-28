export default function Cell(x, y, world) {
  this.x = x;
  this.y = y;
  this.alive = false;
  this.world = world;
}

/**
 * Calculates the next generation of the cell
 */
Cell.prototype.next = function(livingNeighbours) {
  if (this.alive && (livingNeighbours < 2 || livingNeighbours > 3)) {
    this.alive = false;
  } else if (!this.alive && livingNeighbours === 3) {
    this.alive = true;
  }
  return this;
};