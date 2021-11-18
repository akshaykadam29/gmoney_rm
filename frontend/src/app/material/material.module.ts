import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      MatDialogModule,
      MatIconModule,
      MatToolbarModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatProgressSpinnerModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatInputModule,
      NgxMatDatetimePickerModule,
      NgxMatTimepickerModule,
      NgxMatNativeDateModule,
      MatTooltipModule,
      MatSelectModule
    ],
    exports: [
        MatDialogModule,
        MatIconModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatInputModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        MatTooltipModule,
        MatSelectModule
    ]
})
export class MaterialModule { }