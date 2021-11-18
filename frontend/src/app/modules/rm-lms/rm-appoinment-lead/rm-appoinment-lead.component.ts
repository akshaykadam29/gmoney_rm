import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; 
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { LoginService } from 'src/app/services/login.service';
import { RmLmsService } from 'src/app/services/rm-lms.service';

@Component({
  selector: 'app-rm-appoinment-lead',
  templateUrl: './rm-appoinment-lead.component.html',
  styleUrls: ['./rm-appoinment-lead.component.css']
})
export class RmAppoinmentLeadComponent implements OnInit {

  
  calendarOptions!: CalendarOptions

  constructor(private rmLeadService : RmLmsService, private loginService : LoginService ) { 

  }

  ngOnInit(): void {
    var token = this.loginService.getUserPayload();
    if(token !=null){
      var id = token._id;
    this.rmLeadService.getRmAllAppointments(id).subscribe((res : any) =>{
     console.log(res);
     this.setCalender(res);
    });
  } 
}

setCalender(res : any){
  console.log("inside", res)
  this.calendarOptions = {
    timeZone: 'UTC',
    plugins: [ timeGridPlugin, listPlugin ],
    initialView: 'dayGridMonth',
    headerToolbar : { 
      left : 'prev,today,next',
      center : 'title',
      right : 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    slotDuration: '00:30',
   
    events : res.results,
    editable : false,
    height: 'auto',
  }
}
}
