import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ContactEntity } from '../entities/ContactEntity';

const header = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(private http: HttpClient) { }

    private getAll  = environment.api + "contact/getAll"; 
    private create  = environment.api + "contact/create"; 
    private delete  = environment.api + "contact/delete"; 
    private update  = environment.api + "contact/update"; 
    // private getById  = environment.api + "contact"; 

    getAllContacts() {
        return this.http.get(this.getAll)
            .toPromise()
            .then(res => <ContactEntity[]>(res as any))
            .then(data => {
                return data;
            });
    }

    createContact(entity: ContactEntity){
        return this.http.post(this.create, entity, header);
    }

    updateContact(entity: ContactEntity){
        return this.http.put(this.update, entity, header);
    }

    deleteContact(contactId: number){
        return this.http.delete(this.delete+ `/${contactId}`, header);
    }

}
