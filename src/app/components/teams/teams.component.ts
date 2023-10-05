import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  //declaration des variables
  teams: any = [];
  constructor() { }

  ngOnInit() {
    this.teams = [
      {id:1, name:"FCB", owner:"Ali Ben Salah", foundation:"1970", stadium:"Camp New"},
      {id:1, name:"RMD", owner:"Med Ben Med", foundation:"1950", stadium:"Bernabellu"}
    ]
  }

}
