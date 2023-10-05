import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { allMatches } from 'src/app/data/matchesData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit {
  formMatch: FormGroup;
  match: any = {};
  matchId: any;
  title: string = "Add Match";
  matches: any = allMatches;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mService: MatchService, 
    private router : Router
  ) { }

  ngOnInit() {
    this.matchId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.matchId) {
      this.title = "Edit Match"
      this.mService.getMatchByID(this.matchId).subscribe((response) => {
        console.log("here response from backend : ", response.matche);
        this.match=response.matche;
        
      })
    }
  }

  addOrEditMatch() {
    if (this.matchId) {
      this.mService.editMatch(this.match).subscribe((response)=>{
        console.log("Here response from BE", response.isEdit);
        this.router.navigate(["admin"]);
      });
    } else {
      this.mService.addMatch(this.match).subscribe((response)=>{
        console.log("Here response from BE", response);});
    }
  }
}
