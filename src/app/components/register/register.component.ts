import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) { }

  registerForm = this.fb.group({ //group
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],  //array
    email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9@.]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })
  //control passes through html

  register() {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;
      console.log(username, email, password);

      const user = { username, email, password }
      this.api.register(user).subscribe({
        next: (res: any) => {
          // alert("user registration successful")

          Swal.fire({
            title: 'Success!',
            text: 'User Registration Successful',
            icon: 'success',
            confirmButtonText: 'Back'
          })
          this.router.navigateByUrl('/user/login')
        },
        error: (err) => {
          // alert("error message")
console.log(err);

          if(err.status === 404){
            Swal.fire({
              title: 'Error!',
              text: 'error',
              icon: 'error',
              confirmButtonText: 'Back'
            })
          }
          else{
            Swal.fire({
              title: 'Error!',
              text: 'Register Failed',
              icon: 'error',
              confirmButtonText: 'Back'
            })
          }
        }
      })
    } else {
      alert("invalid register form")
    }
  }
}
