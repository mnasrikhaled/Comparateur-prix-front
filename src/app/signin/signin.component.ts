import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../user-service.service";
import { User } from "../user";
import { AuthServiceService } from "../auth-service.service";
import { WishlistService } from '../wishlist.service';  // Import WishlistService

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  returnUrl: string = '';

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    if (this.form.valid) {
      const userData: User = this.form.value;
      if (userData.username === 'admin' && userData.password === 'PASSWORD@001') {
        // Navigate to admin interface if username and password match
        this.router.navigate(['/admin']);
      } else {
        // Proceed with sign-in process
        this.userService.signin(userData).subscribe(
          (response: any) => {
            console.log(response);
            localStorage.setItem('username', response.username);
            localStorage.setItem('idUser', response.id);
            this.authservice.updateLoggedInStatus(true);
            this.authservice.login(response.username, response.id);
            // Redirect to the returnUrl or default to home page
            const redirectUrl = this.returnUrl;
            this.router.navigate([redirectUrl]);
            this.successMessage = 'Sign in successfully';
            this.errorMessage = null;
          },
          (error: any) => {
            console.error(error);
            this.errorMessage = 'Username or password invalid';
            this.successMessage = null;
          }
        );
      }
    } else {
      console.log('Formulaire invalide');
      this.form.markAllAsTouched();
      this.errorMessage = 'Form is invalid';
      this.successMessage = null;
    }
  }
}
