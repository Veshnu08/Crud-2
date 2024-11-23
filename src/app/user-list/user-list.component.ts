import { CommonModule } from '@angular/common';
import { Component , OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [UserService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  user:User = {
    name: '', 
    email: '',
    address: '',
      city: '',
      state: '',
      zipcode: 0
    
  };
  isEditing = false;

  constructor(private userService : UserService){}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers():void{
    this.userService.getUsers().subscribe(_users =>{
      this.users = _users;
    })
  }

  editUser(user:User):void{
    this.user = {...user};
    this.isEditing = true;
  }

  deleteUser(id:number):void{
    if(confirm('Are you sure you want to delete this User?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      })
      
    }
  }

   cancelEdit():void{
    this.resetForm();
   }

   private resetForm(): void{
    this.user = {name: '',
      email: '',
      address: '',
        city: '',
        state: '',
        zipcode: 0
      };
    this.isEditing = false;
   }


   onSubmbit():void{
    if(this.isEditing){
      this.userService.updateUser(this.user).subscribe(()=>{
        this.loadUsers();
        this.resetForm();
      });
    }else{
      this.userService.addUser(this.user).subscribe(()=>{
        this.loadUsers();
        this.resetForm();
      })
    }
   }

}