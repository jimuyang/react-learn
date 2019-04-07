class Hello {
    constructor(name) {
        this.name = name;
        this.getName = this.getName.bind(this);
    }

    getName() {
        return this.name;
    }
}

var h = new Hello('xiaoming');

console.log(h.getName());
var func = h.getName;
console.log(func());

console.log(func.call(undefined));

console.log(h);

