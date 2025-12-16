export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const addThousandsSeparstor = (num) =>{
    if(num == null || isNaN(num)) return "";

    const [integerpart, fractionalpart] = num.toString().split(".");
    const formattedInteger = integerpart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalpart ? `${formattedInteger}.${fractionalpart}` : formattedInteger;
}