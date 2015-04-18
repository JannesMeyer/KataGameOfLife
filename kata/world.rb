module Kata
	class World
		def initialize(initial_world)
			@world = initial_world
			@size = @world.count
		end

		def next
			@world.map.with_index do | row, y |
				row.map.with_index do | cell, x |
					neighbours = count_neighbours(x, y)
					decide_state(cell, neighbours)
				end
			end
		end

		private

		def decide_state(alive, neighbours)
			return true if alive && neighbours == 2
			false
		end

		def count_neighbours(x, y)
			get_neighbours(x, y).flatten.count(true)
		end

		def get_neighbours(x, y)
			x_first, x_last = adjacents(x)
			y_first, y_last = adjacents(y)

			neighbours = (x_first..x_last).map { |index| @world[index][y_first..y_last] }
			neighbours[x - x_first].delete_at(y - y_first)
			neighbours
		end

		def adjacents(coordinate)
	    first = [0, coordinate - 1].max
			last = [coordinate + 1, @size - 1].min

      return first, last
		end
	end
end