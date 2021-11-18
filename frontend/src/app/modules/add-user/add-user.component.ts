import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NgForm} from '@angular/forms';
import { AddUser } from 'src/app/models/addUser';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { AddDesignation } from 'src/app/models/addDesignation';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userFormData: FormGroup;
  public alldesignation!: AddDesignation[];
  public reportArray!: AddUser[];
  UserResData! : any[];
  userNoRecord = "No";
  selectedValue : string ="";

  constructor(private fb : FormBuilder, private adminService : AdminServiceService) { 
    this.userFormData = fb.group({
      username : new FormControl(),
      email : new FormControl(),
      password : new FormControl(),
      mobile_number : new FormControl(),
      region : new FormControl(),
      city : new FormControl(),
      state : new FormControl(),
      locality : new FormControl(),
      pincode : new FormControl(),
      reportTo : new FormControl(),
      designation : new FormControl()      
    })
  }

  ngOnInit(): void {
    this.userFormData.reset();
    this.adminService.getAllDesignationDetails().subscribe((res : any) => {
      this.alldesignation = res.results;
    });
  }

  userInput(input :any){
    let UserData;
    var inputText = '';
    inputText = input.value;

   if(inputText.length<3){
    this.UserResData = [];
   }
    if(inputText.length >= 3){
      this.adminService.getUserByText(inputText).subscribe((response : any) => {
          if(response.results == "No Data Found"){
            this.UserResData = [];
            this.userNoRecord = "Yes";
          }else{
            this.UserResData = [];
            this.userNoRecord= "No"
            for(var i=0; i<response.results.length; i++){
              UserData= {
                "_id" : response.results[i]._id,
                "user" : response.results[i].name + ", " + response.results[i].city
              }
              this.UserResData.push(UserData);
            }
          }
      });
    }
  }

  userSelected(e : any) {
    this.selectedValue = e.target.options[e.target.options.selectedIndex].text;
    this.UserResData=[];
  }

  onSubmit(){
    var saveuserDetails = new AddUser();
    saveuserDetails = this.userFormData.value;
    this.adminService.saveUserDetails(saveuserDetails).subscribe((res : any ) =>{
      this.userFormData.reset();
    });
  }

}
