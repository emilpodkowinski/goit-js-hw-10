import './css/styles.css';
import {fetchCountries} from './fetchCountries';
import { Notify } from 'notiflix';


const DEBOUNCE_DELAY = 300;

const countryListEl = document.querySelector(".country-list");
const searchEl = document.getElementById("search-box");
const  countryInfo = document.querySelector(".country-info");

searchEl.addEventListener(
    "input",
     _.debounce(async (ev) => {
        const countryName = ev.target.value.trim();

if (countryName === ""){
    countryListEl.innerHTML = "";
    countryInfo.innerHTML = "";

    return;
}

       const countries = await fetchCountries(countryName);

       if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length > 1 && countries.length <= 10) {
        countryListEl.innerHTML = countries
          .map(
            country =>
              `<li><img src="${country.flags.png}"/>
              ${country.name.common}</li>`
          )
          .join('');
      } else if (countries.length === 1) {
        countryListEl.innerHTML = countries
          .map(
            country =>
              `<li><img src="${country.flags.png}"/>
              ${country.name.common}</li>`
          )
          .join('');
        countryInfo.innerHTML = `<p>Capital: ${countries[0].capital}</p>
          <p>Population: ${countries[0].population}</p>
          <p>Languages: ${Object.values(countries[0].languages).join(', ')}</p>`;
      } else {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    }, DEBOUNCE_DELAY)
  );

