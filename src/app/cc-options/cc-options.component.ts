import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { ControlOptions } from 'src/app/shared/models/control-options.type';

@Component({
  selector: 'cc-options',
  templateUrl: './cc-options.component.html',
  styleUrls: ['./cc-options.component.css']
})
export class CcOptionsComponent implements OnInit {
  @Input() optionsButtons: ControlOptions[] = [];
  public videoForm: FormGroup = new FormGroup({});

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.videoForm = <FormGroup>this.controlContainer.control;
  }
}
