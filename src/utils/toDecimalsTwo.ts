export function toDecimalsTwo(num: number) {
    if (num % 1 !== 0) {
        return num.toFixed(4); //modificato da base 2 a base 4
    } else {
        return num.toString();
    }
}
