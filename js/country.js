let country;

fetch('country.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => { country = data; })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });

export default function getCountryCode(countryName) {
    return "https://lipis.github.io/flag-icon-css/flags/4x3/" +
        country.find(o => o.name.match(RegExp(countryName, 'i'))).code.toLowerCase() + ".svg";
}