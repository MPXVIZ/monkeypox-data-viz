const a = {
    a: 1,
    b: 2,
    c: 'london',
};

const b = {
    a: 1,
    b: 2,
    d: 'london',
};

const arr = [
    a, b
]
for (let i of arr) {
    console.log(i)
}
console.log(JSON.stringify(a) === JSON.stringify(b));
