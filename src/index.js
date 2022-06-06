import './css/styles.css';
import countryListPattern from './templates/country-list.hbs';
import countryInfoPattern from './templates/country-info.hbs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  countryCard: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
  countryInput: document.querySelector('#search-box'),
};

refs.countryInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const onSearchInput = e.target.value.trim();
  if (onSearchInput === '') {
    refs.countryList.innerHTML = '';
    refs.countryCard.innerHTML = '';
    return;
  } else {
    fetchCountries(onSearchInput).then(renderCountries).catch(onFetchError);
  }
}

function renderCountries(countries) {
  if (countries.length > 10) {
    refs.countryList.innerHTML = '';
    refs.countryCard.innerHTML = '';
    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name!');
  }
  if (countries.length > 1) {
    const markup = countryListPattern(countries);
    refs.countryList.innerHTML = markup;
    refs.countryCard.innerHTML = '';
    console.log(countries);
    console.log(markup);
  }
  if (countries.length === 1) {
    const markupInfo = countryInfoPattern(countries[0]);
    refs.countryList.innerHTML = '';
    refs.countryCard.innerHTML = markupInfo;
    console.log(countries);
  }
}

function onFetchError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
