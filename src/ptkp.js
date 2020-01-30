const PTKP_LEVEL = {
    tk0: 54000000,
    k0: 58500000,
    k1: 63000000,
    k2: 67500000,
    k3: 72000000

}

/**
 * Get ptkp amount value.
 * @param {string} type - ptkp type
 */
function getPTKP(type='tk0') {
    // throw error if wrong type
    if (!PTKP_LEVEL[type]){
        throw new Error('Tax relief category not found!')
    }

    return PTKP_LEVEL[type]
}

module.exports = getPTKP