import { NgModule } from '@angular/core';
import { 
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule
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
        MatSelectModule,
        MatAutocompleteModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule
    ]
})
export class MaterialModule {}