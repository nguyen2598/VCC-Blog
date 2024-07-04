# Hướng dẫn sử dụng Core Angular

<https://tech-team-s0osj9zh.atlassian.net/wiki/spaces/TR/pages/27623426>

* * *

## **I. Install Project**

1. **Install the latest version of Angular.**

* `npm install -g @angular/cli`

2. **Install the other versions.**

* `npm install -g @angular/cli@^name_version`
* ex: `npm install -g @angular/cli@^16`

3. **Project initialization.**

* `ng new name_project`

4. **Run project.**

* `ng serve`: The default project will run on port 4200 <`http://localhost:4200/`>
* `ng serve --port=other_port` : If you want to run the project on another port, you just need to add parameters.

5. **Create a component.**

* `ng generate component name_your_component`
* `ng g c name_your_component`

6. **Create a service.**

* `ng generate service name_your_service`
* `ng g s name_your_service`

7. **Create a interface.**

* `ng generate interface name_interface`
* `ng g i name_interface`

8. **Create a new module.**

* `ng generate module name_module --routing`

## **II. Workflow**

![module.jpg](https://tech-team-s0osj9zh.atlassian.net/wiki/download/thumbnails/27623426/module.jpg?version=3&modificationDate=1719069939643&cacheVersion=1&api=v2&width=494&height=452)

* **Modules:** Là một nhóm các thành phần liên quan với nhau, bao gồm các components, services và các tài nguyên khác, và được sử dụng để tổ chức ứng dụng thành các phần nhỏ hơn và dễ quản lý hơn.

_Cấu trúc:_

```
app/                                          # module
├── components/                       
│   ├── user-page/                            # component  
│   │   ├── ...
│   │   ├── user.module.html                  # template
│   │   ├── services/                         # service
│   │   │   ├── ...
│   ├── .../  
├── app-routing.module.ts                     # router
├── app.module.ts                             # import các component ở trong file này
├── ...
```

_Example_: `app.module.ts`

```
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    AppRoutingModule,
    // Components
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

* **Routing:** Là cơ chế để điều hướng giữa các view và các thành phần trong ứng dụng Angular, cho phép người dùng điều hướng giữa các trang và chức năng của ứng dụng mà không cần tải lại toàn bộ trang.

_Cấu trúc:_

```
app/           
├── .../                       
├── app-routing.module.ts      
```

_Example:_ `app-routing.module.ts`

```
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
  
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserPageComponent
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

* **Components:** Là một phần tử UI cụ thể trong ứng dụng Angular, bao gồm 1 lớp TS và 1 template HTML

_Cấu trúc:_

```
├── user-page/                            # a component
│   ├── user-page.component.html          # a template
│   ├── user-page.component.ts         
│   ├── ... 
│   ├── services/                         # service
│   │   ├── user-page.service.html
│   │   ├── ...
```

_Example:_ `user-page.component.ts`

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})

export class UserPageComponent {
  //
  // your code
  //
}
```

* **Templates:** Định nghĩa giao diện người dùng của component đó bằng cách sử dụng HTML

_Example:_ `user-page.component.html`

```
<h1>Hello World</h1>
```

* **Services:** Được sử dụng để chia sẻ dữ liệu hoặc logic xử lý giữa các thành phần khác nhau của ứng dụng.

_Example:_ `user-page.service.ts`

```
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserPageService {
  //
  // your code
  //
}
```

* _**Cấu trúc thư mục của project:**_

```
app/                                          # file chính
├── pages/                       
│   ├── user-page/                            # a component
│   │   ├── user-page.component.html          # a template
│   │   ├── user-page.component.ts         
│   │   ├── ... 
│   │   ├── services/                         # service
│   │   │   ├── user-page.service.html
│   │   │   ├── ...
│   ├── .../   
├── .../  
├── app-routing.module.ts                     # router
├── app.module.ts                             # import các component ở trong file này
├── ...
```

## **III. Quy tắc đặt tên**

### 1. File

### 2. Các thành phần (components, services, routing, modules)

### 3. Class