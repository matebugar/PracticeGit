import { Component, OnInit } from '@angular/core';
import { CarService } from "../shared/car.service";

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
carArray =[];
showDeletedMessage : boolean;
searchText:string = "";

constructor(private carService: CarService) { }

  ngOnInit() {
         this.carService.getCars().subscribe(
                 (list) => {
                         this.carArray = list.map( (item) => {
                                return {
                                        $key : item.key,
                                        ...item.payload.val()
                                }
                        })
                 });
 }
 onDelete($key){
     if(confirm("Are you sure you want to delete this record?")){
       this.carService.deleteCustomer($key);
       this.showDeletedMessage = true;
       setTimeout(()=> this.showDeletedMessage=false , 3000)
     }
   }

filterCondition(car){
   return car.brand.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1 || 
   car.type.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1 ||
   car.seats.indexOf(this.searchText) != -1 ||
   car.horsepower.indexOf(this.searchText) != -1 ||
   car.sportscar.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1 || 
   car.colour.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1 || 
   car.age.indexOf(this.searchText) != -1 ||
   car.price.indexOf(this.searchText) != -1 
   ;

 }
}
