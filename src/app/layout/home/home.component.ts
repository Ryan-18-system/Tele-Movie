import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/app/shared/model/Filme';
import { FilmeService } from 'src/app/shared/service/filmes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  filmes: Array<Filme> = [];

  favoritos = [
    {img: 'https://www.themoviedb.org/t/p/original/rvtdN5XkWAfGX6xDuPL6yYS2seK.jpg'},
    {img: 'https://www.themoviedb.org/t/p/original/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg'},
    {img: 'https://www.themoviedb.org/t/p/original/xvIAeAyXakMHPOgU7URp1kqKQZI.jpg'},
  ]

  constructor(private filmeService: FilmeService) { }

  ngOnInit(): void {
    this.filmeService.listarEmalta().subscribe(
      filmes => this.filmes = filmes
    );
  }

}
