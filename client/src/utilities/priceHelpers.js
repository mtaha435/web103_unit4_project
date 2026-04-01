// Define the base price of the car
export const BASE_PRICE = 25000;

// Define the price for each specific option
export const OPTION_PRICES = {
    exterior: {
        "Silver": 0,
        "Midnight Blue": 500,
        "Matte Black": 1200,
        "Convertible": 3500
    },
    wheels: {
        "Standard": 0,
        "Sport": 800,
        "Luxury": 1500,
        "Off-Road": 1200
    },
    interior: {
        "Fabric": 0,
        "Leather": 1500,
        "Alcantara": 2500
    },
    roof: {
        "Standard": 0,
        "Sunroof": 1000,
        "Panoramic": 2500,
        "Roof Rack": 600
    }
};

/**
 * Calculates the total price based on selected options
 * @param {Object} selectedOptions - e.g. { exterior: 'Red', wheels: 'Sport', ... }
 * @returns {number}
 */
export const calculateTotalPrice = (selectedOptions) => {
    let total = BASE_PRICE;

    for (const category in selectedOptions) {
        const choice = selectedOptions[category];
        if (OPTION_PRICES[category] && OPTION_PRICES[category][choice]) {
            total += OPTION_PRICES[category][choice];
        }
    }

    return total;
};