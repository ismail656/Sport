import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

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
  constructor(private X: FormBuilder,
    private teamService: TeamService,
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.teamService.getAllTeams().subscribe(
      (response) => {
        this.teamsTab = response.teams;
        console.log(this.teamsTab)
      }
    )
    this.playerForm = this.X.group({
      name: ['', [Validators.minLength(4), Validators.required]],
      age: ['',[Validators.required]],
      nbr: ['',[Validators.required]],
      position: ['',[Validators.required]],
    })
  }
  addOrEditPlayer() {
    this.playerForm.value.teamId = this.teamId;
    this.playerService.addPlayer(this.playerForm.value ,this.playerForm.value.img).subscribe(
      (response) => {
        console.log("here is message : ", response);
      }
    )
  }

  getTeamId(event) {
    this.teamId = event.target.value;
    console.log(this.teamId);
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
