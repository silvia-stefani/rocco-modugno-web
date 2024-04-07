export function orderByAlphabet<T>(arr: T[], property: keyof T, ascending: boolean = true): T[] {
    const sortedArr = [...arr];
    sortedArr.sort((a, b) => {
        const nameA = String(a[property]).toLowerCase();
        const nameB = String(b[property]).toLowerCase();
        if (ascending) {
        return nameA.localeCompare(nameB);
        } else {
        return nameB.localeCompare(nameA);
        }
    });
    return sortedArr;
}
