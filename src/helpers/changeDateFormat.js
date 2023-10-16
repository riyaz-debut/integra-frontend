import moment from 'moment';

export const changeFormat = (key, value) => { 

    let format = 'DD-MM-YYYY';
    let dateValue = value;

    if (key === 'date') {
        dateValue = value;
        format = 'DD-MM-YYYY';
       // format = 'YYYY-MM-DD';
    }
    if (key === 'dateTime') {
        dateValue = value;
        format = 'DD-MM-YYYY | hh:mm:ss a';
    }
    
    return moment(dateValue).format(format)
};