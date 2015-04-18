require 'spec_helper'

describe Kata::World do
  let(:world) { described_class.new }

  describe '#next' do
    it 'calls the calculator for every cell in the world' do
        calculator = double('Calculator')

        state = [ [ true, false ], [ false, true ] ]

        expect(calculator).to receive(:neighbours).with(0, 0, state).and_return(0)
        expect(calculator).to receive(:neighbours).with(1, 0, state).and_return(0)
        expect(calculator).to receive(:neighbours).with(0, 1, state).and_return(0)
        expect(calculator).to receive(:neighbours).with(1, 1, state).and_return(0)

        described_class.new(state, calculator).next
    end

    it 'returns an empty 3x3 world when all cells are dead' do
        calculator = double('Calculator', neighbours: 0)

    	state = [ [false] ]
    	expected = [ [false] ]
    	expect(described_class.new(state, calculator).next).to eq(expected)
    end

    it 'returns an empty 3x3 world when only one cell lives' do
        calculator = double('Calculator', neighbours: 0)

        state = [ [true] ]
        expected = [ [false] ]
        expect(described_class.new(state, calculator).next).to eq(expected)
    end

    it 'returns one living cell when two cell live' do
        calculator = double('Calculator', neighbours: 2)

        state = [ [true] ]
    	expected = [ [true] ]
        expect(described_class.new(state, calculator).next).to eq(expected)
    end
  end
end

