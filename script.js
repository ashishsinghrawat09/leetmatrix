document.addEventListener("DOMContentLoaded", () => {

    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");

    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");

    const statsCards = document.getElementById("stats-cards");


    async function fetchUser(username) {

        try {

            searchButton.textContent = "Loading...";
            searchButton.disabled = true;

            const url = `https://leetcode-api-faisalshohag.vercel.app/${username}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("User not found");
            }

            const data = await response.json();

            showData(data);

        } catch (err) {

            statsCards.innerHTML = `<p>User not found or API error</p>`;
            console.error(err);

        } finally {

            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }


    function showData(data) {

        easyLabel.textContent = `${data.easySolved}/${data.totalEasy}`;
        mediumLabel.textContent = `${data.mediumSolved}/${data.totalMedium}`;
        hardLabel.textContent = `${data.hardSolved}/${data.totalHard}`;

        statsCards.innerHTML = `
            <div class="card">
                <h4>Total Solved</h4>
                <p>${data.totalSolved}</p>
            </div>

            <div class="card">
                <h4>Ranking</h4>
                <p>${data.ranking}</p>
            </div>

            <div class="card">
                <h4>Acceptance</h4>
                <p>${data.acceptanceRate}%</p>
            </div>
        `;
    }


    searchButton.addEventListener("click", () => {

        const username = usernameInput.value.trim();

        if (username === "") {
            alert("Enter username");
            return;
        }

        fetchUser(username);
    });

});