import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {
players:any=[]
  constructor() { }
  ngOnInit() {
    this.players=[
      {id:1, name:"Ronaldo", age:34, position:"Attq", number:7},
      {id:1, name:"Messi", age:34, position:"SA", number:10}
    ]
  }

}
