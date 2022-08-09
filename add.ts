export function add(a: number, b: number): number {
    return a + b;
}

export const cloneArray = <T>(array: Array<T>): Array<T> => {
    return [...array];
};

export class Stack {
    head: Node | null;
    tail: Node | null;
    length: number;
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }
    push(val: number): void {}
    pop() {}
    peek() {}
}

export class Node {
    val: number | null;
    next: Node | null;
    constructor() {
        this.val = null;
        this.next = null;
    }
}
