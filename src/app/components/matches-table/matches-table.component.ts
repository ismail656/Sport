import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { products } from 'src/app/data/product';
import { MatchService } from 'src/app/services/match.service';


@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.css']
})
export class MatchesTableComponent implements OnInit {
  pageOfItems: Array<any>;
  matches: any;
  allproduct: any;
  title: string = "Matches liste for : "
  test: string = "abderrahmene";
  actualDate: Date = new Date();
  constructor(private router: Router,
    private mService: MatchService) { };

  ngOnInit() {
    this.allproduct = products;
    this.mService.displayAllMatches().subscribe((reponse) => {
      console.log("Voici le resultat reçu du backend : ", reponse);
      this.matches = reponse.matches
    })
  }

  deleteMatchById(matchId: any) {
    this.mService.deleteMatchById(matchId).subscribe((response) => {
      console.log("Voici le resultat reçu du backend : ", response.siDeleted);
      if (response.siDeleted) {
        this.mService.displayAllMatches().subscribe((reponse) => {
          console.log("Voici le resultat reçu du backend : ", reponse);
          this.matches = reponse.matches
        })
      }
    });
  }

  goToDisplay(id: number) {
    this.router.navigate([`matchInfo/${id}`]);
  }
  goToEditMatches(id: number) {
    this.router.navigate([`editMatches/${id}`]);
  }

  triCroissentProduct() {
    var aux: any;
    for (let i = 0; i < this.allproduct.length - 1; i++) {
      for (let j = i + 1; j < this.allproduct.length; j++) {
        if (this.allproduct[i].price > this.allproduct[j].price) {
          aux = this.allproduct[i];
          this.allproduct[i] = this.allproduct[j];
          this.allproduct[j] = aux;
        }
      }
    }
  }

  triDecroissentProduct() {
    var aux: any;
    for (let i = 0; i < this.allproduct.length - 1; i++) {
      for (let j = i + 1; j < this.allproduct.length; j++) {
        if (this.allproduct[i].price < this.allproduct[j].price) {
          aux = this.allproduct[i];
          this.allproduct[i] = this.allproduct[j];
          this.allproduct[j] = aux;
        }
      }
    }
  }

  noFiltre() {
    var aux: any;
    for (let i = 0; i < this.allproduct.length - 1; i++) {
      for (let j = i + 1; j < this.allproduct.length; j++) {
        if (this.allproduct[i].id > this.allproduct[j].id) {
          aux = this.allproduct[i];
          this.allproduct[i] = this.allproduct[j];
          this.allproduct[j] = aux;
        }
      }
    }
    this.allproduct = products;
  }

  uniqueProduct() {
    var t: any = this.allproduct
    var tabResult: any = t[0];
    var tabElement: any;
    var occur: boolean = false;
    for (let i = 0; i < t.length; i++) {
      tabElement = t[i];
      occur = false;
      for (let j = 0; j < tabResult.length - 1; j++) {
        if (tabResult[j].name != t[i].name) {
          occur = true;
          console.log(occur)

        } else {
          occur = false;
          break
        }
      }
      if (occur == true) {
        tabResult.push(i);
      }
    }
    console.log(tabResult)
  }

  onChangePage(T: Array<any>) {
    // update current page of items
    this.pageOfItems = T;
    }
}
