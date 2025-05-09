import { TitleCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, Input, input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {MatTableModule} from '@angular/material/table';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-dynamic-table',
  imports: [MatTableModule, TitleCasePipe],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss'
})
export class DynamicTableComponent implements OnInit{

  private destroyRef$ = inject(DestroyRef);

  @Input() data$ : Observable<any> | undefined
  data = signal<any>([]);
  @Input() displayedColumns$ : Observable<string[]> | undefined
   displayedColumns= signal<string[]>([]);
   ngOnInit(): void {

  }

  initializeSubscribe() {
    this.data$?.pipe(
      takeUntilDestroyed(this.destroyRef$)
    ).subscribe({
      next: (data: any) => {
        this.data.set(data);
      },
      error: (err) => console.error('Error loading form data', err)
    });

    this.displayedColumns$?.pipe(
      takeUntilDestroyed(this.destroyRef$)
    ).subscribe({
      next: (data: any) => {
        this.displayedColumns.set(data);
      },
      error: (err) => console.error('Error loading form data', err)
    });
  }

}
