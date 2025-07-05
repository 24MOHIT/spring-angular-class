import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  form: any = {
    list: [],
    searchParams: {},
    deleteParams: {},
    preload: [],
    message: '',
    pageNo: 0
  }

  constructor(private httpClient: HttpClient, private router: Router) {
    console.log('in userlist constructor')
  }

  ngOnInit(): void {
    console.log('in userlist ngOnInit')
    this.search();
    this.preload();
  }

  search() {
    this.httpClient.post('http://localhost:8080/User/search/' + this.form.pageNo, this.form.searchParams).subscribe((res: any) => {
      this.form.list = res.result.data;
    })
  }

  next() {
    this.form.pageNo++;
    console.log('pageNo => ', this.form.pageNo)
    this.search();
  }

  previous() {
    this.form.pageNo--;
    console.log('pageNo => ', this.form.pageNo)
    this.search();
  }
   preload() {
    this.httpClient.get('http://localhost:8080/User/preload').subscribe((res: any) => {
      this.form.preload = res.result.roleList;
    });
  }
    onCheckboxChange(userId: number) {
    console.log('Checkbox with ID', userId, 'is checked/unchecked');
    this.form.deleteParams.id = userId;
  }

  delete() {
    this.httpClient.get('http://localhost:8080/User/delete/' + this.form.deleteParams.id).subscribe((res: any) => {
      this.form.message = res.result.message;
      console.log('message => ', this.form.message)
      this.form.pageNo = 0;
      this.search();
    });

  }
   edit(page: any) {
    this.router.navigateByUrl(page);
  }

}