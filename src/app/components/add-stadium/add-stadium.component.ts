import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-stadium',
  templateUrl: './add-stadium.component.html',
  styleUrls: ['./add-stadium.component.css']
})
export class AddStadiumComponent implements OnInit {
  title: string = "Match Info";
  addStadiumForm: FormGroup;

  constructor(private X: FormBuilder) { }

  ngOnInit() {
    this.addStadiumForm = this.X.group({
      stadiumName: ['', [Validators.required]],
      team: ['', [Validators.required]],
      city: ['', [Validators.required]],
      capacity: ['', [Validators.required]],
    })
  }
  addStadium() {
    var stadiumTab = JSON.parse(localStorage.getItem("stadium") || "[]");
 
      stadiumTab.push(this.addStadiumForm.value);
      localStorage.setItem("stadium", JSON.stringify(stadiumTab));
      console.log(stadiumTab)
  }
}
