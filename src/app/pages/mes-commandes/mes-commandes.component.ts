import {Component} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-mes-commandes',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './mes-commandes.component.html',
  styleUrl: './mes-commandes.component.css'
})
export class MesCommandesComponent {
  commandes = [
    {id: 1, date: '2025-03-20', statut: 'Livrée', total: '150€'},
    {id: 2, date: '2025-03-18', statut: 'En cours', total: '80€'},
    {id: 3, date: '2025-03-15', statut: 'Annulée', total: '200€'}
  ];

}
