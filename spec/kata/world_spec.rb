require 'spec_helper'

describe Kata::World do
  let(:world) { described_class.new }

  describe '#next' do
    it 'returns an empty 3x3 world when all cells are dead' do
    	state = [
    		[false, false, false],
    		[false, false, false],
    		[false, false, false]
    	]
    	expected = [
    		[false, false, false],
    		[false, false, false],
    		[false, false, false]
    	]
    	expect(described_class.new(state).next).to eq(expected)
    end

    it 'returns an empty 3x3 world when only one cell lives' do
    	state = [
    		[false, false, false],
    		[false, true,  false],
    		[false, false, false]
    	]
    	expected = [
    		[false, false, false],
    		[false, false, false],
    		[false, false, false]
    	]
    	expect(described_class.new(state).next).to eq(expected)
    end

    it 'returns one living cell when two cell live' do
    	state = [
    		[true, false, false],
    		[false, true, false],
    		[false, false, true]
    	]
    	expected = [
    		[false, false, false],
    		[false, true, false],
    		[false, false, false]
    	]
    	expect(described_class.new(state).next).to eq(expected)
    end
  end
end

