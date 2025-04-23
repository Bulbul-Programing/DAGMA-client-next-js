export type TFilter = {
    searchTerm?: string;
    sort?: string;
    maxValue?: string;
    minValue?: string;
    category?: string;
    page?: number;
    limit?: number;
    fields?: string;
    debounceValue?: { searchTerm?: string };
};