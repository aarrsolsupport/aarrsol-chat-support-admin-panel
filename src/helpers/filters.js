import moment from 'moment';
import 'moment-timezone';
const filters = {
  messageDisplayDateFormat(datetime) {
    return moment.unix(datetime).format('ddd, D MMM');
  },
  messageDisplayTimeFormat(datetime) {
    return moment.unix(datetime).format('hh:mm A');
  },
  messageDateTimeFormat(datetime) {
    return moment.unix(datetime).format('DD/MM/YYYY hh:mm A');
  },
  localDateTimeFormat(datetime) {
    return moment.utc(datetime).tz('Asia/Kolkata').format('DD MMM YYYY h:mmA');
  },
  getTicketStatus(id) {
    switch(id) {
      case 0: return 'Open';
      case 1: return 'Close';
      case 2: return 'Pending';
    }
  }
}
export default filters;
