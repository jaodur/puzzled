interface InputPropsInterface {
    placeholder: string;
    value: any;
    onChange: any;
}

type suggestionFilterFuncInterface<T> = (inputValue: any, possibleSuggestions: T[]) => T[];

interface ThemeInterface {
    container?: string;
    containerOpen?: string;
    input?: string;
    inputOpen?: string;
    inputFocused?: string;
    suggestionsContainer?: string;
    suggestionsContainerOpen?: string;
    suggestionsList?: string;
    suggestion?: string;
    suggestionFirst?: string;
    suggestionHighlighted?: string;
    sectionContainer?: string;
    sectionContainerFirst?: string;
    sectionTitle?: string;
    [key: string]: string;
}

interface SearchBarInterface<T> {
    placeholder: string;
    possibleSuggestions: any[];
    getSuggestionValue: (value: any) => any;
    suggestionFilterFunc: suggestionFilterFuncInterface<T>;
    onSuggestionsFetchRequested?: any;
    onSuggestionsClearRequested?: any;
    renderSuggestion: any;
    themeStyleClass?: string;
}

export { InputPropsInterface, ThemeInterface, SearchBarInterface };
