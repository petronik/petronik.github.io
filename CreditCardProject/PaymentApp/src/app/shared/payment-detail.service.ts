import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  constructor(private http:HttpClient) { }

formData:PaymentDetail = new PaymentDetail();
readonly baseUrl:'https://localhost:44374/api/PaymentDetails'

postPaymentDetail(){
  return this.http.post(this.baseUrl, this.formData)
}
}
