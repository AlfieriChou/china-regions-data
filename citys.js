const citys = require('./json/citys_35.json')

const coreCities = ['110000', '310000']
const importantCities = []
const otherCities = []

citys[1].child.map(item => {
  importantCities.push(item.value)
})

citys[2].child.map(item => {
  item.child.map(ele => {
    if (ele.deprecated === 0) {
      otherCities.push(ele.value)
    }
  })
})

console.log('---->', importantCities, otherCities.length)
