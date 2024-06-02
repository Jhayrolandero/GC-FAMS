import { Injectable } from '@angular/core';
import { Chart, Plugin } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class CustomBGService {

  constructor() { }

  customBG(): Plugin<'line' | 'bar' | 'doughnut' | 'pie' | 'polarArea' | 'radar' | 'scatter' | 'bubble'> {
    return {
      id: 'customCanvasBackgroundColor',
      beforeDraw: (chart) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = (chart.config.options as any)['color'] || 'white';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    };
  }
}
