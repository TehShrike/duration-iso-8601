const numberRegExp = '\\d+(?:[\.,]\\d+)?'
const durationRegExpS = `(?:(${numberRegExp})S)?)?`
const durationRegExpTM = `(?:(${numberRegExp})M)?`
const durationRegExpH = `(?:T(?:(${numberRegExp})H)?`
const durationRegExpD = `(?:(${numberRegExp})D)?`
const durationRegExpM = `(?:(${numberRegExp})M)?`
const durationRegExpY = `(?:(${numberRegExp})Y)?`
const durationRegExp = new RegExp(`^P${durationRegExpY}${durationRegExpM}${durationRegExpD}${durationRegExpH}${durationRegExpTM}${durationRegExpS}$`)

module.exports = (duration) => {
  const matchResult = duration.match(durationRegExp)

  if (matchResult === null) {
    return null
  }

  const durationResult = {}
  let foundAnyValues = false

  for (let matchResultIndex = 1; matchResultIndex <= Math.min(matchResult.length, 6); matchResultIndex++) {
    if (matchResult[matchResultIndex] !== undefined) {
      const value = Number(matchResult[matchResultIndex].replace(',', '.'))

      if (Number.isNaN(value)) {
        return
      }

      foundAnyValues = true

      switch (matchResultIndex) {
        case 1:
          durationResult.year = value
          break
        case 2:
          durationResult.month = value
          break
        case 3:
          durationResult.day = value
          break
        case 4:
          durationResult.hour = value
          break
        case 5:
          durationResult.minute = value
          break
        case 6:
          durationResult.second = value
          break
      }
    }
  }

  if (!foundAnyValues) {
    return null
  }

  return durationResult
}
