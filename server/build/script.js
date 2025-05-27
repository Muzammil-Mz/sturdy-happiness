async function shortenUrl() {
    const longUrl = document.getElementById("longUrl").value;

    if (!longUrl.trim()) {
        alert("Please enter a URL.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5010/api/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ longURL: longUrl }) // Make sure it's longURL not url
        });

        const data = await response.json();
        console.log("Response from backend:", data); // Debug line

        if (data.shortURL) {
            const shortUrl = `http://localhost:5010/api/get/${data.shortURL}`;
            document.getElementById("result").innerHTML = `
                Shortened URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a>
            `;
        } else {
            document.getElementById("result").innerText = "Error: Could not shorten the URL.";
        }

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("result").innerText = "Error occurred while shortening.";
    }
}
