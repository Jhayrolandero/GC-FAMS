import { Component } from '@angular/core';
import { FacultyFetcherService } from '../../services/faculty/faculty-fetcher.service';
import { Router } from '@angular/router';
import { Evaluation } from '../../services/Interfaces/evaluation';

@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [],
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.css'
})
export class EvaluationComponent {
  evaluation: Evaluation[] = [];
  
  constructor(private facultyService: FacultyFetcherService, private router: Router){
    this.getEvaluation();
  }

  getEvaluation(){
    this.facultyService.fetchEvaluation().subscribe((next: Evaluation[]) => {
      this.evaluation = next;
      console.log(this.evaluation);
    }, (error) => {
      if(error.status == 403){
        console.log(error);
        this.router.navigate(['/']);
      }
    });
  }
}
