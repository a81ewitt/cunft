import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NftguyTx } from './nftguy-tx';

@Injectable({
  providedIn: 'root'
})
export class NftTransactionService {

  url : string = environment.nftguyurl + "/transaction";


  constructor(private toastr: ToastrService, private httpClient: HttpClient) { }

  getNftTx(transactionId : string){
    let params = new HttpParams().set('id', transactionId);
    return this.httpClient.get<NftguyTx>(this.url, {params: params})
    .pipe(
      //tap((newNftguyTx: NftguyTx) => this.log(`created nft w/ id=${newNftguyTx.id}`)),
      catchError(this.handleError<NftguyTx>('refresh'))
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
    
          // TODO: send the error to remote logging infrastructure
          //console.error(error); // log to console instead
    
          this.toastr.error('Unable to get NFT transaction, Sorry');
    
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
}
