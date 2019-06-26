import {Component} from '@angular/core';
import {routes} from '../app-routing.module';


@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
    appRoutes: { title: any; url: string }[];

    constructor() {
        this.appRoutes = routes.filter(route => route.component)
            .map(route => ({
                title: route.data.title,
                url: `/${route.path}`
            }));
    }
}
