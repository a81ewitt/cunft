import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Health } from './health';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {
  url = environment.nftguyurl + "/actuator/health";

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  getHealth(){
    return this.httpClient.get<Health>(this.url)
    .pipe(
      //tap((newNftguyTx: NftguyTx) => this.log(`created nft w/ id=${newNftguyTx.id}`)),
      catchError(this.handleError<Health>('getHealth'))
    );
  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        this.toastr.error('Unable to continue due to error, Sorry');
        return of(result as T);
      };
    }
}
