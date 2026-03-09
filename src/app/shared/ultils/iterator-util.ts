export function range(size: number = 20, startNumber: number = 0) {
    let iterable = [];

    for (let i = startNumber; i < size; i++) {
        iterable.push(i);
    }

    return iterable;
}
