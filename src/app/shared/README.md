# Shared Module
Le module `SharedModule` contient les components, pipes/filters and services should go réutiliser plusieurs fois à travers l'application web. Le module peut être importé par n'importe quel autre module dans le but d'être réutilisé. Ce module ne doit pas avoir de dépendance vers d'autre module de l'application.
```
|-- shared
     |-- [+] components
     |-- [+] directives
     |-- [+] pipes
     |-- [+] models
```
## Components folder
Le dossier `components` doit contenir tous les `component` partagé dans l'application. Comme par example des loaders, buttons etc.
```
|-- components
     |-- loader
          |-- loader.component.ts|html|scss
     |-- buttons
          |-- favorite-button
               |-- favorite-button.component.ts|html|scss
          |-- collapse-button
               |-- collapse-button.component.ts|html|scss
```
## Directives, Pipes, Models folder
Les dossiers `directives` , `pipes` and `models` contiennent les directives, pipes and models utilisé à travers l'application.
```
|-- directives
      |-- auth.directive.ts

|-- pipes
     |-- capitalize.pipe.ts
     |-- safe.pipe.ts

|-- models
     |-- user.model.ts
     |-- server-response.ts
```
