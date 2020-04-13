import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/empservice/employee.service';
import { Profile } from '../entity/Profile';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public employees = [];
  public empListfromService =[];

  public profiles=[];

  constructor(private _empService : EmployeeService) { }

  public profile:Profile  ;
  ngOnInit(): void {
    this.employees= this._empService.getEmployees();
    this._empService.getEmployeesFromFile()
      .subscribe(data=>this.empListfromService=data);
      this._empService.setProfileId(2);
      //this._empService.getProfileId().subscribe(d => this.profileIds =d);
      this._empService.getProfileUsingId()
        .subscribe(d=>this.profile=d);

      this._empService.getProfiles()
        .subscribe(data=>this.profiles=data);
  }

}
