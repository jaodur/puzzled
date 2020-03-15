import * as React from 'react';

import SearchIcon from '@material-ui/icons/Search';
import Autosuggest from 'react-autosuggest';

import { InputPropsInterface, SearchBarInterface, ThemeInterface } from '../interfaces/searchBar';
import { ThickBlueBackground } from './background';
import { Banner } from './banner';

const defaultSearchBarStyleClass = 'defaultSearchBar';

function createTheme(className?: string): ThemeInterface {
    const classname = className ? className : defaultSearchBarStyleClass;

    return {
        container: `${classname}__container`,
        containerOpen: `${classname}__containerOpen`,
        input: `${classname}__input`,
        inputOpen: `${classname}__inputOpen`,
        inputFocused: `${classname}__inputFocused`,
        suggestionsContainer: `${classname}__suggestionsContainer`,
        suggestionsContainerOpen: `${classname}__suggestionsContainerOpen`,
        suggestionsList: `${classname}__suggestionsList`,
        suggestion: `${classname}__suggestion`,
        suggestionFirst: `${classname}__suggestionFirst`,
        suggestionHighlighted: `${classname}__suggestionHighlighted`,
        sectionContainer: `${classname}__sectionContainer`,
        sectionContainerFirst: `${classname}__sectionContainerFirst`,
        sectionTitle: `${classname}__sectionTitle`,
        search: `${classname}__search`,
    };
}

function SearchBar<T extends string>({
    placeholder,
    possibleSuggestions,
    getSuggestionValue,
    suggestionFilterFunc,
    renderSuggestion,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
    themeStyleClass,
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

    const theme: ThemeInterface = createTheme(themeStyleClass);

    return (
        <>
            <Banner small />
            <ThickBlueBackground />
            <div className={theme.search}>
                <SearchIcon />
            </div>
            <Autosuggest
                suggestions={suggestions}
                getSuggestionValue={getSuggestionValue}
                inputProps={inputProps}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested || defaultOnSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested || defaultOnSuggestionsClearRequested}
                renderSuggestion={renderSuggestion}
                theme={theme}
            />
        </>
    );
}

export { SearchBar };
