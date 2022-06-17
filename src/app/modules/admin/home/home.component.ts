import { Component, OnInit } from '@angular/core';
import {StorageService} from 'app/core/storage/storage.service';
import {AuthService} from 'app/core/auth/auth.service';
import {Title} from '@angular/platform-browser';
import {User} from 'app/core/user/types/user.type';
import {HomeService} from 'app/modules/admin/home/services/home.service';
import {HomeDataWidgets} from 'app/modules/admin/home/types/home-data-widgets.type';
import {ApexOptions} from 'ng-apexcharts';
import {ActivityService} from '../activity/services/activity.service';
import {CommunicationService} from "../../../core/communication/communication.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    user: User = this.storageService.getInLocalStorage<User>('user');
    homeDataWidgets: HomeDataWidgets;
    homeDataCharts: any;
    chartActivityType: ApexOptions;
    chartDifficulty: ApexOptions;
    chartComeLater1: ApexOptions;
    chartComeLater2: ApexOptions;
    faker = {
        comeLater1             : {
            total: 46085,
            series        : [55, 45],
            labels        : [
                'Option 1',
                'Option 2',
            ]
        },
        comeLater2             : {
            total: 46085,
            series        : [35, 55, 10],
            labels        : [
                'Option 1',
                'Option 2',
                'Option 3',
            ]
        },
    };

    constructor(
        private homeService: HomeService,
        private activityTypeService: ActivityService,
        private communicationService: CommunicationService,
        private storageService: StorageService,
        public auth: AuthService,
        private title: Title
    ) {
        this.title.setTitle('Accueil - Cyclocount');
    }

    ngOnInit(): void
    {
        this.communicationService.componentMethodCalled$.subscribe(
            () => {
                this.user = this.storageService.getInLocalStorage<User>('user');
            }
        );

        this.homeService.getHomeDataWidgets().subscribe({
            next: (homeDataWidgets) => {
                this.homeDataWidgets = homeDataWidgets;
            }
        });

        this.homeService.getHomeDataCharts().subscribe({
            next: (homeDataCharts) => {
                this.homeDataCharts = homeDataCharts;
                this.prepareChartData();
            }
        });
    }

    private prepareChartData(): void
    {
        this.chartActivityType = {
            chart      : {
                animations: {
                    speed           : 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'donut',
                sparkline : {
                    enabled: true
                }
            },
            colors     : ['#3C82F7', '#2C5190'],
            labels     : this.homeDataCharts.activity_type.labels,
            plotOptions: {
                pie: {
                    customScale  : 0.9,
                    expandOnClick: false,
                    donut        : {
                        size: '70%'
                    }
                }
            },
            series     : this.homeDataCharts.activity_type.series,
            states     : {
                hover : {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            tooltip    : {
                enabled        : true,
                fillSeriesColor: false,
                theme          : 'dark',
                custom         : ({
                                      seriesIndex,
                                      w
                                  }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                                    <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                                    <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                                    <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
                                                </div>`
            }
        };

        this.chartDifficulty = {
            chart      : {
                animations: {
                    speed           : 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'donut',
                sparkline : {
                    enabled: true
                }
            },
            colors     : ['#EF4444', '#A43A41', '#7B2A30'],
            labels     : this.homeDataCharts.difficulty.labels,
            plotOptions: {
                pie: {
                    customScale  : 0.9,
                    expandOnClick: false,
                    donut        : {
                        size: '70%'
                    }
                }
            },
            series     : this.homeDataCharts.difficulty.series,
            states     : {
                hover : {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            tooltip    : {
                enabled        : true,
                fillSeriesColor: false,
                theme          : 'dark',
                custom         : ({
                                      seriesIndex,
                                      w
                                  }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                                    <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                                    <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                                    <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
                                                </div>`
            }
        };

        this.chartComeLater1 = {
            chart      : {
                animations: {
                    speed           : 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'donut',
                sparkline : {
                    enabled: true
                }
            },
            colors     : ['#22C55E', '#20744B'],
            labels     : this.faker.comeLater1.labels,
            plotOptions: {
                pie: {
                    customScale  : 0.9,
                    expandOnClick: false,
                    donut        : {
                        size: '70%'
                    }
                }
            },
            series     : this.faker.comeLater1.series,
            states     : {
                hover : {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            tooltip    : {
                enabled        : true,
                fillSeriesColor: false,
                theme          : 'dark',
                custom         : ({
                                      seriesIndex,
                                      w
                                  }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                                    <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                                    <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                                    <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
                                                </div>`
            }
        };

        this.chartComeLater2 = {
            chart      : {
                animations: {
                    speed           : 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'donut',
                sparkline : {
                    enabled: true
                }
            },
            colors     : ['#F59E0B', '#BB7809', '#935E06'],
            labels     : this.faker.comeLater2.labels,
            plotOptions: {
                pie: {
                    customScale  : 0.9,
                    expandOnClick: false,
                    donut        : {
                        size: '70%'
                    }
                }
            },
            series     : this.faker.comeLater2.series,
            states     : {
                hover : {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            tooltip    : {
                enabled        : true,
                fillSeriesColor: false,
                theme          : 'dark',
                custom         : ({
                                      seriesIndex,
                                      w
                                  }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                                    <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                                    <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                                    <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
                                                </div>`
            }
        };
    }
}
