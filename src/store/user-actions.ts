// import { Dispatch } from "redux";
// import { countryActions } from "./country-slice";
// import { uiActions } from "./ui-slice";

// export const fetchCountriesData : any = () => {

//     return async(dispatch : Dispatch) => {

//         dispatch(uiActions.showLoadingText('Fetching Blogs'));
//         // await new Promise((resolve)=> setTimeout(resolve, 5000));

//         const fetchCountries = async() => {
//             const response = await fetch('https://restcountries.com/v3.1/all');

//             if(!response.ok){
//                 throw new Error('Could not fetch countries data!');
//             }

//             const data = await response.json();
//             return data;
//         };

//         const countriesData = await fetchCountries();

//         dispatch(countryActions.replaceCountries({
//             countries: countriesData || [],
//         }))

//         dispatch(uiActions.showLoadingText(''));
//     }

// }