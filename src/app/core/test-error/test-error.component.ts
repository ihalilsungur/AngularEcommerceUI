import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {

  public baseUrl = environment.apiUrl;
  public validationError:any;
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
  public get400ValidationError() {
    this.httpClient.get(this.baseUrl + 'products/fortywto').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      this.validationError=error.errors.id;
    });
  }
  public get400Error() {
    this.httpClient.get(this.baseUrl + 'buggy/servererror').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
  public get404Error() {
    this.httpClient.get(this.baseUrl + 'buggy/badrequest').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
  public get500Error() {
    this.httpClient.get(this.baseUrl + 'buggy/servererror').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}
