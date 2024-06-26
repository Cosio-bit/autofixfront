import axios from "axios";

const autofixServer = import.meta.env.VITE_AUTOFIX_SERVER;
const autofixPort = import.meta.env.VITE_AUTOFIX_PORT;

console.log(autofixServer)
console.log(autofixPort)

export default axios.create({
    baseURL: `http://${autofixServer}:${autofixPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});