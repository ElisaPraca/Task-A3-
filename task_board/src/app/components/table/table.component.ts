import { ChangeDetectionStrategy, Component, EventEmitter, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { Task } from '../../app.component';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-table',
  imports: [MatCardModule, MatListModule, MatTableModule, MatButtonModule, MatMenuModule, MatIconModule, CommonModule, MatRippleModule, MatTooltipModule, MatBadgeModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  titleTable = input.required<String>();
  dataSource = input.required<Task[]>();
  color = input<String>('black');
  displayedColumns: string[] = ['id', 'title', 'description', 'createdAt', 'action'];
  onDelete = output<Task>();
  onClickTableButton = output<EventEmitter<any> | MouseEvent>();
  iconTable = input('add');
  onEdit = output<Task>();
  selectedTask: Task | null = null;
  tooltipText = input<string>();
  useBadge = input<number>();
  actionButton = input<String>();
}
