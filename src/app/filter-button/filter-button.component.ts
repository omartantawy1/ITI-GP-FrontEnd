import { Component } from '@angular/core';


@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.css']
})

export class FilterButtonComponent {

  showAdditionalOptions = false;



  
  labels = [
    {id: 'green-label',name: 'green-label',backgroundColor: '#216E4E', color: 'Green', },
    { id: 'yellow-label', name: 'yellow-label', backgroundColor: '#7f5f01', color: 'Yellow', },
    { id: 'purple-label', name: 'purple-label', backgroundColor: '#6f42c1', color: 'Purple', },
    {id: 'red-label',name: 'red-label',backgroundColor: '#dc3545',color: 'red',   },
    {id: 'blue-label',name: 'blue-label',backgroundColor: '#0c66e4',color: 'blue',   },

  ];

  initialdateItems = [
    { id: 'checkbox0', text: 'No Dates', icon: 'bi bi-calendar-minus' },
    { id: 'checkbox1', text: 'Overdue', icon: 'bi bi-calendar-plus',  },
    { id: 'checkbox2', text: 'Due in the next day', icon: 'bi bi-clock',  },
    { id: 'checkbox3', text: 'Due in next Week', icon: 'bi bi-clock' }
  ];
  
  additionaldateItems = [
    { id: 'checkbox4', text: 'Due in next month', icon: 'bi bi-calendar' },
    { id: 'checkbox5', text: 'Marked As Complete', icon: 'bi bi-check' },
    { id: 'checkbox6', text: 'Not Marked As complete', icon: 'bi bi-x' }
  ];
  
  toggleShowMore() {
    this.showAdditionalOptions = !this.showAdditionalOptions;
  }
 
 
}
