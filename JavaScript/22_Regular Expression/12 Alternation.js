//  - Alternation ( | ) is the term in regular expression that is actually a simple “OR”.

/*
let regexp = /html|css|php|java(script)?/gi; // same as
let str = "First HTML appeared, then CSS, then JavaScript";
console.log(str.match(regexp)); // 'HTML', 'CSS', 'JavaScript'
*/

/*
// There are more carefull time matcher
//      - 25:99 also match pattern \d\d:\d\d. which is wrong

let regexp = /([01]\d|2[0-3]):([0-5]\d)/g;
let time = "00:00 10:10 23:59 25:99 1:2";
console.log(time.match(regexp)); // Return - [ '00:00', '10:10', '23:59' ]
*/

///     Experiments
/*
//      1) Find Languages

let regexp = /java(script)?|php|html|c(\+\+)?/gi;
let lang = "Java JavaScript PHP HTML C++ C";
console.log(lang.match(regexp)); // Return - [ 'Java', 'JavaScript', 'PHP', 'HTML', 'C++', 'C' ]
*/

/*
//      2) Find BB-tags pairs
//          - BB-tags can be nested. But a tag can’t be nested into itself

let regexp = /\[(b|quote|url)] .*?(\/\1)/gs; // `\1` means "(b|quote|url)".
let tags = `
  [b]hello![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;
console.log(tags.match(regexp)); // Return - [b]hello![/b], [quote][url]http://google.com[/url][/quote]
*/

/*
//      3) Find Quated Strings
let regexp = /"(\\.|[^"\\])*"/g;
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';
console.log(str.match(regexp)); // Return - [ '"test me"', '"Say \\"Hello\\"!"', '"\\\\ \\""' ]
*/

//      4) find Full tag
let regexp = /<style(>|\s.*?>)/g;

console.log('<style> <styler> <style test="...">'.match(regexp)); // Return - [ '<style>', '<style test="...">' ]
