import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() player: any;
  players : any;
  constructor() { }

  ngOnInit() {
    this.players=[
      {id:1, name:"Ronaldo", age:34, position:"Attq", number:7},
      {id:1, name:"Messi", age:34, position:"SA", number:10}
    ]
  }

}
