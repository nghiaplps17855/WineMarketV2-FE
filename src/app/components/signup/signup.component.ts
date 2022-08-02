import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user.entity';
import { UserService } from 'src/app/service/user/user.service';
import { MessageService } from 'src/app/service/utils/message.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  user: User;
  signupForm: FormGroup = new FormGroup({
    Username: new FormControl,
    Email: new FormControl,
    Password: new FormControl,
    Repassword: new FormControl
  })
  constructor(private messageService: MessageService, private userService: UserService, private route: Router) { }

  ngOnInit(): void {
  }

  onSignup(){
    if (this.signupForm.controls['Password'].value === this.signupForm.controls['Repassword'].value) {
      this.user = new User('',this.signupForm.controls['Username'].value, this.signupForm.controls['Repassword'].value, this.signupForm.controls['Email'].value, 'null.png', false)
      this.userService.signup(this.user).subscribe(
        data => {
          this.messageService.showSuccess('Signup success. Please login.')
          this.route.navigate(['/login'])
        },
        error => {
          this.messageService.showError('Signup Failed. Please check Email and Username')
        }
      )
    } else {
      this.messageService.showError('SignUp failed. Password and Repassword does not match.')
    }
    
  }

}
