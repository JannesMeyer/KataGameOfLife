module.exports = Cell;

function Cell(x, y, world) {
	this.x = x;
	this.y = y;
	this.alive = false;
	this.world = world;
}

/**
 * Counts the number of alive neighbours
 */
Cell.prototype.getLivingNeighbours = function() {
	return this.world.getNeighbours(this).filter(function(cell) {
		return cell.alive;
	}).length;
};

/**
 * Calculates the next generation of the cell
 */
Cell.prototype.next = function() {
	var neighbours = this.getLivingNeighbours();
	if (this.alive && (neighbours < 2 || neighbours > 3)) {
		this.alive = false;
	} else if (!this.alive && neighbours === 3) {
		this.alive = true;
	}
	return this.alive;
};