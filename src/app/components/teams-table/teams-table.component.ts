import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {
teams : any=[];
  constructor() { }

  ngOnInit() {
    this.teams = [
      {id:1, name:"FCB", owner:"Ali Ben Salah", foundation:"1970", stadium:"Camp New"},
      {id:1, name:"RMD", owner:"Med Ben Med", foundation:"1950", stadium:"Bernabellu"}
    ]
  }

}
