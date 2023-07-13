import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MyService {
  singlePetInfo: any[] = [];
  infosPet:any[] = []
  editList:any[]=[]
  selectedRowIndex:number = -1
  id:number
  petId: number

  addPetInfo(informations:any){
    this.singlePetInfo.push(informations)
  }
  addInfo(informations:any){
    this.infosPet.push(informations)
  }
  
  getListLength(){
    return this.infosPet.length
  }
getList(){
  return this.infosPet
}
}
