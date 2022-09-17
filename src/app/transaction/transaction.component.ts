import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Subscription, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NftLocalService } from '../nft-local.service';
import { NftTransactionService } from '../nft-transaction.service';
import { NftguyTx } from '../nftguy-tx';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  network = environment.network;
  nftguy_tx?: NftguyTx;
  txId?: any;
  timerSubscription?: Subscription;
  imageURL?: string;
  constructor(private route: ActivatedRoute, 
    private txService: NftTransactionService, 
    private toastr: ToastrService,
    public nftLocalService: NftLocalService) { }


  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.txId = params.has('id') ? params.get('id') : '';
    })
    this.timerSubscription = timer(0, 2500).pipe(
      map(() => {
        this.refresh();
      })
    ).subscribe();
  }

  refresh() {
    if (this.txId) {
      this.txService.getNftTx(this.txId).subscribe(response => {
        this.nftguy_tx = response
      })
    }
  }

ngOnDestroy(): void { 
  this.timerSubscription?.unsubscribe(); 
} 

onCopy(text: string) {
  this.toastr.success(text, 'Copied');
}

}
