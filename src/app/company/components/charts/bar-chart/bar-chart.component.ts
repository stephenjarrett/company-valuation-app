import { FinancialDataPoint } from 'src/app/shared/models/financial-data-point.model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { primaryColorScheme } from 'src/app/shared/options';

@Component({
  selector: 'app-bar-chart',

  template: `
    <ngx-charts-bar-vertical-2d
      [results]="dataSet"
      [gradient]="gradient"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [scheme]="colorScheme"
      [showXAxisLabel]="showXAxisLabel"
      [showYAxisLabel]="showYAxisLabel"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel"
      [showGridLines]="showGridLines"
      [barPadding]="0"
      [xAxisTickFormatting]=""
      [yAxisTickFormatting]=""
    >
      <ng-template #tooltipTemplate let-model="model">
        {{ model.name }}: {{ model.value }}
      </ng-template>
      <ng-template #seriesTooltipTemplate let-model="model">
        <div *ngFor="let mod of model; let i = index">
          {{ model[i].series }}
        </div>
      </ng-template>
    </ngx-charts-bar-vertical-2d>
  `,
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input() public showXAxis = true;
  @Input() public showYAxis = true;
  @Input() public gradient = true;
  @Input() public showLegend = true;
  @Input() public showXAxisLabel = true;
  @Input() public xAxisLabel = '';
  @Input() public showYAxisLabel = true;
  @Input() public yAxisLabel = '(in thousands)';
  @Input() public autoScale = true;
  @Input() public showGridLines = true;
  @Input() public dataType;
  @Input() public chartData: any;
  colorScheme = primaryColorScheme;
  below = 'below';
  dataSet = [
    {
      name: '',
      series: [
        {
          name: '',
          value: 0
        }
      ]
    }
  ];

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.chartData) {
      this.buildChartDataSet(this.chartData);
    }
  }

  buildChartDataSet(chartData: FinancialDataPoint[]) {
    const series = [];
    chartData.forEach((dataPoint: FinancialDataPoint) => {
      series.push({
        name: dataPoint.year.toString(),
        value: dataPoint.value
      });
    });
    this.dataSet = [
      {
        name: `${this.dataType} (thousands)`,
        series
      }
    ];
  }
}
