import { Component, OnInit, Inject} from '@angular/core';
import { RmUserService } from 'src/app/services/rm-user.service';
import { ChannelPartnerBranding } from 'src/app/models/channelPartnerBranding';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-view-dialog',
  templateUrl: './image-view-dialog.component.html',
  styleUrls: ['./image-view-dialog.component.css']
})
export class ImageViewDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private rmService : RmUserService) { 
    const centerBrandId = data.centerBrandId;
    this.rmService.getAllImagesById(centerBrandId).subscribe((res : any) =>{
      this.hospBrandImages = res.branding;
    });
  }
  hospBrandImages :any[] = [] ;
  

  ngOnInit(): void { }

  getSliderClass(isFirst : any,isLast : any,isEven : any,isOdd : any){
    return {
      active : isFirst,
      lastactive : isLast,
      even : isEven,
      odd : isOdd
    };
  }

}
