import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  

  constructor(private scroller: ViewportScroller, private fb: FormBuilder) {
    this.vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    this.vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    this.cForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      msg: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
    })
  }
  get f() {
    return this.cForm.controls
  }

  getPositions():void {
    this.worksSection = document.getElementById('works')
    this.aboutSection = document.getElementById('aboutMe')
    this.contactSection = document.getElementById('contact')
    this.worksPos = this.worksSection.offsetTop
    this.aboutPos = this.aboutSection.offsetTop
    this.contactPos = this.contactSection.offsetTop
    console.log("work está a: ", this.worksPos)
    console.log("about está a: ", this.aboutPos)
    console.log("contact está a: ", this.contactPos)
  }

  ngOnInit(): void {
    this.getPositions()
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
    this.scrollPosition = this.scroller.getScrollPosition()
    console.log(this.scrollPosition[1])
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





}
