import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Notedata } from 'src/app/core/interface/notedata';
import { NotesService } from 'src/app/core/service/notes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  constructor(
    private _NotesService: NotesService,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  notes: Notedata[] = [];
  noteData: any = {};
  searchValue: string = '';
  isloading: boolean = false;

  ngOnInit(): void {
    this.isloading = true;
    this._NotesService.getNotes().subscribe({
      next: (response) => {
        // console.log(response); //^ for test
        console.log((this.notes = response.notes)); //^ for test
        this.isloading = false;
      },
      error: (error) => {
        console.log(error); //^ for test
        this.isloading = false;
      },
    });
  }

  noteForm: FormGroup = new FormGroup({
    title: new FormControl(null),
    content: new FormControl(null),
  });

  editNoteForm: FormGroup = new FormGroup({
    title: new FormControl(null),
    content: new FormControl(null),
  });

  openModal(): void {
    const control1 = this.noteForm.get('title') as FormControl;
    control1.setValue('');

    const control2 = this.noteForm.get('content') as FormControl;
    control2.setValue('');
  }

  handleForm(): void {
    this.isloading = true;
    console.log(this.noteForm.value); //^ just for test
    this._NotesService.addNote(this.noteForm.value).subscribe({
      next: (response) => {
        // console.log(response); //^ just for test

        this.ngOnInit();
        this.isloading = false;
      },
      error: (error) => {
        console.log(error); //^ just for test
        this.isloading = false;
      },
    });
  }

  handleDelete(id: string, index: number): void {
    this.isloading = true;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        }).then(() => {
          this._NotesService.deleteNote(id).subscribe({
            next: (response) => {
              console.log(response); //^ for test
              if (response.msg === 'done') {
                this.notes.splice(index, 1);
                this.ngOnInit();
                this.isloading = false;
              }
            },
            error: (error) => {
              console.log(error); //^ for test
              this.isloading = false;
            },
          });
        });
      }
    });
  }

  getNoteData(note: Notedata): void {
    this.noteData = note;
    console.log(this.noteData); //^ just for test

    const control1 = this.editNoteForm.get('title') as FormControl;
    control1.setValue(this.noteData.title);

    const control2 = this.editNoteForm.get('content') as FormControl;
    control2.setValue(this.noteData.content);
  }

  handleUpdate(): void {
    // console.log(this.editNoteForm.value); //^ for test

    this.isloading = true;
    this._NotesService
      .udpateNote(this.editNoteForm.value, this.noteData._id)
      .subscribe({
        next: (response) => {
          console.log(response); //^ for test
          this.ngOnInit();
          this.isloading = false;
        },
        error: (error) => {
          console.log(error); //^ for test
          this.isloading = false;
        },
      });
  }

  logout(): void {
    //? steps ...
    //! (1) remove user token from localstorage
    localStorage.removeItem('userToken');
    //! (2) make userDataVariable = null
    this._AuthService.setUserToken();
    //! (3) programming routing to login page  <login component>
    this._Router.navigate(['/signin']);
  }
}
