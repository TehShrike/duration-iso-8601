const parse = require('./index')
const { test } = require('zora')

test('should convert every part', t => {
	t.deepEqual(parse('P5Y'), {
		year: 5,
	})
	t.deepEqual(parse('P11M'), {
		month: 11,
	})
	t.deepEqual(parse('P238D'), {
		day: 238,
	})
	t.deepEqual(parse('PT15H'), {
		hour: 15,
	})
	t.deepEqual(parse('PT56M'), {
		minute: 56,
	})
	t.deepEqual(parse('PT384S'), {
		second: 384,
	})
	t.deepEqual(parse('P18Y29,4M5DT36.66H1M289S'), {
		year: 18,
		month: 29.4,
		day: 5,
		hour: 36.66,
		minute: 1,
		second: 289,
	})
	t.deepEqual(parse('P1Y30DT15M39S'), {
		year: 1,
		day: 30,
		minute: 15,
		second: 39,
	})
})

test('should handle HMS missing T', t => {
	t.equal(parse('P23H'), null)
	t.equal(parse('P8S'), null)
	t.equal(parse('P3Y5S'), null)
})

test('should handle . , - in number part', t => {
	t.deepEqual(parse('P82.9Y'), {
		year: 82.9,
	})
	t.deepEqual(parse('P8,99Y'), {
		year: 8.99,
	})
	t.deepEqual(parse('P35,46Y'), {
		year: 35.46,
	})
	t.equal(parse('PT-50S'), null)
})

test('should handle non number in number part', t => {
	t.equal(parse('P8sdwe!@Y'), null)
	t.equal(parse('PT^li98S'), null)
	t.equal(parse('PDTS'), null)
})

test('should handle invalid input', t => {
	t.equal(parse('PT12.H'), null)
	t.equal(parse('P2M8M9M'), null)
	t.equal(parse('P3Ynlwkqejq$5D'), null)
	t.equal(parse('P1Mqwe!213DT18M9S'), null)
	t.equal(parse('P87(*&(bfwefh'), null)
	t.equal(parse('P)(*)(HKJGH12*('), null)
	t.equal(parse('ieurht834'), null)
	t.equal(parse('^(*&*( qh2we'), null)
	t.equal(parse(''), null)
})
