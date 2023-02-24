export function or<T extends any[]>(...guards: { [K in keyof T]: (x: unknown) => x is T[K] }): (x: unknown) => x is T[number] {
    return (x: unknown): x is T[number] => {
        return guards.some((guard) => guard(x))
    }
}

export function and<T extends any[]>(...guards: { [K in keyof T]: (x: unknown) => x is T[K] }): (x: unknown) => x is UnionToIntersection<T[number]> {
    return (x: unknown): x is UnionToIntersection<T[number]> => {
        return guards.every((guard) => guard(x));
    };
}