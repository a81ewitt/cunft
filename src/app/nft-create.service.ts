import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NftguyTx } from './nftguy-tx';

@Injectable({
  providedIn: 'root'
})
export class NftCreateService {

  url = environment.nftguyurl + "/create";

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  submit(file : File, user_input : string){
    let post_data = new FormData();
    post_data.append("file", file);
    post_data.append("user_input", user_input);
    return this.httpClient.post<NftguyTx>(this.url, post_data)
    .pipe(
      //tap((newNftguyTx: NftguyTx) => this.log(`created nft w/ id=${newNftguyTx.id}`)),
      catchError(this.handleError<NftguyTx>('submit'))
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
  
        this.toastr.error('Unable to create NFT, error while performing ' + operation + " operation", 'Sorry');
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
