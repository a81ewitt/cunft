import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NftLocalService {

 
  data?: any;
  imgURL?: string;

  constructor() { }

  public get getData(){
    return this.data
  }

  public set setData(data: any){
     this.data = data;
  }


  public get getImgURL(){
    return this.imgURL
  }

  public set setImgURL(imgURL: string | undefined){
     this.imgURL = imgURL;
  }

}
