import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.css']
})
export class MetricComponent {

  @Input() title: string = '';
  @Input() description: string = '';
  
  //Private properties for storing the validated values
  private _value: number = 0;
  private _max: number = 100;

  //Setter method for value with Input decorator
  @Input('used') 
  set value(value: number) {
  if (isNaN(value)) value = 0;
  this._value = value;
  }
  //Getter method for value to return private property
  get value(): number { return this._value; }

  //Setter method for max with Input decorator
  @Input('available') 
  set max(max: number) {
  if (isNaN(max)) max = 100;
  this._max = max;
  }

  //Getter method for max to return private property
  get max(): number { return this._max; } 

  //Method to check if utilization exceeds 70%
  isDanger(){
    return this.value / this.max > 0.7;
  }

}
