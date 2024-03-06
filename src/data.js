export const API_KEY = "AIzaSyAkzG_6QRNvZ3yUWv3hJSuwCQNFl4hvgZU";
///IF YOU GOT HERE use your own API_KEY FROM YOUTUBE API //THIS APIKEY IS EXPIREED AND IS JUST FOR PLACEHOLDER
const oneMillion = 1000000;
export const value_converter = (value) => {
    if (value >= oneMillion) {
        return Math.floor(value / oneMillion) + "M";
    }
    else if (value >= 1000) {
        return Math.floor(value / 1000) + "K"
    }
    else {
        return value;
    }
}


