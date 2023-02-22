export default function LimitedText({text, length}) {
    if (text === null) {
        return null;
    }
    if (text.length === 0) {
        return '...'
    }
    if (text.length > length) {
        return text.slice(0, length) + '...';
    }
    return text;
}