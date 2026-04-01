/**
 * Checks if the current combination of features is valid.
 * @param {Object} car - The car object containing all selections
 * @returns {Object} - { isValid: boolean, message: string }
 */
export const validateCarCombination = (car) => {
    // Requirement: Check for impossible combinations
    
    // Example 1: Convertible + Roof Rack
    if (car.exterior === 'Convertible' && car.roof === 'Roof Rack') {
        return {
            isValid: false,
            message: "⚠️ Design Error: You cannot add a Roof Rack to a Convertible exterior."
        };
    }

    // Example 2: Luxury Wheels + Off-Road Tires (if you had a tires category)
    if (car.wheels === 'Luxury' && car.exterior === 'Off-Road Body') {
        return {
            isValid: false,
            message: "⚠️ Design Error: Luxury wheels are not compatible with Off-Road body kits."
        };
    }

    // If everything looks good
    return { isValid: true, message: "" };
};