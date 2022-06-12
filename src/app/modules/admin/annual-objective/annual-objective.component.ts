import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {StorageService} from 'app/core/storage/storage.service';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {AnnualObjectiveService} from 'app/modules/admin/annual-objective/services/annual-objective.service';
import {TypeObjective} from 'app/modules/admin/annual-objective/types/type-objective.type';
import {User} from 'app/core/user/types/user.type';
import {AnnualObjective} from './types/annual-objective.type';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnnualObjectivePush} from './types/annual-objective-push.type';
import {FuseConfirmationService} from '@fuse/services/confirmation';

@Component({
    selector: 'app-annual-objective',
    templateUrl: './annual-objective.component.html',
    styleUrls: ['./annual-objective.component.scss']
})
export class AnnualObjectiveComponent implements OnInit, AfterViewInit {
    @ViewChild('nameField', {read: ElementRef}) nameField: ElementRef;
    @ViewChild('qtyField', {read: ElementRef}) qtyField: ElementRef;
    @ViewChild('editNameField', {read: ElementRef}) editNameField: ElementRef;
    @ViewChild('editQtyField', {read: ElementRef}) editQtyField: ElementRef;
    typeObjectives: TypeObjective[];
    annualObjectives: AnnualObjective[];
    selectedAnnualObjective: AnnualObjective | null;
    selectedField: 'name' | 'quantity' | null;
    selectedAnnualObjectiveForm: FormGroup;
    createAnnualObjectiveForm: FormGroup;
    addingMode = false;
    user: User = this.storageService.getInLocalStorage('user');
    message: string | null = null;
    flashMessage: 'success' | 'error' | null = null;

    constructor(
        private annualObjective: AnnualObjectiveService,
        private storageService: StorageService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private title: Title,
        private renderer2: Renderer2,
        private fuseConfirmationService: FuseConfirmationService,
    ) {
        this.title.setTitle('Objectifs annuels - Cyclocount');
    }

    ngOnInit(): void
    {
        this.selectedAnnualObjectiveForm = this.formBuilder.group({
            name: [null, Validators.required],
            quantity: [null, Validators.required],
            type_objective: [null, Validators.required],
        });

        this.createAnnualObjectiveForm = this.formBuilder.group({
            name: [null, Validators.required],
            quantity: [null, Validators.required],
            type_objective_id: [null, Validators.required],
        });

        this.getAnnualObjectives();
        this.getTypeObjectives();
    }

    ngAfterViewInit(): void
    {
        this.renderer2.listen('window', 'click',(e: Event) => {
            if (this.selectedAnnualObjective && this.selectedField) {
                const target = (e.target as HTMLElement);

                if (((this.editNameField && !this.editNameField.nativeElement.contains(target)) || (this.editQtyField && !this.editQtyField.nativeElement.contains(target)))
                    && !target.classList.contains('no-edit')
                ) {
                    this.selectedAnnualObjective = null;
                    this.selectedAnnualObjectiveForm.reset();
                }
            }
        });
    }

    getAnnualObjectives(): void
    {
        this.annualObjective.getAnnualObjectiveByUser(this.user.id).subscribe({
            next: (annualObjectives) => {
                this.annualObjectives = annualObjectives;
                this.clearAll();
            },
            error: () => {
                this.toastr.error('Il y a eu un problème');
            }
        });
    }

    getTypeObjectives(): void
    {
        this.annualObjective.getTypeObjectives().subscribe({
            next: (typeObjectives) => {
                this.typeObjectives = typeObjectives;
            },
            error: () => {
                this.toastr.error('Il y a eu un problème');
            }
        });
    }

    editAnnualObjective(annualObjective: AnnualObjective, selectedField: 'name' | 'quantity'): void
    {
        this.selectedAnnualObjective = annualObjective;
        this.selectedField = selectedField;
        this.selectedAnnualObjectiveForm.patchValue(this.selectedAnnualObjective);
        setTimeout(() => {
            selectedField === 'name' ? this.nameField.nativeElement.focus() : this.qtyField.nativeElement.focus();
        });
    }

    saveEdit(): void
    {
        const annualObjective = this.selectedAnnualObjectiveForm.getRawValue();
        const annualObjectiveToUpdate = this.getAnnualObjectiveToUpdate(annualObjective);

        this.updateAnnualObjective(this.selectedAnnualObjective.id, annualObjectiveToUpdate);
    }

    changeSelect(annualObjective: AnnualObjective): void
    {
        const annualObjectiveToUpdate = this.getAnnualObjectiveToUpdate(annualObjective);
        this.updateAnnualObjective(annualObjective.id, annualObjectiveToUpdate);
    }

    updateAnnualObjective(annualObjectiveId: number, annualObjectiveToUpdate: AnnualObjectivePush): void
    {
        this.annualObjective.updateAnnualObjective(annualObjectiveId, annualObjectiveToUpdate).subscribe({
            next: () => {
                this.getAnnualObjectives();
                this.showFlashMessage('success', 'Objectif annuel modifié');
            },
            error: (err) => {
                this.showFlashMessage('error', err.error.message);
            }
        });
    }

    deleteSelectedAnnualObjective(annualObjectiveId: number): void
    {
        // Open the confirmation dialog
        const confirmation = this.fuseConfirmationService.open({
            title  : 'Supprimer l\'objectif',
            message: 'Êtes-vous sûr de vouloir supprimer l\'objectif ?',
            actions: {
                confirm: {
                    label: 'Supprimer'
                }
            }
        });

        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed')
            {
                // Delete the objective on the server
                this.annualObjective.deleteAnnualObjective(annualObjectiveId).subscribe(() => {
                    this.getAnnualObjectives();
                });
            }
        });
    }

    createAnnualObjective(): void
    {
        this.addingMode = true;
        this.createAnnualObjectiveForm.reset();
        this.selectedAnnualObjective = {
            id: null,
            user_link: this.user,
            type_objective: null,
            name: null,
            quantity: null,
        };

        this.annualObjectives.unshift(this.selectedAnnualObjective);
        setTimeout(() => {
            this.nameField.nativeElement.focus();
        }, 100);
    }

    addAnnualObjective(): void
    {
        const createAnnualObjectiveValues = this.createAnnualObjectiveForm.getRawValue();
        const annualObjectiveToCreate = {
            user_id: this.user.id,
            type_objective_id: createAnnualObjectiveValues.type_objective_id,
            name: createAnnualObjectiveValues.name,
            quantity: createAnnualObjectiveValues.quantity,
        };

        this.annualObjective.createAnnualObjective(annualObjectiveToCreate).subscribe({
            next: () => {
                this.getAnnualObjectives();
                this.showFlashMessage('success', 'Objectif annuel créé');
            },
            error: (err) => {
                this.showFlashMessage('error', err.error.message);
            }
        });
    }

    getAnnualObjectiveToUpdate(annualObjective: AnnualObjective): AnnualObjectivePush
    {
        return {
            user_id: this.user.id,
            type_objective_id: annualObjective.type_objective.id,
            name: annualObjective.name,
            quantity: annualObjective.quantity,
        };
    }

    clearAll(): void
    {
        this.selectedAnnualObjectiveForm.reset();
        this.createAnnualObjectiveForm.reset();
        this.addingMode = false;
        this.selectedAnnualObjective = null;
        this.selectedField = null;
    }

    /**
     * Show flash message
     */
    showFlashMessage(type: 'success' | 'error', message?: string): void
    {
        // Show the message
        this.flashMessage = type;
        if (message) {
            this.message = message;
        }

        // Hide it after 3 seconds
        setTimeout(() => {
            this.flashMessage = null;
        }, 7000);
    }
}
