import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    pets: any[] = []
    apiUrl = 'https://petstore.swagger.io/v2';

    constructor(private http: HttpClient) { }

    getPets(status: string){
        this.pets = []
        if(status === "all"){
            this.http.get<any[]>(`${this.apiUrl}/pet/findByStatus?status=available`)
                .subscribe((data: any[]) => {
                    for(let i = 0; i<data.length; i++){
                        this.pets.push(data[i])
                    }
                })
            this.http.get<any[]>(`${this.apiUrl}/pet/findByStatus?status=pending`)
                .subscribe((data: any[]) => {
                    for(let i = 0; i<data.length; i++){
                        this.pets.push(data[i])
                    }
                })
            this.http.get<any[]>(`${this.apiUrl}/pet/findByStatus?status=sold`)
                .subscribe((data: any[]) => {
                    for(let i = 0; i<data.length; i++){
                        this.pets.push(data[i])
                    }
                })
        }
        else{
            this.http.get<any[]>(`${this.apiUrl}/pet/findByStatus?status=${status}`)
                .subscribe((data: any[]) => {
                    for(let i = 0; i<data.length; i++){
                        this.pets.push(data[i])
                    }
                });
        }
        return this.pets
    }
    getPetById(petId: number){  
        let pet: any[] = []
        this.http.get<any>(`${this.apiUrl}/pet/${petId}`)
                 .subscribe((data: any[]) => {
                  pet.push(data);
                 });
        return pet
    }
    addPet(petForm: any) {
        this.pets= []
        this.http.post<any>(`${this.apiUrl}/pet`, petForm)
                  .subscribe((data)=>{
                    this.pets=data
                  })
        return this.pets
    }

    editPet(editedPetForm:any) {
        this.pets=[]
        this.http.put<any>(`${this.apiUrl}/pet`, editedPetForm)
                  .subscribe((data)=>{
                    this.pets=data
                  })
        return this.pets
                  
    }

    deletePet(petId: number) {
        this.pets=[]
        this.http.delete<any>(`${this.apiUrl}/pet/${petId}`)
                    .subscribe((data)=>{
                        this.pets=data
                    })
        return this.pets
    }

}