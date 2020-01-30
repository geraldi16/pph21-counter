const getPTKP = require('./ptkp')

/**
 * Get annual income.
 * 
 * @param {number} monthlyIncome - user monthly income
 */
function getAnnualBrutoIncome(monthlyIncome){
    return monthlyIncome * 12
}

/**
 * Get amount of income that going to be taxed.
 * 
 * @param {string} type - user tax relief type
 * @param {number} income - user annual income
 */
function getTaxableIncome(type, income){
    const ptkp = getPTKP(type)
    const taxableIncome = income - ptkp

    return taxableIncome < 0 ? 0 : taxableIncome
}

/**
 * Count tax for annual income up to 50M.
 * 
 * @description
 * Count only work only for first 50M of their annual income.
 * 
 * @param {string} taxableIncome - user taxable income
 */
function countTaxUpTo50Million(taxableIncome) {
    // income tobe counted here. Max cap is 50M
    const incomeTaxed = taxableIncome > 50000000 ? 50000000 : taxableIncome

    return incomeTaxed * 0.05
}

/**
 * Count tax for annual income between 50M - 250M.
 * 
 * @param {string} taxableIncome - user taxable income
 */
function countTaxUpTo250Million(taxableIncome) {
    // income minus 50M
    const incomeProcessed = taxableIncome - 50000000 < 0 ? 0 : taxableIncome - 50000000
    // income tobe counted here. Max cap is 200M
    const incomeTaxed = incomeProcessed > 200000000 ? 200000000 : incomeProcessed

    return incomeTaxed * 0.15
}

/**
 * Count tax for annual income between 250M - 500M.
 * 
 * @param {string} taxableIncome - user taxable income
 */
function countTaxUpTo500Million(taxableIncome) {
    // income minus 50M
    const incomeProcessed = taxableIncome - 250000000 < 0 ? 0 : taxableIncome - 250000000
    // income tobe counted here. Max cap is 250M
    const incomeTaxed = incomeProcessed > 250000000 ? 250000000 : incomeProcessed

    return incomeTaxed * 0.25
}

/**
 * Count tax for annual income over 500M.
 * 
 * @description
 * Count only work only for leftovers income above 500M.
 * For example, if user income is 600M, then value counted by the function
 * is only 100M, since other 500M is already processed in other function.
 * 
 * @param {string} taxableIncome - user taxable income
 */
function countTaxOver500Million(taxableIncome) {
    // income minus 500M
    const incomeTaxed = taxableIncome - 500000000 < 0 ? 0 : taxableIncome - 500000000

    return incomeTaxed * 0.3
}

/**
 * Count annual tax.
 * 
 * @description
 * Formula: (5% * a) + (15% * b) + (25% * c) + (30% * d)
 * where:
 *  a: rest of your income between 0 - 50M
 *  b: rest of your income between 50M - 250M
 *  c: rest of your income between 250M - 500M
 *  d: rest of your income over 500M
 * 
 * Example: income 600M, so tax is:
 *  (5% * 50M) + (15% * 200M) + (25% * 250M) + (30% * 100M) = 125M
 * 
 * @param {string} type - user tax relief type
 * @param {number} income - user annual income
 */
function countYourAnnualIncomeTax(type, income){
    let tax = 0

    // define steps for tax counting contain functions
    const countSteps = [
        countTaxUpTo50Million,
        countTaxUpTo250Million,
        countTaxUpTo500Million,
        countTaxOver500Million
    ]

    const annualIncome = getAnnualBrutoIncome(income)
    const taxableIncome = getTaxableIncome(type, annualIncome)

    for( let i=0; i<countSteps.length; i++ ) {
        tax += countSteps[i](taxableIncome)
    }

    return tax
}

/**
 * Get monthly tax.
 * @param {string} type - user tax relief type
 * @param {number} income - user annual income
 */
function countYourMonthlyIncomeTax(type, income){
    const annualIncome = countYourAnnualIncomeTax(type, income)

    return annualIncome / 12
}

// export the functions
module.exports = {
    countYourAnnualIncomeTax,
    countYourMonthlyIncomeTax
}