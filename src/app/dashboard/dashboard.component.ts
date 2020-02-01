import { Component, OnInit, OnDestroy } from '@angular/core';

//Declares interfaces for a Metric and Node data type
interface Metric {
  used: number,
  available: number
};

interface Node {
  name: string,
  cpu: Metric,
  mem: Metric
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

//Controller class must implement OnInit and OnDestroy
export class DashboardComponent implements OnInit, OnDestroy {

  //Define properties and grants them types
  cpu: Metric;
  mem: Metric;
  cluster1: Node[];
  cluster2: Node[];
  interval: any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.generateData();
    this.interval = setInterval( () =>{
      this.generateData();
    }, 1500)
  }
  
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    clearInterval(this.interval);
  }

  generateData(): void{
    this.cluster1 = [];
    this.cluster2 = [];
    this.cpu = { used: 0 , available:0};
    this.mem = { used: 0 , available:0};
    for( let i = 1; i < 4; i++) this.cluster1.push(this.randomNode(i));
    for( let i = 4; i < 7; i++) this.cluster2.push(this.randomNode(i));
  }

  private randomNode(i): Node {
    let node = {
      name: 'node' + i,
      cpu: { available: 16, used: this.randomInteger(0, 16)},
      mem: { available:48, used: this.randomInteger(0,48)}
    };
    this.cpu.used += node.cpu.used;
    this.cpu.available += node.cpu.available;
    this.mem.used += node.mem.used;
    this.mem.available += node.mem.available;

    return node;
    }

    private randomInteger(min: number = 0, max: number = 100): number {
      return Math.floor(Math.random() * max) + 1;
    }
  }
