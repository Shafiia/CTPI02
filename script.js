async function fetchData() {
    const url = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/info';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b5c730f3b2msh03fdc45fb3c0f4ap1fc32fjsnfb542f9feae8',
            'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const record = await response.json(); // Parse response as JSON and assign to record
        console.log(record); // Check the structure of the response
        document.getElementById("concerts").innerHTML = record.classes.map(item => `<li>${item}</li>`).join(""); // Display classes
    } catch (error) {
        console.error(error);
    }
}

fetchData();
