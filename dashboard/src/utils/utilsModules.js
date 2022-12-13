export const formatDate = (date) => {
    const newDate = new Date(date);
    const month = newDate.getMonth() + 1;
    return `${newDate.getFullYear()}-${month < 10 ? `0${month}` : month}-${newDate.getDate()}`
}