import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notedata } from '../interface/notedata';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private _HttpClient: HttpClient) {}

  addNote(newNote: Notedata): Observable<any> {
    return this._HttpClient.post(
      `https://note-sigma-black.vercel.app/api/v1/notes`,
      newNote,
      {
        headers: {
          token: localStorage.getItem('userToken') || '',
        },
      }
    );
  }

  getNotes(): Observable<any> {
    return this._HttpClient.get(
      `https://note-sigma-black.vercel.app/api/v1/notes`,
      {
        headers: {
          token: localStorage.getItem('userToken') || '',
        },
      }
    );
  }

  deleteNote(noteId: string): Observable<any> {
    return this._HttpClient.delete(
      `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
      {
        headers: { token: localStorage.getItem('userToken') || '' },
      }
    );
  }

  udpateNote(noteDetails: Notedata, noteId: string): Observable<any> {
    return this._HttpClient.put(
      `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
      noteDetails,
      {
        headers: {
          token: localStorage.getItem('userToken') || '',
        },
      }
    );
  }
}
