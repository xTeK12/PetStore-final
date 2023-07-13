import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyService } from 'src/service';
import { ApiService } from '../APIService';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit{
infoPet:any[]=[]

  

  constructor(private myService:MyService,
              private route: ActivatedRoute,
              private apiService: ApiService){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.myService.petId = Number(params['id'])
    })
    this.infoPet = this.apiService.getPetById(this.myService.petId)
  }

}
