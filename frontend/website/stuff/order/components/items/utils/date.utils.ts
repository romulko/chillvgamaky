export const toTime = (date: Date) =>
    date.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'});
