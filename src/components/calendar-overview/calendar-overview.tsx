import { Component, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'calendar-overview',
  styleUrl: 'calendar-overview.scss',
  shadow: true
})
export class CalendarOverview {

  @State() 
  currentMonth: Date = new Date();


  @Event()
  dateSelected: EventEmitter;

  dateSelectedClick(date: Date) {
    console.log(date.toISOString());
    let newDate = new Date(date);
    this.currentMonth = newDate;
    this.dateSelected.emit(date);
  }

  addMonth(nb: number) {
    //setMonth does not trigger update of the State property, we have to reassign this.currentMonth
    let newDate = new Date(this.currentMonth);
    newDate.setMonth(newDate.getMonth()+nb);
    this.currentMonth = newDate;
  }
  
  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  startOfWeek(d: Date) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  getDaysOfMonth() {
    console.log("getDaysOfMonth");
    let days = [];
    let firstDate = new Date(this.currentMonth.getTime());
    firstDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
    firstDate = this.startOfWeek(firstDate);
    days.push(firstDate)
    for (var i = 0; i < 41 ; i++) { // 41 = 6*7 -1 to get 6 weeks
      let day = new Date(firstDate.getTime());
      days.push(this.addDays(day, 1+i));
    }
    let res= []
    for (var nbWeek = 0; nbWeek < 6 ; nbWeek++) {
      res.push(days.slice(nbWeek * 7, nbWeek *7 + 7))
    }
    console.log(res);
    return res;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  isInMonth(day, week):boolean {
    if(week == 0 && day > 8) { // first row
      return false;
    }
    if(week >= 4  && day < 15) { // last 2 row
      return false;
    }
    return true;
  }
  

  render() {
    return (
      <div class="month-navigator">
          <div class="month-picker">
				  <button class="month-selector prev" type="button" onClick={() => this.addMonth(-1)}>
					  <span>&larr;</span>
				  </button>
          {this.capitalizeFirstLetter(this.currentMonth.toLocaleString("fr-fr", { month: "long", year: "numeric" }))}
				  <button class="month-selector next" type="button" onClick={() => this.addMonth(1)}>
					  <span>&rarr;</span>
				  </button>
          </div>
          {this.getDaysOfMonth().map((week, index) => 
          <div class="week-overview">
            {week.map((day) => 
              <span
              class={"day-overview " + (this.isInMonth(day.getDate(), index) ? '': 'greyed')}
              onClick={ () => this.dateSelectedClick(day)}>
                {day.getDate()}
              </span>
            )}
          </div>
          )}
      </div>
    );
  }
}