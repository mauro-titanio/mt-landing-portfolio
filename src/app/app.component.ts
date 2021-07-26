import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Message } from './shared/models/message';
import { CrudService } from './shared/services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cForm: FormGroup
  vh: number = 0
  vw: number = 0
  scrollPosition = [0, 0]
  worksSection: any
  worksPos: number = 0
  aboutSection: any
  aboutPos: number = 0
  contactSection: any
  contactPos: number = 0
  top: any;
  left: any;
  expand = false
  scrollPercent: number = 0
  msg: Message | undefined
  mSent = false
  loading = true

  constructor(private scroller: ViewportScroller, private fb: FormBuilder, private crud: CrudService, private spinner: NgxSpinnerService) {
    this.vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    this.vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    this.cForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
    })
  }
  get f() {
    return this.cForm.controls
  }

  getPositions(): void {
    this.worksSection = document.getElementById('works')
    this.aboutSection = document.getElementById('aboutMe')
    this.contactSection = document.getElementById('contact')
    this.worksPos = this.worksSection.offsetTop
    this.aboutPos = this.aboutSection.offsetTop
    this.contactPos = this.contactSection.offsetTop
  }

  ngOnInit(): void {
   this.spinner.show()
   setTimeout(() => {
     this.spinner.hide()
     this.loading = false
     this.getPositions()
   }, 3000);
    setTimeout(() => {
      this.getPositions()
    }, 2000);

  }


  @HostListener('document:click', ['$event'])
  onClick($event: any) {
    this.expand = true;
    setTimeout(() => {
      this.expand = false;
    }, 500)
  }

  @HostListener('document:mousemove', ['$event'])
  onMousemove($event: { pageY: number; pageX: number; }) {
    this.top = ($event.pageY - 10) + "px";
    this.left = ($event.pageX - 10) + "px";
  }

  printvh() {
    /*  let scrollTop = window.scrollY;
      let docHeight = document.body.offsetHeight;
      let winHeight = window.innerHeight;
      let scrollPercent = scrollTop / (docHeight - winHeight);
      this.scrollPercent = Math.round(scrollPercent * 100);*/
    this.scrollPosition = this.scroller.getScrollPosition()
    if (this.scrollPosition[1] < this.worksPos) {
      this.scrollPercent = 0
    }
    if (this.scrollPosition[1] >= (this.worksPos - 250) && this.scrollPosition[1] < (this.aboutPos - 450)) {
      this.scrollPercent = 33
    }
    if (this.scrollPosition[1] >= (this.aboutPos - 250) && this.scrollPosition[1] < (this.contactPos - 450)) {
      this.scrollPercent = 66
    }
    if (this.scrollPosition[1] >= (this.contactPos - 250)) {
      this.scrollPercent = 99
    }
  }

  scrollToWorks() {
    this.getPositions()
    setTimeout(() => {
      this.scroller.scrollToAnchor('works')
    }, 500);
  }

  scrollToAbout() {
    this.getPositions()
    setTimeout(() => {
      this.scroller.scrollToAnchor('aboutMe')
    }, 500);
  }

  scrollToContact() {
    this.getPositions()
    setTimeout(() => {
      this.scroller.scrollToAnchor('contact')
    }, 500);
  }

  sendMessage() {
    const m: Message = {
      date: new Date().toDateString(),
      name: this.f.name.value,
      email: this.f.email.value,
      msg: this.f.message.value
    }
    if (this.cForm.invalid) {
      return
    }
    this.crud.newMessage(m).then(success => {
      this.mSent = true
    }).catch(error => {
      console.log("Error", error)
    })
  }

  scrollTop() {
    window.scrollTo(0, 0)
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }


}
