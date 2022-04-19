import axios from "axios";

const adviceGenerator = async(reqURL) => {
    let advice = [];
    try {
        const response = await fetch(reqURL);
        const data = await response.json();
        // console.log(data.slip.advice);
        advice.push(data.slip.advice);
        return advice[0];
    }catch(error){
        console.log(error.message);
    }
}
// console.log(adviceGenerator("https://api.adviceslip.com/advice"))
export default adviceGenerator;
console.log(adviceGenerator("https://api.adviceslip.com/advice"));    
