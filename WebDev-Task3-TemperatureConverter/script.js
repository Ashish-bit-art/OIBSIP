
const form = document.getElementById("converterForm");

const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");

const errorMessage = document.getElementById("errorMessage");
const results = document.getElementById("results");

const resetBtn = document.getElementById("resetBtn");
const themeToggle = document.getElementById("themeToggle");

// Validate temperature
function validateTemperature(showEmptyError = false) {

    const rawValue = temperatureInput.value.trim();
    const value = Number(rawValue);
    const unit = unitSelect.value;

    errorMessage.textContent = "";
    temperatureInput.classList.remove("invalid");

    if (rawValue === "") {
        if (showEmptyError) {
            showError("Please enter a temperature value.");
        }
        return false;
    }

    if (!Number.isFinite(value)) {
        showError("Please enter a valid numeric temperature.");
        return false;
    }

    // Absolute zero validation
    let minimum;

    if (unit === "celsius") {
        minimum = -273.15;
    } else if (unit === "fahrenheit") {
        minimum = -459.67;
    } else {
        minimum = 0;
    }

    if (value < minimum) {
        showError(
            `Temperature cannot be below absolute zero (${minimum} ${getSymbol(unit)}).`
        );
        return false;
    }

    return true;
}

// Display errors
function showError(message) {
    errorMessage.textContent = message;
    temperatureInput.classList.add("invalid");
}

// Unit symbols
function getSymbol(unit) {
    const symbols = {
        celsius: "°C",
        fahrenheit: "°F",
        kelvin: "K"
    };

    return symbols[unit];
}

// Convert temperature into Celsius
function toCelsius(value, unit) {

    switch (unit) {
        case "celsius":
            return value;

        case "fahrenheit":
            return (value - 32) * 5 / 9;

        case "kelvin":
            return value - 273.15;

        default:
            return NaN;
    }
}

// Format output
function formatValue(value) {
    const rounded = Number(value.toFixed(2));
    return Object.is(rounded, -0) ? "0.00" : rounded.toFixed(2);
}

// Convert and display results
function convertTemperature(event) {

    event.preventDefault();

    if (!validateTemperature(true)) {
        results.hidden = true;
        return;
    }

    const value = Number(temperatureInput.value);
    const unit = unitSelect.value;

    const celsius = toCelsius(value, unit);
    const fahrenheit = (celsius * 9 / 5) + 32;
    const kelvin = celsius + 273.15;

    document.getElementById("celsiusResult").textContent =
        formatValue(celsius);

    document.getElementById("fahrenheitResult").textContent =
        formatValue(fahrenheit);

    document.getElementById("kelvinResult").textContent =
        formatValue(kelvin);

    results.hidden = false;
}

// Form submit
form.addEventListener("submit", convertTemperature);

// Real-time validation
temperatureInput.addEventListener("input", () => {
    results.hidden = true;
    validateTemperature();
});

unitSelect.addEventListener("change", () => {
    results.hidden = true;
    validateTemperature();
});

// Reset functionality
resetBtn.addEventListener("click", () => {

    form.reset();

    errorMessage.textContent = "";
    temperatureInput.classList.remove("invalid");

    results.hidden = true;
});

// Dark and light theme
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
    );
});
