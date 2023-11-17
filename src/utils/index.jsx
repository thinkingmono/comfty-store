import axios from 'axios'

//Axios custom instance with the API's baseURL to query.
export const authFetch = axios.create({
    baseURL: 'https://strapi-store-server.onrender.com/api'
});

//Format price function.
export const formatPrice = (price) => {
    const dollarsAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format((price / 100).toFixed(2));
    return dollarsAmount;
};

//Function to generate an array based in the number pass as a parameter. Use to generate selector options
export const generateAmountOptions = (number) => {
    return Array.from({ length: number }, (_, index) => {
        const amount = index + 1;

        return (
            <option key={amount} value={amount}>{amount}</option>
        )
    })
};