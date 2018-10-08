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
