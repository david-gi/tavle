export type Board = {
    stages: Stage[],
}

export type Stage = {
    name: string,
    items: Item[],
}

export type Item = {
    name: string,
    desc: string,
    color: string,
    updated: number,
    created: number,
}
