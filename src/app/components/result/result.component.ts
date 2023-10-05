import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent implements OnInit {
  @Input() match: any;
  @Output() newMatches : EventEmitter<any> = new EventEmitter();
  matches: any;
  user : any = {};
  constructor(private mService : MatchService) { }

  ngOnInit() {
    const jwt = sessionStorage.getItem('token');
    if (jwt) {
      this.user = this.decodeToken(jwt);
      console.log(this.user)
    }
    return !!jwt;

  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }

  deleteMatchById(matchId: any) {
    this.mService.deleteMatchById(matchId).subscribe((response) => {
      console.log("Voici le resultat reçu du backend : ", response.siDeleted);
      if (response.siDeleted) {
        this.mService.displayAllMatches().subscribe((res) => {
          console.log("Voici le resultat reçu du backend : ", res);
          this.newMatches.emit(res.matches);
        })
      }
    });
  }

  //methode de changement du couleur selon le gagnants
  scorecolor(sc1, sc2) {
    if (sc1 > sc2) {
      return "green"
    } else if (sc1 < sc2) {
      return "orange"
    } else {
      return "blue"
    }
  }

}
