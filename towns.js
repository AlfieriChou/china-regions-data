const towns = require('./json/towns.json')

const municipality = ['110000', '310000', '120000', '500000']

const transCities = (codeArr) => {
  const cities = []
  for (let value of codeArr) {
    if (municipality.includes(value)) {
      cities.push(value)
    }
    if (value.slice(-4) === '0000' && !municipality.includes(value)) {
      towns.map(item => {
        if (item.code === value) {
          item.cities.map(ele => {
            cities.push(ele.code)
          })
        }
      })
    }
  }
  return cities
}

const testCodeArr = ['120000', '130000', '140000', '150000']

console.log('------>', transCities(testCodeArr))
