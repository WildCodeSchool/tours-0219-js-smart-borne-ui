import { Component, OnInit } from '@angular/core';
import { BorneService } from '../../../core/http/borne.service';
import { Borne } from '../../../shared/models/borne';

@Component({
  selector: 'app-list-borne',
  templateUrl: './list-borne.component.html',
  styleUrls: ['./list-borne.component.scss'],
})
export class ListBorneComponent implements OnInit {
  public bornes: Borne[];
  constructor(public borneService: BorneService) {
  }

  ngOnInit() {
    this.getListBorne();
  }

  getListBorne() {
    this.borneService.getListBorne().subscribe(
      (bornes: Borne[]) => {
        this.bornes = bornes;
      },
    );
  }

}
