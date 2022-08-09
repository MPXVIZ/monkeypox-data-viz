export function add(a: number, b: number): number {
    return a + b;
}

export const cloneArray = <T>(array: Array<T>): Array<T> => {
    return [...array];
};

export class FireshipStack {
    top: number;
    items: Record<string, string>;

    constructor() {
        this.top = -1;
        this.items = {};
    }
    push(val: string): void {
        if (this.top == -1) {
            this.top = 0;
        }
        this.top += 1;
        this.items[this.top] = val;
    }
    peek(): string {
        return this.items[this.top];
    }
    pop(): String {
        const item = new String(this.items[this.top]);
        if (this.top == 0) {
            this.top = -1;
        }
        delete this.items[this.top];
        this.top -= 1;
        return item;
    }
}

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
