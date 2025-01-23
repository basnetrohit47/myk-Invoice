export const formatDate = (dateString: string) => {
    if (!dateString) {
        return null
    }
    const date = new Date(dateString); // Parse the date string
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits for the day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure 2 digits for the month
    const year = date.getFullYear(); // Get the full year

    return `${day}/${month}/${year}`;
};