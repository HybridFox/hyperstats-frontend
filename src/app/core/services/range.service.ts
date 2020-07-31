import * as moment from 'moment';

export class RangeService {
  public ranges = {
    'Last': {
      'Hour': [moment().subtract(1, 'hours'), moment()],
      '6 Hours': [moment().subtract(6, 'hours'), moment()],
      '12 Hours': [moment().subtract(12, 'hours'), moment()],
      '24 Hours': [moment().subtract(1, 'days'), moment()],
      'Week': [moment().subtract(1, 'weeks').startOf('isoWeek'), moment().subtract(1, 'weeks').endOf('isoWeek')],
      '2 Weeks': [moment().subtract(2, 'weeks').startOf('isoWeek'), moment().subtract(1, 'weeks').endOf('isoWeek')],
    },
    'Current': {
      'Hour': [moment().startOf('hour'), moment().endOf('hour')],
      'Day': [moment().startOf('day'), moment().endOf('day')],
      'Week': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
    }
  };

  public locale = {
    format: 'DD MMMM YYYY HH:mm',
  }
}
