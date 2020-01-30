const getPTKP = require('../src/ptkp')

describe('ptkp', () => {
    it('should return 54M IDR', () => {
        const ptkp = getPTKP('tk0')

        expect(ptkp).toBe(54000000)
    })

    it('should return 0 because ptkp type is not define', () => {
        try {
            const ptkp = getPTKP('tki')
        } catch (error) {
            expect(error.message).toBe('Tax relief category not found!')
        }
       
    })
})