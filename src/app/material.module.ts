import { NgModule } from '@angular/core';
import { 
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
} from '@angular/material';
@NgModule({
    imports: [
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule
    ]
})
export class MaterialModule {}