import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mt-website';
  vh: number = 0
  vw: number = 0
  scrollPosition: any
  worksSection: any
  worksPos: number = 0
  aboutSection: any
  aboutPos: number = 0
  contactSection: any
  contactPos: number = 0
  top:any;
  left:any;
  expand=false;

  constructor(private scroller: ViewportScroller) {
    this.vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    this.vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  }

ngOnInit():void{
  this.getPositions()
}

@HostListener('document:click', ['$event'])
onClick($event: any) {
   this.expand=true;
   setTimeout(() => {
    this.expand=false;
   }, 500)
}

@HostListener('document:mousemove', ['$event'])
onMousemove($event: { pageY: number; pageX: number; }) {
  this.top=($event.pageY - 10)+ "px";
  this.left= ($event.pageX - 10)+ "px";
}

  printvh() {
    this.scrollPosition = this.scroller.getScrollPosition()
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


  getPositions() {
    this.worksSection = document.getElementById('works')
    this.worksPos = this.worksSection.offsetTop
    this.aboutSection = document.getElementById('aboutMe')
    this.aboutPos = this.aboutSection.offsetTop
    this.contactSection = document.getElementById('contact')
    this.contactPos = this.contactSection.offsetTop
    console.log("work está a: ", this.worksPos)
    console.log("about está a: ", this.aboutPos)
    console.log("contact está a: ", this.contactPos)
  }


}
