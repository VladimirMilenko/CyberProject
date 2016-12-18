/**
 * Created by netre on 15.12.2016.
 */
export function swapRows(rows, fromIndex, toIndex, count = 1) {
    const rowsWithoutMoved = [
        ...rows.slice(0, fromIndex),
        ...rows.slice(fromIndex + count),
    ];

    return [
        ...rowsWithoutMoved.slice(0, toIndex),
        ...rows.slice(fromIndex, fromIndex + count),
        ...rowsWithoutMoved.slice(toIndex),
    ];
}