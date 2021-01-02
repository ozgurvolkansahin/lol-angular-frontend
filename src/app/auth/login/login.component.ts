import { Component, OnInit } from '@angular/core';
import { NbLoginComponent, NbAuthResult } from '@nebular/auth';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends NbLoginComponent implements OnInit {

  ngOnInit(): void {
    this.service.isAuthenticated().subscribe(result => {
      if (result) {
        this.router.navigate(['pages/dashboard']);
      }
    });
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.redirectDelay = 100;
    console.log('resultr');
    const body = JSON.parse(JSON.stringify(this.user));
    this.service.authenticate(this.strategy, body).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      this.messages = result.getMessages();
      if (result.getResponse().status === 200) {
        const redirect = result.getRedirect();
        if (redirect) {
          setTimeout(() => {
            return this.router.navigateByUrl(redirect);
          }, this.redirectDelay);
        }
      } else {
        this.errors = result.getErrors();
      }
      this.cd.detectChanges();
    });
  }


}
