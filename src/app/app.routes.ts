import {Route} from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'chat',
        loadComponent: () =>
            import('./pages/chat-page/chat-page.component').then(
                c => c.ChatPageComponent,
            ),
    },
    {
        path: '**',
        redirectTo: 'chat',
    },
];
