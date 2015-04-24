module Kata
	class World
		def initialize(initial_world, calculator)
			@world = initial_world
			@size = @world.count
			@calculator = calculator
		end

		def next
			@world.map.with_index do | row, y |
				row.map.with_index do | cell, x |
					neighbours = @calculator.neighbours(x, y, @world)
					decide_state(cell, neighbours)
				end
			end
		end

		private

		def decide_state(alive, neighbours)
			return true if alive && neighbours == 2
			false
		end
	end
end
