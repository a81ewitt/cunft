export interface NftguyTx {
    id: string;
    transactionId: string;
    nftPayAddress: string;
    nftRxAddress: string;
    networkFee: number;
    createFee: number;
    paymentState: string;
    nftPayAddressBalance: number;
}
