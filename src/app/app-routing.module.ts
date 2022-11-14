import { NgModule, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule, Routes, TitleStrategy, RouterStateSnapshot } from '@angular/router';

// Layouts
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { ExampleLayoutComponent } from './_layout/example-layout/example-layout.component';

// Component
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// Example Components
import { Example1Component } from './examples/example1/example1.component';

// Routers
const routes: Routes = [

  // Site Home Layout
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full', title: 'Home Page' },
    ]
  },

  // Site Example Layout
  {
    path: 'example',
    component: ExampleLayoutComponent,
    children: [
      { path: '1', component: Example1Component, pathMatch: 'full', title: 'Example - 1' },
    ]
  },
  // Page Not Found
  { path: '**', component: PageNotFoundComponent },
  // otherwise redirect to home
  // { path: '**', redirectTo: '' }
];

/**
 * Set Custom Title
 */
@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`${title} | Angular Material 14`);
    }
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: TemplatePageTitleStrategy }],
})
export class AppRoutingModule {}
