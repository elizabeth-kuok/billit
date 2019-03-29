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
    MatMenuModule,
    MatChipsModule
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
        MatMenuModule,
        MatChipsModule
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
        MatMenuModule,
        MatChipsModule
    ]
})
export class MaterialModule {}