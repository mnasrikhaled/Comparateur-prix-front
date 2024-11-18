import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user-service.service';
import { User } from '../user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  form!: FormGroup;
  admin: User[] = [];
  editMode = false;
  editedUser: User = new User();

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Ajout du champ email avec validation
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.userService.getAll().subscribe(response => this.admin = response);
  }
  
  ToggleEditMode(user: User): void {
    this.editMode = true;
    this.editedUser = { ...user }; // Make a copy of the user to avoid modifying the original
    this.form.patchValue({
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
 UpdateUser(): void {
  const updatedUser = this.form.value;
  console.log(updatedUser);
  
  // Vérifiez si this.editedUser.id est défini avant de l'utiliser
  if (this.editedUser.id) {
    this.userService.updateUser(updatedUser, this.editedUser.id).subscribe(updatedUser => {
      const index = this.admin.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        this.admin[index] = updatedUser;
      }
      this.cancelEdit();
    });
  } else {
    console.error("L'identifiant de l'utilisateur à mettre à jour est indéfini.");
  }
}

  
  DeleteUser(user: User): void {
    this.userService.deleteUser(user).subscribe(() => {
      this.admin = this.admin.filter(u => u.id !== user.id);
    });
  }

  cancelEdit(): void {
    this.editMode = false;
    this.editedUser = new User();
    this.form.reset();
  }
}
