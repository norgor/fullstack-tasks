import axios from "axios"
export { calculate };

function calculate(tokens) {
    return axios.post(`http://localhost:8080/api/calculator/calculate`, { tokens }).then(resonse => {
        return resonse.data;
    });
}