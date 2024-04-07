export interface Result {
    content: ResultItem[];
}

export interface ResultItem {
    id: number;
    name: string;
    score: number;
}
