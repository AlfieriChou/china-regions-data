const regions = require('./towns.json')
const _ = require('lodash')
const fs = require('fs')

const coreTowns = [
  {
    code: 1,
    name: '核心城市',
    cores: []
  },
  {
    code: 2,
    name: '重点城市',
    cores: []
  },
  {
    code: 3,
    name: '其他城市',
    cores: []
  }
]

for (let i = 0; i < coreTowns.length; ++i) {
  if (coreTowns[i].name === '核心城市') {
    for (let j = 0; j < regions.length; ++j) {
      if (regions[j].name === '北京市' || regions[j].name === '上海市') {
        coreTowns[i].cores.push(regions[j])
        _.remove(regions, element => {
          return element.name === regions[j].name
        })
      }
    }
  }
  if (coreTowns[i].name === '重点城市') {
    for (let j = 0; j < regions.length; ++j) {
      if (regions[j].name === '天津市' || regions[j].name === '重庆市') {
        coreTowns[i].cores.push(regions[j])
        _.remove(regions, element => {
          return element.name === regions[j].name
        })
      }
      let cities = regions[j].cities
      if (cities) {
        for (let k = 0; k < cities.length; ++k) {
          if (
            cities[k].name === '沈阳市' ||
            cities[k].name === '大连市' ||
            cities[k].name === '哈尔滨市' ||
            cities[k].name === '南京市' ||
            cities[k].name === '苏州市' ||
            cities[k].name === '杭州市' ||
            cities[k].name === '宁波市' ||
            cities[k].name === '福州市' ||
            cities[k].name === '厦门市' ||
            cities[k].name === '济南市' ||
            cities[k].name === '青岛市' ||
            cities[k].name === '郑州市' ||
            cities[k].name === '武汉市' ||
            cities[k].name === '长沙市' ||
            cities[k].name === '广州市' ||
            cities[k].name === '深圳市' ||
            cities[k].name === '成都市' ||
            cities[k].name === '西安市'
          ) {
            coreTowns[i].cores.push(cities[k])
            _.remove(cities, element => {
              return element.name === cities[k].name
            })
          }
        }
      }
    }
  }
  if (coreTowns[i].name === '其他城市') {
    coreTowns[i].cores = regions
  }
}

fs.writeFile('./coreCity.json', JSON.stringify(coreTowns), 'utf8', function(
  err
) {
  if (err) {
    return console.log(err)
  }
  console.log('The file was saved!')
})
