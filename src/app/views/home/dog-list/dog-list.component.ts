import { Component, OnInit, ViewChild } from '@angular/core';
import { Imagem, Infos, PostFavorite } from 'src/app/shared/model/infosPet.model';
import { DogApiService } from 'src/app/shared/service/dog-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.css']
})
export class DogListComponent implements OnInit {

  public dogForm: FormGroup;

  name: any;
  infosList: Infos[];
  listaInteira: Infos[];
  infosSearchName: Infos[];
  infosListPagination: Infos[];
  favorite: Infos[];

  constructor(
    private fb: FormBuilder,
    private dogApiService: DogApiService,
  ) { }

  ngOnInit(): void {
    this.getInfos();
    this.dogForm = this.fb.group({
      name: ['', [Validators.required]],
    });
    this.onPageChange;
  };

  //trazer as informações da api e mostrar em tela, atualmente mostrando raça, origin, life_span, image e temperament
  
  getInfos() {
    this.dogApiService.getDogs().subscribe(data => {
      this.listaInteira = data;
      this.infosList = this.listaInteira.slice(0, 12);
      console.log(this.infosList);
    }); 
  };

  //filtrar o nome no input

  getInfosName(name: string) {
    if(name == '') {
      this.getInfos();
    } else {
      this.dogApiService.getDogsName(name).subscribe(data => {
        this.infosSearchName = data;
        this.infosList = [];
        this.infosList = this.infosSearchName;
        this.infosList.map(res => {
          res.image = new Imagem();
          this.dogApiService.getDogsImage(res.reference_image_id).subscribe(responseImg => {
            res.image.url = responseImg.url;
          })
        })
        console.log(this.infosSearchName);
      })
    }
  };

  //paginação

  onPageChange($event: any) {
    this.infosList = this.listaInteira.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
  };

  //erro de image_id is required

  /* postFavoriteDog(favorite: Infos) {
    console.log(favorite);
    let postImageId = new PostFavorite();
    postImageId.image_id = favorite.reference_image_id;
    this.dogApiService.postFavoriteDogs(postImageId).subscribe( data => {
      this.favorite = data;
      
    });
    
  };
   */
};
