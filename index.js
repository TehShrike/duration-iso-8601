const durationRegExp = /^P(?:(\d+(?:[\.,]\d+)?)Y)?(?:(\d+(?:[\.,]\d+)?)M)?(?:(\d+(?:[\.,]\d+)?)D)?(?:T(?:(\d+(?:[\.,]\d+)?)H)?(?:(\d+(?:[\.,]\d+)?)M)?(?:(\d+(?:[\.,]\d+)?)S)?)?$/

const indexes = {
  1: 'year',
  2: 'month',
  3: 'day',
  4: 'hour',
  5: 'minute',
  6: 'second',
}

module.exports = (duration) => {
  const matchResult = duration.match(durationRegExp)

  if (matchResult === null) {
    return null
  }

  const durationResult = {}

  for (let matchResultIndex = 1; matchResultIndex <= Math.min(matchResult.length, 6); matchResultIndex++) {
    if (matchResult[matchResultIndex] !== undefined) {
      const value = Number(matchResult[matchResultIndex].replace(',', '.'))

      if (Number.isNaN(value)) {
        return
      }

      durationResult[indexes[matchResultIndex]] = value
    }
  }

  if (Object.keys(durationResult) === 0) {
    return null
  }

  return durationResult
}
