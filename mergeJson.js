const regions = require('./regions.json')
const town = require('./town.json')
const fs = require('fs')

for (let i = 0; i < regions.length; ++i) {
  if (regions[i].cities) {
    let cities = regions[i].cities
    if (cities) {
      for (let j = 0; j < cities.length; ++j) {
        if (cities[j].districts) {
          let districts = cities[j].districts
          for (let k = 0; k < districts.length; ++k) {
            if (!districts[k].towns) {
              districts[k].towns = []
            }
            for (let index in town) {
              if (town[index].city === districts[k].name) {
                districts[k].towns.push({
                  code: parseInt(index.slice(0, 9)),
                  name: town[index].name.replace(/街道办事处|办事处|街道/gi, '')
                })
              }
            }
            console.log('---->', districts[k])
          }
        } else {
          if (!cities[j].towns) {
            cities[j].towns = []
          }
          for (let index in town) {
            if (town[index].city === cities[j].name) {
              cities[j].towns.push({
                code: parseInt(index.slice(0, 9)),
                name: town[index].name.replace(/街道办事处/i, '')
              })
            }
          }
          console.log('---city-->', cities[j])
        }
      }
    }
  }
}

fs.writeFile('./json/towns.json', JSON.stringify(regions), 'utf8', function(err) {
  if (err) {
    return console.log(err)
  }
  console.log('The file was saved!')
})
