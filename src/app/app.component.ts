import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, pluck} from 'rxjs/operators';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    projectName = '@enzedd/form-control-validation';
    repository = 'https://gitlab.com/Enzedd/form-control-validation';
    sourceUrlBase = 'https://gitlab.com/Enzedd/form-control-validation/tree/master/src/app/';
    npmUrl = `https://www.npmjs.com/package/${this.projectName}`;
    title: string;
    exampleSourceUrl: string;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {
    }

    ngOnInit() {
        this.setTitle();
    }

    private setTitle() {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.activatedRoute),
                map((route) => {
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                }),
                filter((route) => route.outlet === 'primary'),
                pluck('snapshot', 'data')
            )
            .subscribe((event: { title: string, fileName: string }) => {
                this.title = event.title;
                this.titleService.setTitle(this.title);

                this.exampleSourceUrl = `${this.sourceUrlBase}${event.fileName}`;
            });
    }

}
