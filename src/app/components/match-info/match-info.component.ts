import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { allMatches } from 'src/app/data/matchesData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent implements OnInit {
  title: string = "Match Info";
  matches: any = allMatches;
  matchId: any;
  findedMatch: any;
  constructor(private activatedRoute: ActivatedRoute,
    private mService: MatchService
  ) { }

  ngOnInit() {


    //Recupérer le ID de la page activée
    this.matchId = this.activatedRoute.snapshot.paramMap.get('id');
    this.mService.getMatchByID(this.matchId).subscribe((response) => {
      console.log("voici la repense du BE  :", response);
      this.findedMatch = response.matche;
    })
    //Chercher l'élément ayant le ID souhaité
    // for (let i = 0; i < this.matches.length; i++) {
    //   if (this.matches[i].id == this.matchId) {
    //     this.findedMatch = this.matches[i];
    //     break;
    //   }
    // }

    // this.findedMatch = this.matches.find(
    //   obj => obj.id === Number(this.matchId)
    // )
    console.log(this.findedMatch);



  }
}
