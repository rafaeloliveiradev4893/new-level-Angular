import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coming-soon-page',
  templateUrl: './coming-soon-page.html',
  styleUrl: './coming-soon-page.scss',
})
export class ComingSoonPage {
  private route = inject(ActivatedRoute);
  title = this.route.snapshot.data['title'] as string;
}
