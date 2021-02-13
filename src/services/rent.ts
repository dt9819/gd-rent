import { Service, Inject } from 'typedi';

@Service()
export default class RentService {
  constructor(@Inject('logger') private logger) {}

  public async calculate(start, end, rent, result) {
    if (
      new Date(start).getMonth() === new Date(end).getMonth() &&
      new Date(start).getFullYear() === new Date(end).getFullYear()
    ) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const { next, ...rest } = this.monthlyRent(start, end, rent);
      result.push(rest);
      return result;
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const { next, ...rest } = this.monthlyRent(start, null, rent);
      result.push(rest);
      return this.calculate(next, end, rent, result);
    }
  }

  /*public async insert(doc) {
    try {
      const leaseStartDate = doc.leaseStart;
      const leaseEndDate = doc.leaseEndDate;
      const isValidStart = moment(leaseStartDate).isValid();
      const isValidEnd = moment(leaseEndDate).isValid();
      if (isValidStart && isValidEnd) {
        // eslint-disable-next-line prefer-const
        let [startMonth, endMonth] = [moment(doc.leaseStart).month(), moment(doc.leaseEnd).month()];
        const [leaseStart, leaseEnd, amount] = [doc.leaseStart, doc.leaseEnd, doc.monthlyRentAmount];
        let dueDate = leaseStart;
        const rent = [];
        while (startMonth <= endMonth) {
          const result = await this.calculate(dueDate, leaseEnd, amount);
          if (result.amount !== 0) {
            rent.push(result);
          }
          dueDate = result.periodEnd;
          startMonth++;
        }
        return { rent };
      } else {
        throw new Error('Incorrect Date');
      }
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }*/

  public async monthlyRent(start, end, rent) {
    const f = new Date(start);
    const l = new Date(
      new Date(f.getFullYear(), f.getMonth() + 1, 0).getTime() - new Date().getTimezoneOffset() * 60000,
    );
    const e = end ? new Date(end) : l;
    const next = new Date(
      new Date(f.getFullYear(), f.getMonth() + 1, 1).getTime() -
      new Date().getTimezoneOffset() * 60000
    );
    const amount = Math.round(((e.getDate() - f.getDate() + 1) * rent) / l.getDate());
    return {
      amount,
      next,
      periodStart: this.dateFormat(f),
      periodEnd: this.dateFormat(e),
    };
  }

  public async dateFormat(date) {
    const d = date.toLocaleDateString().split('/');
    return `${d[1] < 10 ? '0' + d[1] : d[1]}/${d[0] < 10 ? '0' + d[0] : d[0]}/${d[2]}`;
  }

  /*public async calculate(leaseStart, leaseEnd, amount) {
    const daysInMonth = moment(leaseStart, 'YYYY-MM').daysInMonth();
    const startDay = moment(leaseStart).format('D');
    const endDay = moment(leaseStart)
      .endOf('month')
      .format('D');
    const leaseEndDay = moment(leaseEnd).format('D');
    const monthEnd = moment(leaseStart)
      .endOf('month')
      .add(1, 'days')
      .format('YYYY-MM-DD');
    const date1 = moment(monthEnd).format('YYYY-MM-DD');
    const date2 = moment(leaseEnd).format('YYYY-MM-DD');
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    let payableDaysCount = endDay - startDay;
    if (date1 > date2) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      payableDaysCount = leaseEndDay - startDay;
    }
    let payableAmount = amount;
    if (payableDaysCount + 1 < daysInMonth) {
      payableAmount = (amount / daysInMonth) * payableDaysCount;
    }
    const finalResult = {
      periodStart: moment(leaseStart).format('YYYY-MM-DD'),
      periodEnd: date1,
      amount: payableAmount,
    };
    if (date1 > date2) {
      finalResult.periodEnd = date2;
    }
    return finalResult;
  }*/
}
