const taxCounter = require('./src/counter')

const taxReliefType = 'tk0'
const monthlyIncome = 4500000

console.log('---------------------------------------------')
console.log('---------- PPH21 Counter Program ------------')
console.log('---------------------------------------------')
console.log('Monthly Income: IDR', monthlyIncome.toLocaleString('id'))
console.log('Person status: ', taxReliefType.toLocaleString('id'))
console.log('---------------------------------------------')

try {
    const annualTax = taxCounter.countYourAnnualIncomeTax(taxReliefType, monthlyIncome)
    const monthlyTax = taxCounter.countYourMonthlyIncomeTax(taxReliefType, monthlyIncome)

    console.log('Person\'s annual tax: IDR', annualTax.toLocaleString('id'))
    console.log('Person\'s monthly tax: IDR', monthlyTax.toLocaleString('id'))
} catch (error) {
    console.log(error.message)
}
