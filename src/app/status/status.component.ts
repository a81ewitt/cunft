import { Component, OnInit } from '@angular/core';
import { Health } from '../health';
import { HealthCheckService } from '../health-check.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  health? : Health;
  getHealthCall?: Subscription;

  constructor(private healthService: HealthCheckService, ) { }

  ngOnInit(): void {
    this.getHealthCall = this.healthService.getHealth().subscribe(response => {
      this.health = response;
    }

    )
  }

}
