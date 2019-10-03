import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Post} from '../post.model';
import {NgForm} from '@angular/forms';
import {PostsService} from '../posts.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  isLoading = false;
  private postId: string;
  public post: Post;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        if (paramMap.has('id')) {
          this.mode = 'edit';
          this.postId = paramMap.get('id');
          this.isLoading=true;
          this.postsService.getPost(this.postId).subscribe(postData => {
            this.isLoading=false;
            this.post = {id: postData._id, title: postData.title, content : postData.content};
            console.log('reached here');
          });
        } else {
          this.mode = 'create';
        }
      }
    );

  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    console.log('ON Click of Submit');
    // const post: Post = {
    //   title : form.value.title,
    //   content : form.value.content
    // };
    // this.postCreated.emit(post);
    if (this.mode ===  'create') {
      console.log('create mode');
      console.log(form.value.title, form.value.content);
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      console.log('update mode');
      this.postsService.updatePost(this.postId , form.value.title, form.value.content);
    }
    form.resetForm();
  }


}
