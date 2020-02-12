function getRandom(item: string[]) {
    return item[Math.floor(Math.random() * item.length)];
}

const avatarLetterStyles = ['red', 'blue', 'purple', 'orange', 'green'];

const avatarLetterStyleClass = getRandom(avatarLetterStyles);

export { avatarLetterStyles, avatarLetterStyleClass };
