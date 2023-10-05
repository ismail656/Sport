import { Component, OnInit } from '@angular/core';
import { allMatches } from 'src/app/data/matchesData';
import { allPlayers } from 'src/app/data/playersData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  players : any = allPlayers;
  matches: any = allMatches;
  match: any
  constructor() { }

  ngOnInit() {
    this.match = this.matches[this.matches.length - 1]
  }

}
