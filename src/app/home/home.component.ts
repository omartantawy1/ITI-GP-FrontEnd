import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { tns } from 'tiny-slider/src/tiny-slider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  constructor(private router: Router) { }


  @ViewChild('testimonialSlider', { static: true }) sliderElement!: ElementRef;

  private slider: any; // Store the slider instance
  value: number=0;

  ngOnInit() {
    this.initializeSlider();
  }
  

  private initializeSlider() {
    tns({
      container: '.testimonial-slider',
      items: 1,
      axis: "horizontal",
      controlsContainer: "#testimonial-nav",
      swipeAngle: false,
      speed: 700,
      nav: false,
      controls: true,
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 2500,
      autoplayButtonOutput: false,
      controlsText: ['', ''], 
  
      // onInit callback to hide the live region
    
    });
  }

  

  onPrevClick() {
    this.slider.goTo('prev');
  }


  onNextClick() {
    this.slider.goTo('next');
  }

  increaseValue() {
    this.value = isNaN(this.value) ? 0 : this.value;
    this.value++;
  }

  decreaseValue() {
    this.value = isNaN(this.value) ? 0 : this.value;
    if (this.value > 0) this.value--;
  }

  
  navigateToSignUp() {
    this.router.navigate(['sign-up']); 
  }

  navigateToWorkspace() {
    this.router.navigate(['/workspace']);
  }


}