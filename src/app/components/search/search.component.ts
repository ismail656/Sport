import { Component, OnInit } from '@angular/core';
import { allMatches } from 'src/app/data/matchesData';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchService } from 'src/app/services/match.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchMatches: FormGroup;
  myAllMatches: any = allMatches;
  matches: any;
  title: string = "Search";
  message: string = ''

  constructor(private score: FormBuilder, 
    private mService : MatchService
    ) { }

  ngOnInit() {
    this.searchMatches = this.score.group({
      scoreSearch: '',
    })

  }

  search() {
    console.log(this.searchMatches.value)
    console.log(typeof (this.searchMatches.value))
    var searchInput = this.searchMatches.value;
    // if (searchInput.scoreSearch != "") {
    //   this.matches = this.myAllMatches.filter((obj: any) => {
    //     return (
    //       obj.scoreOne == searchInput.scoreSearch ||
    //       obj.scoreTwo == searchInput.scoreSearch
    //     );
    //   });

    // } else {
    //   this.matches = allMatches;
    // }
    this.mService.searchMatchByScore(searchInput.scoreSearch).subscribe((response) => {
      this.matches=response.matche
      if (this.matches.length == 0) {
        this.message = `Aucun matche ayant un score égale à : "-->|]  ${searchInput.scoreSearch}  [|<--"`
      } else {
        this.message = `Voila les matches ayant un score contenant : "-->|]  ${searchInput.scoreSearch}  [|<--"`
      }
    })
    
    console.log(this.myAllMatches)
    console.log(this.matches)
    console.log(this.message);
  }
}

