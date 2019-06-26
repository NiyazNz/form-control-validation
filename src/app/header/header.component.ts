import {Component, Input} from '@angular/core';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() projectName: string;
    @Input() repository: string;
    @Input() npmUrl: string;

    constructor() {
    }

}
