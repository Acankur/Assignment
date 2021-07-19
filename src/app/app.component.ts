import { Component } from '@angular/core';
import { Post} from '../app/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedPosts: Post[] = [];
  title = 'assignment';
  

  ngOnInit() {
    localStorage.setItem('postId', "NaN");
  }
  
  onPostAdded(post) {
    this.storedPosts.push(post);
  }
}
