import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
players : any;
title : string ="Players";
  constructor(private pservice:PlayerService) { }

  ngOnInit() {
    this.pservice.displayAllPlayers().subscribe((playersResponse)=> {
      this.players=playersResponse.players
      console.log(this.players);      
    })
    
  }

}
