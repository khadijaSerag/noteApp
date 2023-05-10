import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { NoteService } from '../note.service';
declare var $: any;


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  allNotes: any;
  token: any;
  decoded: any;

  noteID: any;
  checked = true; //waiting .........


  addForm = new FormGroup({
    title: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required)
  });
  editForm = new FormGroup({
    title: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required)
  });


  constructor(private _NoteService: NoteService, private _Router: Router) {
    try {
      this.token = localStorage.getItem('currentUser');
      this.decoded = jwtDecode(this.token);
      console.log(this.decoded);
      this.getNotes(); // عملت ليها كول هنا اول حاجة عشان اول لما اعمل ريفريش او اول لما اخش بالاكونت بتاعى يجبلى كل النوتس اللى متخزنة فى الاى بى اى 

    } catch (error) {
      localStorage.clear();
      this._Router.navigate(["/signIn"]);
    }
  }


  //  to talk all notes 
  getNotes() {
    let data = {
      token: this.token,
      userID: this.decoded._id,
    };
    this._NoteService.getUserNote(data).subscribe((result) => {
      console.log("notes:", result);
      if (result.message == "success") {
        this.allNotes = result.Notes;
        console.log("notes:", this.allNotes);
      }
      else {
        this.allNotes = [];
        console.log("notes2:", this.allNotes);
        // localStorage.clear();
        // this._Router.navigate(['/signIn']);
      }

    });

  }


  //........................ to add note ....................

  addNote() {
    console.log(this.addForm);
    let data = { // data from api
      title: this.addForm.controls.title.value,
      desc: this.addForm.controls.desc.value,
      userID: this.decoded._id,
      token: this.token
    };
    this.checked = false; //waiting .........
    this._NoteService.addNote(data).subscribe((result) => {
      // console.log("resulteNote:",result)
      if (result.message == "success") {
        this.checked = true; //waiting .........
        this.getNotes(); // تانى كول للاد نود وده عشان مش كل مرة عاوزة اضيف نوت جديدة اروح اعمل ريفريش للموقع 
        $("#addnote").modal('hide'); // دى عشان لما اتك على زرار الاد اللى فى البوب اب يضيف نوت ويقفل البوب اب لوحده
        this.addForm.reset();
      }
    })


  }

  // ......................... delete note ..................

  getId(id: any) {
    this.noteID = id;

  }

  deleteNote() {
    let data = {
      NoteID: this.noteID,
      token: this.token
    }
    this._NoteService.deleteNote(data).subscribe((result) => {
      console.log("deleted:", result);
      if (result.message == "deleted") {

        $("#deletenote").modal('hide'); // دى عشان لما اتك على زرار الديليت اللى فى البوب اب يمسح نوت ويقفل البوب اب لوحده
        this.getNotes();
      }
    });

  }

  //........................ edit note ......................
  setValue() {
    for (let index = 0; index < this.allNotes.length; index++) {
      if (this.allNotes[index]._id == this.noteID) {
        // console.log(this.allNotes[index]);
        this.editForm.controls.title.setValue(this.allNotes[index].title);
        this.editForm.controls.desc.setValue(this.allNotes[index].desc);
      }
    }
  }
  editNote() {
    let data = { // data from api
      title: this.editForm.controls.title.value,
      desc: this.editForm.controls.desc.value,
      NoteID: this.noteID,
      token: this.token
    };
    this.checked = false; //waiting .........
    this._NoteService.updateNote(data).subscribe((result) => {
      // console.log(result);
      if (result.message == "updated") {
        this.checked = true; //waiting .........
        $("#editnote").modal('hide');
        this.getNotes();
      }
    });
  }

  ngOnInit(): void {
  }

}
