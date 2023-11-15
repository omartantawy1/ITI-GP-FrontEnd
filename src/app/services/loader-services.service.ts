import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderServicesService {

  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

display(value: boolean) {
    this.status.next(value);
}
}
