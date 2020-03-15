import * as React from 'react';
import Autosuggest from 'react-autosuggest';

import { InputPropsInterface, SearchBarInterface } from '../interfaces/searchBar';

function SearchBar<T extends string>({
    placeholder,
    possibleSuggestions,
    getSuggestionValue,
    suggestionFilterFunc,
    renderSuggestion,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
}: SearchBarInterface<T>) {
    const [value, setValue] = React.useState('');
    const [suggestions, setSuggestions] = React.useState([]);

    const onChange = (event: any, { newValue }: any) => {
        setValue(newValue);
    };

    const inputProps: InputPropsInterface = {
        placeholder,
        value,
        onChange,
    };

    function getSuggestions(value: T): T[] {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : suggestionFilterFunc(inputValue, possibleSuggestions);
    }

    const defaultOnSuggestionsFetchRequested = ({ value }: any) => {
        setSuggestions(getSuggestions(value));
    };

    const defaultOnSuggestionsClearRequested = () => {
        setSuggestions([]);
    };
    return (
        <Autosuggest
            suggestions={suggestions}
            getSuggestionValue={getSuggestionValue}
            inputProps={inputProps}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested || defaultOnSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested || defaultOnSuggestionsClearRequested}
            renderSuggestion={renderSuggestion}
        />
    );
}

export { SearchBar };
