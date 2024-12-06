import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: any =[];
  title: string = "Matches";

  constructor(private mservice: MatchService) { }

  ngOnInit() {
    this.mservice.displayAllMatches().subscribe((matchesResponse) => {
      this.matches=matchesResponse.matches;
    })
  }

  updateMatches(T) {
    this.matches=T;
  }

}
