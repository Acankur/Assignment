import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
	{
		path: '',
		component: PostsComponent,
		data: { title: 'Images' }
	},
	{
		path: 'new',
		component: PostCreateComponent,
		data: {title: 'Add Image' }
	},
	{
		path: 'show/:id',
		component: PostListComponent,
		data: { title: 'Show Cards' }
	}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
