import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, SubscribableOrPromise, Subscription } from 'rxjs';
import { DataapiService } from './dataapi.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  myform: FormGroup;
  submitted = false;



  constructor(private formBuilder: FormBuilder, private dataservice: DataapiService) { }

  ngOnInit() {
    this.myform = this.formBuilder.group({
      panNumber: ['', [Validators.required, Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]],
      city: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern("(0/91)?[6-9][0-9]{9}")]],
      otp: ['0000', [Validators.required, Validators.pattern("[0-9]{4}")]]

    });



  }
  title = 'assmform';
  data
  mobil
  Fullname
  get f() { return this.myform.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.myform.invalid) {
      return;
    }
    this.data = JSON.stringify(this.myform.value)
    this.dataservice.sendservice(this.data).subscribe(
      res => {
        console.log(res);
        Swal.fire('OTP Send Successfully')

      },
      err => {
        console.log(err);
      }
    )
  }
  onSubmitresend() {
    this.submitted = true;
    this.data = JSON.stringify(this.myform.value)
    this.dataservice.sendservice(this.data).subscribe(
      res => {
        console.log(res);
        Swal.fire('OTP Resend Successfully')
      },
      err => {
        console.log(err);
      }
    )

    this.myform.setValue({
      panNumber: this.myform.get('panNumber').value,
      city: this.myform.get('city').value,
      fullname: this.myform.get('fullname').value,
      email: this.myform.get('email').value,
      mobile: this.myform.get('mobile').value,
      otp: ''

    })

    this.getotp = true;
    this.otptxt = false;
    this.resend = false;
    this.verify = false;
    this.resenddisable = true;
    const second = interval(1000);
    this.resendtime = second.subscribe(res => {


      if (res >= 3) {
        this.resendtime.unsubscribe();
        this.resenddisable = false;



      }
    })
    this.c++;


  }


  //counting resend button click and making it disable after each 3 minutes
  c: number = 0;
  count2: number = 0;
  public getotp: boolean = false;
  public otptxt: boolean = true;
  public resend: boolean = true;
  public resenddisable: boolean = false;
  public verify: boolean = true;
  showmsg: boolean = false;
  showmsg2: boolean = false;

  resendtime: Subscription;



  submitotp() {


    this.onSubmit();
    this.myform.setValue({
      panNumber: this.myform.get('panNumber').value,
      city: this.myform.get('city').value,
      fullname: this.myform.get('fullname').value,
      email: this.myform.get('email').value,
      mobile: this.myform.get('mobile').value,
      otp: ''

    })

    this.getotp = true;
    this.otptxt = false;
    this.resend = false;
    this.verify = false;
    this.resenddisable = true;
    const second = interval(180000);
    this.resendtime = second.subscribe(res => {


      if (res >= 3) {
        this.resendtime.unsubscribe();
        this.resenddisable = false;
      }
    })
    this.c++;


  }
  resendButtonDisabledFunction() {
    this.resenddisable = true;
  }

  verifyotp() {
    this.mobil = {
      mobile: this.myform.get('mobile').value,
      otp: this.myform.get('otp').value
    }

    this.dataservice.sendservice(this.mobil).subscribe(
      res => {
        console.log(res);
        if (res.statusCode === 200) {
          this.Fullname = this.myform.get('fullname').value;
          this.resend = true;
          this.verify = true;
          this.resenddisable = false;
          this.submitted = false;
          this.c = 0;

          Swal.fire(
            'Thank you for verification!',
            this.Fullname,
            'success'
          )
          this.myform.reset({});
          this.otptxt = false;

        }
        else {
          this.showmsg2 = true;
        }
      },
      err => {
        console.log(err);
      }
    )

  }


  closemsg2() {
    this.showmsg2 = false;
  }


}
