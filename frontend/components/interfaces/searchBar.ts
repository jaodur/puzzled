interface InputPropsInterface {
    placeholder: string;
    value: any;
    onChange: any;
}

type suggestionFilterFuncInterface<T> = (inputValue: any, possibleSuggestions: T[]) => T[];

interface SearchBarInterface<T> {
    placeholder: string;
    possibleSuggestions: any[];
    getSuggestionValue: (value: any) => any;
    suggestionFilterFunc: suggestionFilterFuncInterface<T>;
    onSuggestionsFetchRequested?: any;
    onSuggestionsClearRequested?: any;
    renderSuggestion: any;
}

export { InputPropsInterface, SearchBarInterface };
