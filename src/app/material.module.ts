import { NgModule } from '@angular/core';
import { 
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule
} from '@angular/material';
@NgModule({
    imports: [
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSelectModule
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSelectModule
    ]
})
export class MaterialModule {}