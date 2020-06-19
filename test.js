const parse = require('./index');

describe('duration-iso-8601', () => {
  it('should convert every part', () => {
    expect(parse('P5Y')).toEqual({
      year: 5,
    });
    expect(parse('P11M')).toEqual({
      month: 11,
    });
    expect(parse('P238D')).toEqual({
      day: 238,
    });
    expect(parse('PT15H')).toEqual({
      hour: 15,
    });
    expect(parse('PT56M')).toEqual({
      minute: 56,
    });
    expect(parse('PT384S')).toEqual({
      second: 384,
    });
    expect(parse('P18Y29,4M5DT36.66H1M289S')).toEqual({
      year: 18,
      month: 29.4,
      day: 5,
      hour: 36.66,
      minute: 1,
      second: 289,
    });
    expect(parse('P1Y30DT15M39S')).toEqual({
      year: 1,
      day: 30,
      minute: 15,
      second: 39,
    });
  });

  it('should handle HMS missing T', () => {
    expect(parse('P23H')).toBe(null);
    expect(parse('P8S')).toBe(null);
    expect(parse('P3Y5S')).toBe(null);
  });

  it('should handle . , - in number part', () => {
    expect(parse('P82.9Y')).toEqual({
      year: 82.9,
    });
    expect(parse('P8,99Y')).toEqual({
      year: 8.99,
    });
    expect(parse('P35,46Y')).toEqual({
      year: 35.46,
    });
    expect(parse('PT-50S')).toBe(null);
  });

  it('should handle non number in number part', () => {
    expect(parse('P8sdwe!@Y')).toBe(null);
    expect(parse('PT^li98S')).toBe(null);
    expect(parse('PDTS')).toBe(null);
  });

  it('should handle invalid input', () => {
    expect(parse('PT12.H')).toBe(null);
    expect(parse('P2M8M9M')).toBe(null);
    expect(parse('P3Ynlwkqejq$5D')).toBe(null);
    expect(parse('P1Mqwe!213DT18M9S')).toBe(null);
    expect(parse('P87(*&(bfwefh')).toBe(null);
    expect(parse('P)(*)(HKJGH12*(')).toBe(null);
    expect(parse('ieurht834')).toBe(null);
    expect(parse('^(*&*( qh2we')).toBe(null);
    expect(parse('')).toBe(null);
  });
});
