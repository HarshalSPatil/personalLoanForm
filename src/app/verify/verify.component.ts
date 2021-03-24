import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, SubscribableOrPromise, Subscription, timer } from 'rxjs';
import { VservService } from './vserv.service'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {


  myform: FormGroup;
  c: number = 0;
  count2: number = 0;
  public getotp: boolean = false;
  public otptxt: boolean = true;
  public resend: boolean = true;
  public resenddisable: boolean = false;
  public verify: boolean = true;

  resendtime: Subscription;




  constructor(private formBuilder: FormBuilder, private dataservice: VservService) { }

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

  data
  mobil
  Fullname

  get f() { return this.myform.controls; }

  onSubmit() {
  

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


      if (res >= 180) {
        this.resendtime.unsubscribe();
        this.resenddisable = false;



      }
    })
    this.c++;


  }


  

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
    const second = interval(1000);
    this.resendtime = second.subscribe(res => {


      if (res >= 180) {
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

    this.dataservice.sendverify(this.mobil).subscribe(
      res => {
        console.log(res);
        if (res.statusCode === 200) {
          this.Fullname = this.myform.get('fullname').value;
          this.resend = true;
          this.verify = true;
          this.resenddisable = false;
          this.c = 0;
          this.otptxt = true;
          this.getotp=false;
          this.myform.reset({
            panNumber:'',
            city: '',
            fullname: '',
            email: '',
            mobile: '',
            otp: '0000'
      
          })
      
       Swal.fire(
            'Thank you for verification!',
             this.Fullname,
            'success'
          )
        
        }
        else {
        
        }
      },
      err => {
        console.log(err);
      }
    )

  }


  

}
