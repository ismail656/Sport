import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';
import { log } from 'util';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  title: string = "Add Player";
  playerForm: FormGroup;
  teamsTab: any = [];
  teamId: any;
  imagePreview:any
  playerId:any
  player:any

  constructor(private X: FormBuilder,
    private teamService: TeamService,
    private playerService: PlayerService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.playerId=this.activatedRoute.snapshot.paramMap.get('id')
    if (this.playerId) {
      this.title="Edit Player"
      this.playerService.getPlayerById(this.playerId).subscribe(
        (response)=> {
          this.player=response.player
          console.log(this.player);
        }
      ) 
  
    }
    this.teamService.getAllTeams().subscribe(
      (response) => {
        this.teamsTab = response.teams;
      }
    )
    this.playerForm = this.X.group({
      name: ['', [Validators.minLength(4), Validators.required]],
      age: ['',[Validators.required]],
      nbr: ['',[Validators.required]],
      position: ['',[Validators.required]],
      img:['']
    })
    this.playerForm.patchValue(this.player)
  }
  addOrEditPlayer(){
    if (this.playerId) {
      this.playerForm.value.teamId = this.teamId;
      this.playerForm.value.playerId=this.playerId
      console.log(this.playerForm.value.playerId=this.playerId)
      this.playerService.editPlayer(this.playerForm.value,this.playerForm.value.img).subscribe(()=>{
        (response)=>{
          console.log(response.isEdit);
        }
      })
      
    } else {
      this.playerForm.value.teamId = this.teamId;
      this.playerService.addPlayer(this.playerForm.value ,this.playerForm.value.img).subscribe(
      (response) => {
        console.log("here is message : ",response);
      }
    )
      
    }
    
  }

  getTeamId(event) {
    this.teamId = event.target.value;
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.playerForm.patchValue({ img: file });
    this.playerForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }
}
