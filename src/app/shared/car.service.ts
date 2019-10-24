import { Injectable } from '@angular/core';
import { FormControl , FormGroup , Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private firebase: AngularFireDatabase) { }
         carList: AngularFireList<any>;

  form = new FormGroup({
     $key: new FormControl(null),
     brand: new FormControl('',Validators.required),
     type: new FormControl('',Validators.required),
     seats: new FormControl('',[Validators.required, Validators.minLength(1)]),
     horsepower: new FormControl('',[Validators.required, Validators.minLength(3)]),
     sportscar: new FormControl('',Validators.required),
     colour: new FormControl('',Validators.required),
     age: new FormControl('',[Validators.required, Validators.minLength(4)]),
     price: new FormControl('',[Validators.required, Validators.minLength(5)]),
     carImage: new FormControl('',Validators.required)

         });

   getCars(){
                 this.carList = this.firebase.list('cars');
                 return this.carList.snapshotChanges();
         }

     insertCar(car){
                 this.carList.push({
                         brand: car.brand,
                         type: car.type,
                         seats: car.seats,
                         horsepower: car.horsepower,
                         sportscar: car.sportscar,
                         colour: car.colour,
                         age: car.age,
                         price: car.price,
                         carImage: car.carImage

                  });
         }

         populateForm(car){
    this.form.setValue(car);
  }

  updateCar(car){
    this.carList.update(car.$key,{
       					brand: car.brand,
                         type: car.type,
                         seats: car.seats,
                         horsepower: car.horsepower,
                         sportscar: car.sportscar,
                         colour: car.colour,
                         age: car.age,
                         price: car.price,
                         carImage: car.carImage
    });
  }

  deleteCustomer($key: string){
    this.carList.remove($key);
  }
}
