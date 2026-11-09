function validateSearch() {
    const errors = [];

    const type = document.querySelector('[name="type"]').value;
    const pickup = document.querySelector('[name="pickup"]').value;
    const returnDate = document.querySelector('[name="return"]').value;

    // Make sure all fields have values
    if (type === "") {
        errors.push("Please select a car type.");
    }

    if (pickup === "") {
        errors.push("Please select a pickup date.");
    }

    if (returnDate === "") {
        errors.push("Please select a return date.");
    }

    // Only check dates if they were entered
    if (pickup !== "") {
        const pickupDate = new Date(pickup + "T00:00:00");

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (pickupDate <= today) {
            errors.push("Pickup date must be in the future.");
        }
    }

    if (pickup !== "" && returnDate !== "") {
        const pickupDate = new Date(pickup + "T00:00:00");
        const returnDateValue = new Date(returnDate + "T00:00:00");

        if (returnDateValue <= pickupDate) {
            errors.push("Return date must be after the pickup date.");
        }
    }

    return errors;
}

const searchForm = document.querySelector('.rental-search form');
const searchButton = searchForm.querySelector('input[type="submit"]');

searchButton.addEventListener("click", function(event) {
    // Remove old errors before validating again
    const oldErrors = searchForm.querySelector(".error-list");

    if (oldErrors) {
        oldErrors.remove();
    }

    const errors = validateSearch();

    if (errors.length > 0) {
        event.preventDefault();

        const errorList = document.createElement("ul");
        errorList.className = "error-list";

        errors.forEach(function(error) {
            const listItem = document.createElement("li");
            listItem.textContent = error;
            errorList.appendChild(listItem);
        });

        searchForm.appendChild(errorList);
    }
});