import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {StorageService} from 'app/core/storage/storage.service';
import {AuthService} from 'app/core/auth/auth.service';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {ApexOptions} from 'ng-apexcharts';
import {StatisticService} from 'app/modules/admin/statistic/services/statistic.service';
import {ActivityService} from 'app/modules/admin/activity/services/activity.service';
import {ActivityType} from 'app/modules/admin/activity/types/activity-type.type';
import {Router} from '@angular/router';
import fr from 'apexcharts/dist/locales/fr.json';
import { MatSelectChange } from '@angular/material/select';
import {AnnualObjectiveStats} from './types/annual-objective-stats.type';


@Component({
    selector: 'app-statistic',
    templateUrl: './statistic.component.html',
    encapsulation  : ViewEncapsulation.None
})
export class StatisticComponent implements OnInit {
    @ViewChild('kmActivityTypeSelector') kmActivityTypeSelector;
    @ViewChild('speedActivityTypeSelector') speedActivityTypeSelector;
    @ViewChild('powerActivityTypeSelector') powerActivityTypeSelector;
    chartKms: ApexOptions;
    chartSpeed: ApexOptions;
    chartPower: ApexOptions;
    chartAnnualObjectives: ApexOptions;
    chartsData: any;
    annualObjectiveChartData: AnnualObjectiveStats;
    activityTypes: ActivityType[];
    selectedActivityTypeId: number;

    constructor(
        private statisticService: StatisticService,
        private activityService: ActivityService,
        private storage: StorageService,
        public auth: AuthService,
        private toastr: ToastrService,
        private _router: Router,
        private title: Title
    ) {
        this.title.setTitle('Statistiques - Cyclocount');
    }

    ngOnInit(): void {
        this.getActivityTypes();
        // Attach SVG fill fixer to all ApexCharts
        window['Apex'] = {
            chart: {
                events: {
                    mounted: (chart: any, options?: any): void => {
                        this.fixSvgFill(chart.el);
                    },
                    updated: (chart: any, options?: any): void => {
                        this.fixSvgFill(chart.el);
                    }
                }
            }
        };
    }

    getActivityTypes(): void
    {
        this.activityService.getActivityTypes().subscribe({
            next: (activityTypes) => {
                this.activityTypes = activityTypes;
                this.selectedActivityTypeId = this.activityTypes[0]?.id;
                this.getCharts();
                this.getAnnualObjectivesChart();
            }
        });
    }

    getCharts(): void
    {
        this.statisticService.getCharts(this.selectedActivityTypeId).subscribe({
            next: (chartsData) => {
                this.chartsData = chartsData;
                this.prepareChartData();
            }
        });
    }

    getAnnualObjectivesChart(): void
    {
        this.statisticService.getAnnualObjectivesChart(this.selectedActivityTypeId).subscribe({
            next: (annualObjectiveChartData) => {
                this.annualObjectiveChartData = annualObjectiveChartData;
                this.prepareAnnualObjectiveChartData();
            }
        });
    }

    activityTypeChanged(change: MatSelectChange): void
    {
        this.selectedActivityTypeId = change.value;
        this.getCharts();
        this.getAnnualObjectivesChart();
    }

    private fixSvgFill(element: Element): void
    {
        // Current URL
        const currentURL = this._router.url;

        // 1. Find all elements with 'fill' attribute within the element
        // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
        // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
        Array.from(element.querySelectorAll('*[fill]'))
            .filter(el => el.getAttribute('fill').indexOf('url(') !== -1)
            .forEach((el) => {
                const attrVal = el.getAttribute('fill');
                el.setAttribute('fill', `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`);
            });
    }

