import moment from 'moment';

class DateUtils {
    public static getMoment = (date?: string | Date, format?: string): moment.Moment => moment(date, format);
    
    public static subtract = (amount: number, unit: moment.unitOfTime.Diff, date: moment.Moment = this.getMoment()): moment.Moment => date.subtract(amount, unit);
    
    public static toUnix = (date: moment.Moment = this.getMoment()): number => date.unix();
    
    public static difference = (date1: moment.Moment, date2: moment.Moment, unit: moment.unitOfTime.Diff): number => date1.diff(date2, unit);
    
    public static format = (format: string, date: moment.Moment | string = this.getMoment()): string => (typeof date === 'string' ? this.getMoment(date).format(format) : date.format(format));
}

export { DateUtils };