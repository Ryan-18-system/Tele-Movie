import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosFirestoreService {

  colecaoUsuarios: AngularFirestoreCollection<Usuario>;
  NOME_COLECAO = 'usuarios';

  constructor(private afs: AngularFirestore) {
    this.colecaoUsuarios = afs.collection(this.NOME_COLECAO);
  }

  listar(): Observable<Usuario[]> {
    return this.colecaoUsuarios.valueChanges({idField: 'id'});
  }

  inserir(usuario: Usuario): Observable<Usuario> {
    delete usuario.id;
    return from(this.colecaoUsuarios.add(Object.assign({}, usuario)));
  }

  remover(id: string): Observable<void> {
    return from(this.colecaoUsuarios.doc(id).delete());
  }

  pesquisarPorId(id: string): Observable<Usuario> {
    return this.colecaoUsuarios.doc(id).get().pipe(map(document => new Usuario(document.id, document.data())));
  }

  atualizar(usuario: Usuario): Observable<void> {
    delete usuario.id;
    return from(this.colecaoUsuarios.doc(usuario.id).update(Object.assign({}, usuario)));
  }

}
