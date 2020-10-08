import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map, finalize} from 'rxjs/operators';
import {postInterface} from '../../shared/models/post.interface';
import { fileInterface } from '../../shared/models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsCollection: AngularFirestoreCollection<postInterface>
  private filePath: any;
  private downloadURL: Observable<string>;
  
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
    ) {
    this.postsCollection = this.firestore.collection<postInterface>('posts'); 

  }

  getAllPosts():Observable<postInterface[]>{
    return this.postsCollection  //nos comunicamos con el firestore para obtener todos los documentos de la coleccion
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

  public deletePostById(post: postInterface){
    return this.postsCollection.doc(post.id).delete();
  }

  public editPostById(post: postInterface, image?: fileInterface){
    if(image){
      this.uploadImage(post, image);
    }else{
      return this.postsCollection.doc(post.id).update(post);
    }
    
    
  }

  public preAddUpatePost(post: postInterface, image: fileInterface){ 
      this.uploadImage(post, image)
  }

  private savePost(post: postInterface){
    console.log('postSvc', post);
    const postObj = {
      postTitle: post.postTitle,
      postContent: post.postContent,
      postImage: this.downloadURL,
      fileRef: this.filePath,
      postTags: post.postTags
    };

    if(post.id){
      return this.postsCollection.doc(post.id).update(postObj);
    }else{
      this.postsCollection.add(postObj);
    }
    
  }

 private uploadImage(post: postInterface, image: fileInterface){
    this.filePath = ` images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
    .pipe(
      finalize( ()=>{
        fileRef.getDownloadURL().subscribe( urlImage =>{
          this.downloadURL = urlImage;
          this.savePost(post);
        })
      })
    ).subscribe();
    
  }
}
