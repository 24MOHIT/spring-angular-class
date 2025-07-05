import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  form: any = {
    data: {},
    message: '',
    inputerror: {}
  }
  constructor(private httpclient: HttpClient) {

  }
  signUp() {
    console.log('form:', this.form)
    this.httpclient.post('http://localhost:8080/Auth/signUp', this.form.data).subscribe((res: any) => {
      console.log('res =>', res)

      this.form.message = '';
      this.form.inputerror = {};

      if (res.result.message) {
        this.form.message = res.result.message;
      }

      if (!res.success) {
        this.form.inputerror = res.result.inputerror;
      }

    })
  }
}
