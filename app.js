document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const searchInput = document.querySelector("#search");
  const regionSelect = document.querySelector("#select");
  const buttonLight = document.querySelector(".btn1");
  const buttonDark = document.querySelector(".btn2");
  const body = document.body;
  const nav = document.querySelector("nav");
  const title = document.querySelector(".navbars-title");

  let allCountries = [];

  async function fetchCountries() {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) throw new Error("Failed to fetch data");
      allCountries = await response.json();
      displayCountries(allCountries);
    } catch (error) {
      console.error(error);
    }
  }

  function displayCountries(countries) {
    container.innerHTML = "";
    countries.forEach((country) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const img = document.createElement("img");
      img.src = country.flags.png;
      img.alt = `${country.name.common} flag`;
      img.classList.add("flag");

      const name = document.createElement("h2");
      name.textContent = country.name.common;

      const population = document.createElement("p");
      population.textContent = `Population: ${country.population}`;

      const region = document.createElement("p");
      region.textContent = `Region: ${country.region}`;

      const capital = document.createElement("p");
      capital.textContent = `Capital: ${
        country.capital ? country.capital[0] : "N/A"
      }`;

      card.append(img, name, population, region, capital);
      container.appendChild(card);
    });
  }

  regionSelect.addEventListener("change", (e) => {
    const region = e.target.value;
    const filteredCountries =
      region === "all"
        ? allCountries
        : allCountries.filter(
            (country) => country.region.toLowerCase() === region.toLowerCase()
          );
    displayCountries(filteredCountries);
  });

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const searchedCountries = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm)
    );
    displayCountries(searchedCountries);
  });

  buttonLight.addEventListener("click", () => {
    body.style.backgroundColor = "white";
    body.style.color = "black";
    nav.style.backgroundColor = "white";
    nav.style.borderBottom = "1px solid black";
    buttonLight.style.display = "none";
    buttonDark.style.display = "block";
    title.style.color = "black";
    buttonDark.style.color = "black";
  });

  buttonDark.addEventListener("click", () => {
    body.style.backgroundColor = "#202d36";
    body.style.color = "white";
    nav.style.backgroundColor = "#2b3743";
    nav.style.borderBottom = "none";
    buttonDark.style.display = "none";
    buttonLight.style.display = "block";
    title.style.color = "white";
  });

  fetchCountries();
});
