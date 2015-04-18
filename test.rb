		def get_neighbours(previous_state, x, y)
			count = 0
			count += previous_state[x - 1].count(true) if x - 1 >= 0
			count += previous_state[x].count(true)
			count += previous_state[x + 1].count(true) if x + 1 < previous_state.count
			count -= (previous_state[x][y] ? 1 : 0)
		end