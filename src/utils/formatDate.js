module.exports = {
  // Format time as H:MM:SS AM/PM
  format_time: (date) => {
    return date.toLocaleTimeString();
  },

  // Format date as MM/DD/YYYY
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
  },
};