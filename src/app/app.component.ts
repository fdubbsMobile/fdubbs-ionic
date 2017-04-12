import {Component, ViewChild} from "@angular/core";
import {Nav, Platform} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {InAppBrowser} from "@ionic-native/in-app-browser";

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = HomePage;
  pages: Array<{ heading: string, items: any[] }> = [
    {
      heading: 'Weather',
      items: [
        {title: 'Home', component: HomePage, icon: 'home'},
        {title: 'World', component: HomePage, icon: 'globe'}
      ]
    },
    {
      heading: 'Settings',
      items: [
        {title: 'Settings', component: HomePage, icon: 'settings'}
      ]
    }
  ];

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public inAppBrowser: InAppBrowser) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString("#12121c");
      this.splashScreen.hide();
    });
  }

  openPage(page: any) {
    if (this.isActive(page)) {
      return;
    }
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      this.nav.setRoot(page.component);
    }
  }

  isActive(page: any): boolean {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return true;
      }
      return false;
    }

    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return true;
    }
    return false;
  }

  about() {
    this.inAppBrowser.create('http://www.hidennis.tech', '_system');
  }
}

