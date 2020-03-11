import { Component, OnInit, ViewChild, EventEmitter, ElementRef, Output } from '@angular/core';
import { PostModel } from '../../models/post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-modal-post',
  templateUrl: './modal-post.component.html',
  styleUrls: ['./modal-post.component.scss'],
})
export class ModalPostComponent implements OnInit {

  @Output() createPost = new EventEmitter();

  bodyPost: PostModel;
  loading = false;
  constructor(private postSvc: PostService) { }

  ngOnInit() {

    this.bodyPost = new PostModel();

  }

  onSubmitPost( frmPost: NgForm ) {

    if (frmPost.valid) {

      this.loading = true;

      this.postSvc.onAddPost( this.bodyPost ).subscribe( (res: any) => {
        if (!res.ok) {
          throw new Error( res.error );
        }

        console.log(res);

        this.loading = false;
        document.getElementById('btnCloseModalPost').click();
        console.log('submit');
        this.createPost.emit();
      });

    }

  }

  onResetForm(frmPost: NgForm) {

    frmPost.reset();
    this.bodyPost = new PostModel();

  }

}
