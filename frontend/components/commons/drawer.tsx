import * as React from 'react';

import UIDrawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import { useQueryProfiles } from '../../graphql/customHooks/profiles';
import { deepCopy } from '../../utils/utils';
import { TemporaryDrawerInterface } from '../interfaces/drawer';
import { ProfileInterface } from '../interfaces/profile';
import { ProfileAvatar } from './avatar';
import { SearchBar } from './searchBar';

const useStyles = makeStyles({
    list: {
        width: '25vw',
        backgroundColor: '#2662ac',
        height: '100%',
    },
    fullList: {
        width: 'auto',
    },
});

function TemporaryDrawer({ elements, side, open, toggleDrawer }: TemporaryDrawerInterface) {
    const classes = useStyles({});

    const [profiles, setProfiles] = React.useState([]);
    const { profilesData, error } = useQueryProfiles((results: any) =>
        setProfiles(deepCopy(results.profilesData.profiles))
    );

    const renderSuggestion = (suggestion: ProfileInterface) => {
        return (
            <div>
                <ProfileAvatar
                    styleClass={'default-search-bar__avatar'}
                    small
                    src={suggestion.pictureUrl}
                    profileName={suggestion.name}
                />
                <span>{suggestion.name}</span>
            </div>
        );
    };

    const getSuggestionValue = (suggestion: ProfileInterface) => suggestion.name;

    function filterFunc(input: any, possibleValues: any): any {
        return possibleValues.filter((possibleValue: ProfileInterface): boolean => {
            const searchToBoolean = (result: number) => !(result === -1);
            return (
                possibleValue.name.toLowerCase().slice(0, input.length) === input ||
                searchToBoolean(possibleValue.name.toLowerCase().search(input)) ||
                searchToBoolean(possibleValue.preferredName.toLowerCase().search(input))
            );
        });
    }

    const sideList = () => (
        <div className={classes.list} role="presentation">
            <SearchBar
                placeholder={'Search to start a new conversation'}
                possibleSuggestions={profiles}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                suggestionFilterFunc={filterFunc}
            />
        </div>
    );

    return (
        <div>
            <UIDrawer anchor={side} open={open} onClose={toggleDrawer(false)}>
                {sideList()}
            </UIDrawer>
        </div>
    );
}

export { TemporaryDrawer };
