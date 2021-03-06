import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  userAddForm:FormGroup;

  constructor(private userService:UserService,private toastrService:ToastrService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createUserAddForm()
  }

  createUserAddForm(){
 this.userAddForm=this.formBuilder.group({
   firstName:["",Validators.required],
   lastName:["",Validators.required],
   email:["",Validators.required]

 })
  }

  userAdd(){
    if(this.userAddForm.valid){
      let userModel=Object.assign({},this.userAddForm.value);
      this.userService.add(userModel).subscribe(response=>{
        this.toastrService.info(response.message,"Başarılı")
      })
    }
    else{
      this.toastrService.error("Form eksik","Hata")
    }

  }

}
