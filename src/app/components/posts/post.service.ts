import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {postInterface} from '../../shared/models/post.interface'


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private firestore: AngularFirestore,

  ) 
  { }

  getAllPosts():Observable<postInterface[]>{
    return this.firestore.collection('posts')  //nos comunicamos con el firestore para obtener todos los documentos de la coleccion
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a =>{
          const data = a.payload.doc.data() as postInterface;  //iteramos sobre el array que devuelve firestore y a cada post
          const id = a.payload.doc.id;                         //le asignamos el id y la data en un solo objeto
          return {id, ...data};
        })
      )
    )
  }

  getOnePost(postId: postInterface):Observable<postInterface>{
    return this.firestore.doc<postInterface>(`posts/${postId}`).valueChanges();
  }
}
