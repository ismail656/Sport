import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  title: string = "Add Team";
  team: any = {}


  constructor(private teamService: TeamService) { }

  ngOnInit() {
  }

  addTeam() {
    this.teamService.addTeam(this.team).subscribe(
      (response) => {
        console.log(response);
      }
      );
  }
}
