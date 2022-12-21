export const formatDateForUI = (data) => {
    const date = new Date(data).getDate();
    const year = new Date(data).getFullYear();
    const month = new Date(data).getMonth() + 1;

    return `${year}-${month}-${date}`;
};
