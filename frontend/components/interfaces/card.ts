import { ElementInterface } from './interfaces';

type heartsType = 'AH' | '2H' | '3H' | '4H' | '5H' | '6H' | '7H' | '8H' | '9H' | 'TH' | 'JH' | 'QH' | 'KH';
type spadesType = 'AS' | '2S' | '3S' | '4S' | '5S' | '6S' | '7S' | '8S' | '9S' | 'TS' | 'JS' | 'QS' | 'KS';
type diamondsType = 'AD' | '2D' | '3D' | '4D' | '5D' | '6D' | '7D' | '8D' | '9D' | 'TD' | 'JD' | 'QD' | 'KD';
type clubsType = 'AC' | '2C' | '3C' | '4C' | '5C' | '6C' | '7C' | '8C' | '9C' | 'TC' | 'JC' | 'QC' | 'KC';
type jokersType = 'VR' | 'VB'; // Red and Black Jokers
type coversType = 'CR' | 'CB'; // Red and Black card covers

type cardType = heartsType | spadesType | diamondsType | clubsType | jokersType | coversType;

interface CardInterface extends ElementInterface {
    value: cardType;
    size?: 'tiny' | 'small' | 'xSmall';
}

export { cardType, CardInterface };
