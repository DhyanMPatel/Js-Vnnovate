// Debounce

//      - Debounce is a programming technique that prevent a function being called too frequently by waiting a set amount of time after the last event.
//      - It is Useful in Search input.

function Debouncer(func, delay){
    let timeout;

    return function (){
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
            console.log("Debounce Function Executed");
        }, delay);
    }
}

// Search function
const searchFunction = Debouncer((text) => {
    console.log(`Searching for ${text}`);
}, 500);

window.addEventListener("input", (event) => searchFunction(event.target.value))