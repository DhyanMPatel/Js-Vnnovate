// Throttle 

//          - throttle is a technique where a function is called at most once per X milliseconds, regardless of how many times the event is triggered.
//          - It is Useful in Scroll event, Window resize.

function throttle(func, delay) {
    let lastCall = 0;
    return function(...args){
        const now = Date.now();
        if(now-lastCall >= delay){
            lastCall = now;
            func.apply(this, args)
        }
    }
}

const throttledFunction = throttle(() => {
    console.log(`Scroll Event.`);
}, 1000);

// window.addEventListener('scroll', throttledFunction);