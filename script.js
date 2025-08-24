document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "3173f96cc2c159966cd221b2123c5bd6"; // replace with real OpenWeatherMap API key

    const resultDiv = document.getElementById("weatherResult");
    const btn = document.getElementById("getWeatherBtn");

    console.log("Result div is:", resultDiv); // Debugging

    btn.addEventListener("click", async () => {
        const city = document.getElementById("cityInput").value.trim();
        if (!city) {
            resultDiv.innerHTML = "<p>⚠️ Please enter a city</p>";
            return;
        }

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            const data = await response.json();
            console.log("API response:", data);

            if (data.cod === "404") {
                resultDiv.innerHTML = `<p>❌ City not found</p>`;
                return;
            }
            const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
resultDiv.innerHTML = `
    <h3>${data.name}, ${data.sys.country}</h3>
    <img src="${iconUrl}" alt="weather icon">
    <p>🌡 Temp: ${data.main.temp}°C</p>
    <p>☁ Weather: ${data.weather[0].description}</p>
    <p>💨 Wind: ${data.wind.speed} m/s</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
`;

            // resultDiv.innerHTML = `
            //     <h3>${data.name}, ${data.sys.country}</h3>
            //     <p>🌡 Temp: ${data.main.temp}°C</p>
            //     <p>☁ Weather: ${data.weather[0].description}</p>
            //     <p>💨 Wind: ${data.wind.speed} m/s</p>
            //     <p>💧 Humidity: ${data.main.humidity}%</p>
            // `;
        } catch (error) {
            resultDiv.innerHTML = `<p>❌ Error fetching data</p>`;
        }
    });
});
