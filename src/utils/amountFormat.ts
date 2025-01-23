
const amountFormat = (amount: number | bigint, format: string = 'USD') => {


    const currencyFormat = format === 'USD' ? 'en-US' : 'fr-FR';
    const usFormatter = new Intl.NumberFormat(currencyFormat);
    const numberValue = Number(amount); // Convert bigint to number
    return usFormatter.format(parseFloat(numberValue.toFixed(2))) + " " + format;

}
export default amountFormat