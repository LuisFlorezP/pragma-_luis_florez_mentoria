import moment from 'moment';

class DateService {
    private static getDate = (date?: string | Date): moment.Moment => moment(date);
    
    public static subtract = (amount: number, unit: moment.unitOfTime.Diff, date?: string | Date): Date => DateService.getDate(date).subtract(amount, unit).toDate();
    
    public static toUnix = (date?: string | Date): number => DateService.getDate(date).unix();
    
    public static difference = (date1: string | Date, date2: string | Date, unit: moment.unitOfTime.Diff): number => DateService.getDate(date1).diff(DateService.getDate(date2), unit);
    
    public static format = (format: string, date: string | Date): string => DateService.getDate(date).format(format);
}

export { DateService };