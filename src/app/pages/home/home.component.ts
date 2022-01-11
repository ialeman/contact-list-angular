import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { ContactEntity } from '../../entities/ContactEntity';
import { ContactService } from '../../services/contact.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [ConfirmationService, MessageService]
})
export class HomeComponent implements OnInit {

    displayDialogAdd: boolean = false;
    displayDialogEdit: boolean = false;

    contextMenu: MenuItem[];

    contactList: ContactEntity[];
    contactNew: ContactEntity = new ContactEntity();
    contactSelected: ContactEntity = new ContactEntity();

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private contactService: ContactService
    ) { }

    ngOnInit(): void {
        this.retrieveAllContacts();
        this.contextMenu = [
            {
                label: 'New',
                icon: 'pi pi-plus',
                command: () => {
                    this.fDisplayDialogAdd();
                }
            },
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => {
                    this.fDisplayDialogEdit();
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {
                    this.confirmDelete();
                }
            }
        ];
    }

    retrieveAllContacts() {
        this.contactService.getAllContacts().then(res => this.contactList = res);
    }

    verifyNew() {
        let errors: boolean = false;
        if (!this.contactNew.contactName) {
            errors = true;
            this.showMessage("warn", "Message", "Name can't be empty");
        }

        if (!this.contactNew.contactAge) {
            errors = true;
            this.showMessage("warn", "Message", "Age can't be empty");
        }

        if (!this.contactNew.contactNickname) {
            errors = true;
            this.showMessage("warn", "Message", "Nickname can't be empty");
        }

        if (!this.contactNew.contactPhone) {
            errors = true;
            this.showMessage("warn", "Message", "Phone can't be empty");
        }

        if (errors == false) {
            this.doRegister();
            return;
        }
    }

    doRegister() {
        this.contactService.createContact(this.contactNew).subscribe(
            res => {
                this.fDisplayDialogAdd();
                this.retrieveAllContacts();
                this.showMessage("info", "Message", "Contact Created");
                this.contactNew = new ContactEntity();
            },
            err => {
                this.showMessage("error", "Message", "Something bad happened!");
            }
        )
    }

    verifyEdit() {
        let errors: boolean = false;
        if (!this.contactSelected.contactName) {
            errors = true;
            this.showMessage("warn", "Message", "Name can't be empty");
        }

        if (!this.contactSelected.contactAge) {
            errors = true;
            this.showMessage("warn", "Message", "Age can't be empty");
        }

        if (!this.contactSelected.contactNickname) {
            errors = true;
            this.showMessage("warn", "Message", "Nickname can't be empty");
        }

        if (!this.contactSelected.contactPhone) {
            errors = true;
            this.showMessage("warn", "Message", "Phone can't be empty");
        }

        if (errors == false) {
            this.doEdit();
            return;
        }
    }

    doEdit() {
        this.contactService.updateContact(this.contactSelected).subscribe(
            res => {
                this.fDisplayDialogEdit();
                this.retrieveAllContacts();
                this.showMessage("info", "Message", "Contact Updated");
                this.contactSelected = new ContactEntity();
            },
            err => {
                console.log(err);
                this.showMessage("error", "Message", "Something bad happened!");
            }
        )
    }

    confirmDelete() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this Contact?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            accept: () => {
                this.contactService.deleteContact(this.contactSelected.contactId).subscribe(
                    res => {
                        this.retrieveAllContacts();
                        this.showMessage("info", "Confirmed", "Contact deleted")
                    }
                );
            }
        });
    }

    fDisplayDialogAdd() {
        this.displayDialogAdd = !this.displayDialogAdd;
    }

    fDisplayDialogEdit() {
        this.displayDialogEdit = !this.displayDialogEdit;
    }

    showMessage(severity: string, summary: string, detail: string): void {
        this.messageService.add({ severity: severity, summary: summary, detail: detail });
    }

}
