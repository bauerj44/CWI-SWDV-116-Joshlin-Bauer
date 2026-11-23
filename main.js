const cars = [
    {
        type: "economy",
        name: "Toyota Corolla",
        description: "Affordable and fuel efficient.",
        year: 2024
    },
    {
        type: "economy",
        name: "Honda Civic",
        description: "Comfortable and easy to drive.",
        year: 2023
    },
    {
        type: "sedan",
        name: "Toyota Camry",
        description: "Spacious sedan with a smooth ride.",
        year: 2024
    },
    {
        type: "sedan",
        name: "Honda Accord",
        description: "Roomy and comfortable for longer trips.",
        year: 2023
    },
    {
        type: "suv",
        name: "Toyota RAV4",
        description: "Versatile SUV with plenty of cargo space.",
        year: 2024
    },
    {
        type: "suv",
        name: "Honda CR-V",
        description: "Comfortable SUV for families and travel.",
        year: 2023
    },
    {
        type: "suv",
        name: "Ford Explorer",
        description: "Large SUV with seating and storage space.",
        year: 2024
    },
    {
        type: "luxury",
        name: "BMW 5 Series",
        description: "Premium sedan with luxury features.",
        year: 2024
    },
    {
        type: "luxury",
        name: "Mercedes-Benz E-Class",
        description: "Elegant luxury car with a refined ride.",
        year: 2023
    },
    {
        type: "luxury",
        name: "Audi A6",
        description: "Modern luxury sedan with premium comfort.",
        year: 2024
    }
];

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

if (searchForm) {
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
}

function displayCars(carList) {
    const carContainer = document.getElementById("car-list");

    carContainer.innerHTML = "";

    carList.forEach(function(car, index) {
        const carCard = document.createElement("div");
        carCard.className = "car-card";

        const carImage = document.createElement("img");

        // You currently have car_1.jpg through car_7.jpg
        // This lets the last 3 cars reuse the existing images.
        const imageNumber = (index % 7) + 1;
        carImage.src = "car_" + imageNumber + ".jpg";
        carImage.alt = car.name;

        const carName = document.createElement("h3");
        carName.textContent = car.name;

        const carYear = document.createElement("p");
        carYear.textContent = "Year: " + car.year;

        const carType = document.createElement("p");
        carType.textContent = "Type: " + car.type;

        const carDescription = document.createElement("p");
        carDescription.textContent = car.description;

        carCard.appendChild(carImage);
        carCard.appendChild(carName);
        carCard.appendChild(carYear);
        carCard.appendChild(carType);
        carCard.appendChild(carDescription);

        const rentButton = document.createElement("button");
        rentButton.textContent = "Rent This Car";
        rentButton.type = "button";

        rentButton.addEventListener("click", function() {
        const params = new URLSearchParams(window.location.search);

        const rentalEvent = new CustomEvent("confirm-rental", {
            detail: {
                carType: car.type,
                startDate: params.get("pickup"),
                returnDate: params.get("return")
            }
        });

        document.dispatchEvent(rentalEvent);
    });

        carCard.appendChild(rentButton);

        carContainer.appendChild(carCard);
    });
}

function listCars() {
    const params = new URLSearchParams(window.location.search);

    if (params.has("type")) {
        const type = params.get("type");

        const filteredCars = cars.filter(function(car) {
            return car.type === type;
        });

        displayCars(filteredCars);
    } else {
        displayCars(cars);
    }
}