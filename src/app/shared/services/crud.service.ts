import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private fireStore: AngularFirestore) { }


  newMessage(data: any) {
    return this.fireStore.collection('messages').add(data)
    
  }
}
