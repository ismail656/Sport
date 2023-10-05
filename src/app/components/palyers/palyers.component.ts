import { Component, OnInit } from '@angular/core';
import { allMatches } from 'src/app/data/matchesData';
import { allPlayers } from 'src/app/data/playersData';

@Component({
  selector: 'app-palyers',
  templateUrl: './palyers.component.html',
  styleUrls: ['./palyers.component.css']
})
export class PalyersComponent implements OnInit {
players : any= allPlayers;
title : string ="Palyers";
  constructor() { }

  ngOnInit() {
    
  }

}
