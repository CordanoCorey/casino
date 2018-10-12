import { Component, OnInit, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { build, Image, truthy, SmartComponent } from '@caiu/library';
import { Store } from '@ngrx/store';

@Component({
  selector: 'casino-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent extends SmartComponent implements OnInit {

  @Input() backgroundImage: string;
  @Input() showHelp = true;
  _hasWallpaper = false;

  constructor(
    public store: Store<any>,
    public dialog: MatDialog) {
    super(store);
  }

  @Input() set hasWallpaper(value: boolean) {
    this._hasWallpaper = value;
  }

  get hasWallpaper(): boolean {
    return this._hasWallpaper && !this.mobile;
  }

  get hasBackgroundImage(): boolean {
    return truthy(this.backgroundImage) && !this.hasWallpaper;
  }

  get images(): Image[] {
    return [
      build(Image, { src: 'assets/julz-1.jpg', height: 1296, width: 1944 }),
      build(Image, { src: 'assets/julz-2.jpg', height: 1000, width: 1500 }),
      build(Image, { src: 'assets/julz-3.jpg', height: 960, width: 640 }),
      build(Image, { src: 'assets/julz-4.jpg', height: 946, width: 1419 }),
      build(Image, { src: 'assets/julz-5.jpg', height: 801, width: 1209 }),
      build(Image, { src: 'assets/julz-6.jpg', height: 816, width: 1232 }),
      build(Image, { src: 'assets/julz-7.jpg', height: 816, width: 1232 }),
      build(Image, { src: 'assets/julz-8.jpg', height: 960, width: 720 }),
      build(Image, { src: 'assets/julz-9.jpg', height: 960, width: 720 }),
      build(Image, { src: 'assets/julz-10.jpg', height: 960, width: 720 }),
      build(Image, { src: 'assets/julz-11.jpg', height: 960, width: 956 }),
      build(Image, { src: 'assets/julz-12.jpg', height: 960, width: 720 }),
      build(Image, { src: 'assets/julz-13.jpg', height: 960, width: 720 }),
      build(Image, { src: 'assets/julz-14.jpg', height: 960, width: 720 }),
      build(Image, { src: 'assets/julz-15.jpg', height: 720, width: 960 }),
      build(Image, { src: 'assets/julz-16.jpg', height: 720, width: 960 }),
      build(Image, { src: 'assets/julz-17.jpg', height: 960, width: 720 }),
      build(Image, { src: 'assets/julz-18.jpg', height: 934, width: 960 }),
      build(Image, { src: 'assets/julz-19.jpg', height: 720, width: 960 }),
      build(Image, { src: 'assets/julz-20.jpg', height: 720, width: 960 }),
      build(Image, { src: 'assets/julz-21.jpg', height: 1031, width: 1227 }),
      build(Image, { src: 'assets/julz-22.jpg', height: 960, width: 828 }),
      build(Image, { src: 'assets/julz-23.jpg', height: 960, width: 834 }),
      build(Image, { src: 'assets/julz-24.jpg', height: 960, width: 540 }),
      build(Image, { src: 'assets/julz-25.jpg', height: 540, width: 960 }),
      build(Image, { src: 'assets/julz-26.jpg', height: 720, width: 960 }),
      build(Image, { src: 'assets/julz-27.jpg', height: 931, width: 877 }),
      build(Image, { src: 'assets/julz-28.jpg', height: 4464, width: 2977 }),
      build(Image, { src: 'assets/julz-29.jpg', height: 960, width: 960 }),
      build(Image, { src: 'assets/julz-30.jpg', height: 540, width: 960 }),
      build(Image, { src: 'assets/julz-31.jpg', height: 960, width: 727 }),
      build(Image, { src: 'assets/julz-32.jpg', height: 960, width: 960 }),
      build(Image, { src: 'assets/julz-33.jpg', height: 960, width: 720 }),
      build(Image, { src: 'assets/julz-34.jpg', height: 960, width: 720 }),
      build(Image, { src: 'assets/julz-35.jpg', height: 720, width: 960 }),
      build(Image, { src: 'assets/julz-36.jpg', height: 960, width: 528 }),
      build(Image, { src: 'assets/julz-37.jpg', height: 540, width: 960 }),
      build(Image, { src: 'assets/julz-38.jpg', height: 480, width: 330 }),
      build(Image, { src: 'assets/julz-39.jpg', height: 480, width: 640 }),
      build(Image, { src: 'assets/julz-40.jpg', height: 960, width: 717 }),
      build(Image, { src: 'assets/julz-41.jpg', height: 612, width: 612 }),
      build(Image, { src: 'assets/julz-42.jpg', height: 1370, width: 2048 }),
      build(Image, { src: 'assets/julz-43.jpg', height: 640, width: 480 }),
      build(Image, { src: 'assets/julz-44.jpg', height: 960, width: 640 }),
      build(Image, { src: 'assets/julz-45.jpg', height: 720, width: 960 }),
      build(Image, { src: 'assets/julz-46.jpg', height: 720, width: 480 }),
      build(Image, { src: 'assets/julz-47.jpg', height: 480, width: 720 }),
      build(Image, { src: 'assets/julz-48.jpg', height: 540, width: 720 }),
      build(Image, { src: 'assets/julz-49.jpg', height: 720, width: 528 }),
      build(Image, { src: 'assets/julz-50.jpg', height: 2880, width: 1920 }),
      build(Image, { src: 'assets/julz-51.jpg', height: 2880, width: 1920 }),
      build(Image, { src: 'assets/julz-52.jpg', height: 1861, width: 2791 }),
      build(Image, { src: 'assets/julz-53.jpg', height: 206, width: 309 }),
      build(Image, { src: 'assets/julz-54.jpg', height: 604, width: 453 }),
      build(Image, { src: 'assets/julz-55.jpg', height: 402, width: 604 }),
      build(Image, { src: 'assets/julz-56.jpg', height: 604, width: 453 }),
      build(Image, { src: 'assets/julz-57.jpg', height: 453, width: 604 }),
      build(Image, { src: 'assets/julz-58.jpg', height: 453, width: 604 }),
      build(Image, { src: 'assets/julz-59.jpg', height: 453, width: 604 }),
      build(Image, { src: 'assets/julz-60.jpg', height: 453, width: 604 }),
      build(Image, { src: 'assets/julz-61.jpg', height: 453, width: 604 }),
      build(Image, { src: 'assets/julz-62.jpg', height: 453, width: 604 }),
      build(Image, { src: 'assets/julz-63.jpg', height: 536, width: 720 }),
    ];
  }

  get contentWidth(): number {
    return this.windowWidth - this.offsetLeft;
  }

  get mobile(): boolean {
    return this.windowWidth < 1000;
  }

  get offsetLeft(): number {
    return 0;
  }

  get offsetTop(): number {
    return 0;
  }

  get menuWidth(): number {
    return this.windowWidth;
  }

  get windowHeight(): number {
    return parseInt(localStorage.getItem('WINDOW_HEIGHT'), 10) - 64;
  }

  set windowHeight(value: number) {
    localStorage.setItem('WINDOW_HEIGHT', value.toString());
  }

  get windowWidth(): number {
    return parseInt(localStorage.getItem('WINDOW_WIDTH'), 10);
  }

  set windowWidth(value: number) {
    localStorage.setItem('WINDOW_WIDTH', value.toString());
  }

  ngOnInit() {
    this.windowHeight = parseInt(localStorage.getItem('WINDOW_HEIGHT'), 10);
    this.windowWidth = parseInt(localStorage.getItem('WINDOW_WIDTH'), 10);
  }

  @HostListener('window:load', ['$event'])
  onLoad(e: any) {
    this.windowHeight = e && e.currentTarget && e.currentTarget.innerHeight ? e.currentTarget.innerHeight : 0;
    this.windowWidth = e && e.currentTarget && e.currentTarget.innerWidth ? e.currentTarget.innerWidth : 0;
    // console.log('\n\nwindow:load', this.windowWidth, this.windowHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize(e: any) {
    this.windowHeight = e && e.currentTarget && e.currentTarget.innerHeight ? e.currentTarget.innerHeight : 0;
    this.windowWidth = e && e.currentTarget && e.currentTarget.innerWidth ? e.currentTarget.innerWidth : 0;
    // console.log('\n\nwindow:resize', this.windowWidth, this.windowHeight);
  }

}
