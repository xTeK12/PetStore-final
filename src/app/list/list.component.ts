import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MyService } from 'src/service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/APIService';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit, AfterViewInit {

itemList:any[] =[]
filteredList:any[]=[]
editedList:any[]=[]
i:number
selectedRowIndex:number = -1
selectedRowData: any = null
messageRemove = false
id:number




constructor(private myService:MyService,
            private route: ActivatedRoute, 
            private router: Router,
            private apiService: ApiService){
}

ngOnInit(){

  this.filteredList = this.apiService.getPets("all")
  this.id=this.route.snapshot.params['id']
  this.route.params
    .subscribe(
      (params:Params) => {
        this.id= +params['id']
        
      }
      )
      
}

onSelectStatus(){
  const selectElement = document.getElementById('statusSelect') as HTMLSelectElement;
  const selectedValue = selectElement.value;
  this.filteredList = this.apiService.getPets(selectedValue)
}

ngAfterViewInit(){
  const selectElement = document.getElementById('statusSelect') as HTMLSelectElement;
  selectElement.addEventListener('change', () => {
    this.onSelectStatus();
  });
}

onDelete(rowIndex:number){
  this.selectedRowIndex=rowIndex
  this.selectedRowData=this.filteredList[rowIndex]
  const modal = document.getElementById('deleteModal') as HTMLElement
  modal.style.display = 'block'
  
}

confirmDelete(){
  const modal = document.getElementById('deleteModal') as HTMLElement
  modal.style.display='none'
  if(this.selectedRowIndex > -1){
    this.apiService.deletePet(this.selectedRowData.id)
    this.filteredList.splice(this.selectedRowIndex,1)
    this.selectedRowIndex=-1
    this.selectedRowData=null
    this.messageRemove=true
    setTimeout(() =>{
      this.messageRemove=false
    },1000)
  }
}

cancelDelete(){
  const modal = document.getElementById('deleteModal') as HTMLElement
  modal.style.display='none'
}

onView(rowIndex:number){
  this.selectedRowIndex=rowIndex
  this.selectedRowData=this.filteredList[rowIndex]
  if(this.selectedRowIndex>-1){
    this.myService.singlePetInfo=[]
    this.myService.addPetInfo(this.selectedRowData)
    this.id=this.selectedRowData.id
    this.router.navigate(['/visualization',this.id])
  }
}
onEdit(rowIndex:number){
  this.selectedRowIndex=rowIndex
  this.myService.selectedRowIndex = rowIndex
  this.selectedRowData=this.filteredList[rowIndex]
  if(this.selectedRowIndex>-1){
    this.myService.singlePetInfo=[]
    this.myService.addPetInfo(this.selectedRowData)
    this.id=this.selectedRowData.id
    this.router.navigate(['/edit',this.id])
    
  }
}

}

