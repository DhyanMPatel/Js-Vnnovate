// function spinWords(string) {
//     return string.split(' ')
//         .map(word => word.length >= 5 ? word.split('').reverse().join('') : word)
//         .join(' ');
// }

function spinWords(string) {
    const words = string.split(" ").map((word) => {
        if (word.length >= 5) {
            return word.split('').reverse().join('');
        }
        return word;
    });

    return words.join(" ")
}

console.log(spinWords("Hey fellow warriors"));