import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../user-service.service";
import { User } from "../user";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  save() {
    const userData: User = this.form.value;
    this.userService.signup(userData).subscribe(
      (response: any) => {
        console.log(response);
        this.successMessage = "Signup successfully!";
        this.errorMessage = null;
      },
      (error: any) => {
        console.error(error);
        if (error.status === 409) { // Assuming 409 Conflict for duplicate email
          this.errorMessage = "Email already exists.";
        } else {
          this.errorMessage = "An error occurred. Please try again.";
        }
        this.successMessage = null;
      }
    );
  }
}
