import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debug } from 'console';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    //public credits: Credits;
    //formData: FormGroup;
    public typeOfCredits: TypesOfCredits[];
    public personType: PersonType[];
    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        @Inject('BASE_URL') baseUrl: string
    ) {
        this.http.get<TypesOfCredits[]>(baseUrl + 'credits').subscribe(result => {
            this.typeOfCredits = result;
        }, error => console.error(error));
        this.http.get<PersonType[]>(baseUrl + 'personType').subscribe(result => {
            this.personType = result;
        }, error => console.error(error));
    }
    formData = this.formBuilder.group({
        personType: new FormControl(''),
        creditValue: new FormControl(''),
        typesOfCredits: new FormControl(''),
        quantityInstallments: new FormControl(''),
        dateFirstExpiration: new FormControl(''),
        status: new FormControl('').disable(),
        totalAmountWithInterest: new FormControl('').disable(),
        amountInterest: new FormControl('').disable(),
    });
    ngOnInit() {
        this.formData.controls['status'].disable();
        this.formData.controls['totalAmountWithInterest'].disable();
        this.formData.controls['amountInterest'].disable();
    }
    onSubmit() {
        if (
            //this.ValidateMaximumCreditValue() &&
            this.ValidateMaximumMinimumAmount() &&
            this.ValidateCorporateCredit()
            //this.ValidateFirstExpirationDate()
        ) {
            this.CalculateInterest();
            this.formData.controls['status'].setValue('Aprovado');

        }
        else {
            this.formData.controls['status'].setValue('Recusado');
        }
    }
    ValidateMaximumCreditValue() {
        if (this.formData.controls['creditValue'].value <= 100000000) {
            return true;
        } else {
            alert('O valor máximo a ser liberado para qualquer tipo de empréstimo é de R$ 1.000.000,00;');
            return false;
        }
    }
    ValidateMaximumMinimumAmount() {
        if (this.formData.controls['quantityInstallments'].value <= 72) {
            return true;
        }
        else if (this.formData.controls['quantityInstallments'].value >= 5) {
            return true;
        }
        else {
            alert('A quantidade de parcelas máximas é de 72x e a mínima é de 5x');
            return false;
        }
    }
    ValidateCorporateCredit() {
        if (this.formData.controls['personType'].value == '2' && this.formData.controls['creditValue'].value >= 1500000) {
            return true;
        }
        else {
            alert('Para o crédito de pessoa jurídica, o valor mínimo a ser liberado é de R$ 15.000,00');
            return false;
        }
    }
    ValidateFirstExpirationDate() {
        let myMoment: Date = new Date();
        let minimumDate = myMoment.setDate(15);
        let maximumDate = myMoment.setDate(40);
        if (this.formData.controls['dateFirstExpiration'].value.toString() >= minimumDate && this.formData.controls['dateFirstExpiration'].value.toString() <= maximumDate) {
            return true;
        }
        else {
            alert('A data do primeiro vencimento sempre será no mínimo D+15 (Dia atual + 15 dias) e no máximo, D + 40(Dia atual + 40 dias)');
            return false;
        }
    }
    CalculateInterest() {
        debugger;
        let interestPercentage = this.typeOfCredits.find(x => x.id == this.formData.controls['personType'].value);
        let mouth = new Date(this.formData.controls['dateFirstExpiration'].value.toString()).getMonth();
        let totalAmountWithInterest = this.formData.controls['creditValue'].value + (this.formData.controls['creditValue'].value * interestPercentage.taxes * mouth);
        let amountInterest = this.formData.controls['creditValue'].value + interestPercentage;
        this.formData.controls['totalAmountWithInterest'].setValue(totalAmountWithInterest);
        this.formData.controls['amountInterest'].setValue(amountInterest);
    }
}

interface TypesOfCredits {
    id: number,
    description: string,
    taxes: number
}
interface PersonType {
    id: number,
    description: string,
}