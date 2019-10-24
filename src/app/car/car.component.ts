import { Component, OnInit } from '@angular/core';
import { CarService  } from "../shared/car.service";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

constructor(private carService: CarService) { }
submitted: boolean;
formControls = this.carService.form.controls;
showSuccessMessage: boolean;

  ngOnInit() {
  }

  onSubmit(){
         this.submitted = true;
         if(this.carService.form.valid){
     if(this.carService.form.get('$key').value == null)
       this.carService.insertCar(this.carService.form.value);
     else 
        this.carService.updateCar(this.carService.form.value);
      this.showSuccessMessage = true;
     setTimeout(()=> this.showSuccessMessage=false,3000);
     this.submitted = false;
     this.carService.form.reset();
     }
         }
}
