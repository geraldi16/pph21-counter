const taxCounter = require('../src/counter')

describe('tax count', () => {
    it('should have no tax for annual income below 45M for single status user', () => {
        const monthlyIncome = 3000000
        const taxReliefType = 'tk0'

        const annualTax = taxCounter.countYourAnnualIncomeTax(taxReliefType, monthlyIncome)

        expect(annualTax).toBe(0)
    })

    it('should have no tax for annual income below 45M for married person', () => {
        const monthlyIncome = 3000000
        const taxReliefType = 'k0'

        const annualTax = taxCounter.countYourAnnualIncomeTax(taxReliefType, monthlyIncome)

        expect(annualTax).toBe(0)
    })

    it('should get tax 750K IDR for married person with 1 child income 6.5M', () => {
        const monthlyIncome = 6500000
        const taxReliefType = 'k1'

        const annualTax = taxCounter.countYourAnnualIncomeTax(taxReliefType, monthlyIncome)

        expect(annualTax).toBe(750000)
    })

    it('should get tax 1.2M IDR for single person income 6.5M', () => {
        const monthlyIncome = 6500000
        const taxReliefType = 'tk0'

        const annualTax = taxCounter.countYourAnnualIncomeTax(taxReliefType, monthlyIncome)

        expect(annualTax).toBe(1200000)
    })

    it('should get tax 31.9M IDR for single person income 25M', () => {
        const monthlyIncome = 25000000
        const taxReliefType = 'tk0'

        const annualTax = taxCounter.countYourAnnualIncomeTax(taxReliefType, monthlyIncome)

        expect(annualTax).toBe(31900000)
    })

    it('should get monthly tax 62.5K IDR for married person with 1 child income 6.5M', () => {
        const monthlyIncome = 6500000
        const taxReliefType = 'k1'

        const annualTax = taxCounter.countYourMonthlyIncomeTax(taxReliefType, monthlyIncome)

        expect(annualTax).toBe(62500)
    })

    it('should get monthly tax 108.8M IDR for single person income 50M', () => {
        const monthlyIncome = 50000000
        const taxReliefType = 'tk0'

        const annualTax = taxCounter.countYourAnnualIncomeTax(taxReliefType, monthlyIncome)

        expect(annualTax).toBe(108800000)
    })

    it('should get monthly tax 103.4M IDR for married person with 3 childer income 50M', () => {
        const monthlyIncome = 50000000
        const taxReliefType = 'k3'

        const annualTax = taxCounter.countYourAnnualIncomeTax(taxReliefType, monthlyIncome)

        expect(annualTax).toBe(103400000)
    })


})