    private prepareChartData(): void {
        // Kms
        this.chartKms = {
            chart: {
                locales: [fr],
                defaultLocale: 'fr',
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                width: '100%',
                height: '100%',
                type: 'area',
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            colors: ['#818CF8'],
            dataLabels: {
                enabled: false
            },
            fill: {
                colors: ['#312E81']
            },
            grid: {
                show: true,
                borderColor: '#334155',
                padding: {
                    top: 10,
                    bottom: -40,
                    left: 0,
                    right: 0
                },
                position: 'back',
                xaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            series: this.chartsData.km.series,
            stroke: {
                width: 2
            },
            tooltip: {
                followCursor: true,
                theme: 'dark',
                x: {
                    format: 'dd/MM/yyyy'
                },
                y: {
                    formatter: (value: number): string => `${value}`
                }
            },
            xaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    stroke: {
                        color: '#475569',
                        dashArray: 0,
                        width: 2
                    }
                },
                labels: {
                    offsetY: -20,
                    style: {
                        colors: '#CBD5E1'
                    },
                },
                tickAmount: 20,
                tooltip: {
                    enabled: false
                },
                type: 'datetime'
            },
            yaxis: {
                axisTicks: {
                    show: false
                },
                axisBorder: {
                    show: false
                },
                tickAmount: 5,
                show: false
            }
        };

        // Speed
        this.chartSpeed = {
            chart     : {
                locales: [fr],
                defaultLocale: 'fr',
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'area',
                toolbar   : {
                    show: false
                },
                zoom      : {
                    enabled: false
                }
            },
            colors    : ['#f59e0d', '#cc7b0f'],
            dataLabels: {
                enabled: false
            },
            fill      : {
                colors : ['#64748B', '#94A3B8'],
                opacity: 0.5
            },
            grid      : {
                show: true,
                borderColor: '#334155',
                padding: {
                    top: 10,
                    bottom: -40,
                    left: 0,
                    right: 0
                },
                position: 'back',
                xaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            legend    : {
                show: false
            },
            series    : this.chartsData.speed.series,
            stroke    : {
                curve: 'smooth',
                width: 2
            },
            tooltip   : {
                followCursor: true,
                theme       : 'dark',
                x           : {
                    format: 'dd/MM/yyyy'
                }
            },
            xaxis     : {
                axisBorder: {
                    show: false
                },
                labels    : {
                    offsetY: -20,
                    rotate : 0,
                    style  : {
                        colors: 'var(--fuse-text-secondary)'
                    }
                },
                tickAmount: 3,
                tooltip   : {
                    enabled: false
                },
                type      : 'datetime'
            },
            yaxis     : {
                labels    : {
                    style: {
                        colors: 'var(--fuse-text-secondary)'
                    }
                },
                show      : false,
                tickAmount: 5
            }
        };

        // Power
        this.chartPower = {
            chart     : {
                locales: [fr],
                defaultLocale: 'fr',
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'area',
                toolbar   : {
                    show: false
                },
                zoom      : {
                    enabled: false
                }
            },
            colors    : ['#78c3b0', '#639d90'],
            dataLabels: {
                enabled: false
            },
            fill      : {
                colors : ['#64748B', '#94A3B8'],
                opacity: 0.5
            },
            grid      : {
                show: true,
                borderColor: '#334155',
                padding: {
                    top: 10,
                    bottom: -40,
                    left: 0,
                    right: 0
                },
                position: 'back',
                xaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            legend    : {
                show: false
            },
            series    : this.chartsData.power.series,
            stroke    : {
                curve: 'smooth',
                width: 2
            },
            tooltip   : {
                followCursor: true,
                theme       : 'dark',
                x           : {
                    format: 'dd/MM/yyyy'
                }
            },
            xaxis     : {
                axisBorder: {
                    show: false
                },
                labels    : {
                    offsetY: -20,
                    rotate : 0,
                    style  : {
                        colors: 'var(--fuse-text-secondary)'
                    }
                },
                tickAmount: 3,
                tooltip   : {
                    enabled: false
                },
                type      : 'datetime'
            },
            yaxis     : {
                labels    : {
                    style: {
                        colors: 'var(--fuse-text-secondary)'
                    }
                },
                show      : false,
                tickAmount: 5
            }
        };
    }

    private prepareAnnualObjectiveChartData(): void {
        // Annual Objectives
        this.chartAnnualObjectives = {
            chart      : {
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'radar',
                sparkline : {
                    enabled: true
                }
            },
            colors     : ['#F88181'],
            dataLabels : {
                enabled   : true,
                formatter : (val: number): string | number => `${val}%`,
                textAnchor: 'start',
                style     : {
                    fontSize  : '13px',
                    fontWeight: 500
                },
                background: {
                    borderWidth: 0,
                    padding    : 4
                },
                offsetY   : -15
            },
            markers    : {
                strokeColors: '#F88181',
                strokeWidth : 4
            },
            plotOptions: {
                radar: {
                    polygons: {
                        strokeColors   : 'var(--fuse-border)',
                        connectorColors: 'var(--fuse-border)'
                    }
                }
            },
            series     : this.annualObjectiveChartData.series,
            stroke     : {
                width: 2
            },
            tooltip    : {
                theme: 'dark',
                y    : {
                    formatter: (val: number): string => `${val}%`
                }
            },
            xaxis      : {
                labels    : {
                    show : true,
                    style: {
                        fontSize  : '12px',
                        fontWeight: '500'
                    }
                },
                categories: this.annualObjectiveChartData.categories
            },
            yaxis      : {
                max       : (max: number): number => parseInt((max + 10).toFixed(0), 10),
                tickAmount: 7
            }
        };
    }
}
