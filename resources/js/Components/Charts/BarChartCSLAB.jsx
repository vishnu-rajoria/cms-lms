import React from "react";
// import the core library.
import ReactEChartsCore from "echarts-for-react/lib/core";
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";
// Import charts, all with Chart suffix
import {
    LineChart,
    // BarChart,
    // PieChart,
    // ScatterChart,
    // RadarChart,
    // MapChart,
    // TreeChart,
    // TreemapChart,
    // GraphChart,
    // GaugeChart,
    // FunnelChart,
    // ParallelChart,
    // SankeyChart,
    // BoxplotChart,
    // CandlestickChart,
    // EffectScatterChart,
    // LinesChart,
    // HeatmapChart,
    // PictorialBarChart,
    // ThemeRiverChart,
    // SunburstChart,
    // CustomChart,
} from "echarts/charts";
// import components, all suffixed with Component
import {
    // GridSimpleComponent,
    GridComponent,
    // PolarComponent,
    // RadarComponent,
    // GeoComponent,
    // SingleAxisComponent,
    // ParallelComponent,
    // CalendarComponent,
    // GraphicComponent,
    // ToolboxComponent,
    TooltipComponent,
    // AxisPointerComponent,
    // BrushComponent,
    TitleComponent,
    // TimelineComponent,
    // MarkPointComponent,
    // MarkLineComponent,
    // MarkAreaComponent,
    // LegendComponent,
    // LegendScrollComponent,
    // LegendPlainComponent,
    // DataZoomComponent,
    // DataZoomInsideComponent,
    // DataZoomSliderComponent,
    // VisualMapComponent,
    // VisualMapContinuousComponent,
    // VisualMapPiecewiseComponent,
    // AriaComponent,
    // TransformComponent,
    DatasetComponent,
} from "echarts/components";
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
    CanvasRenderer,
    // SVGRenderer,
} from "echarts/renderers";

// Register the required components
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LineChart,
    CanvasRenderer,
]);
// import ReactECharts from "echarts-for-react"; // import reactecharts

export default function BarChartCSLAB({ theme, series, xAxisLabelsData }) {
    let chartOptions = {
        animationDuration: 3000,
        title: {
            text:
                "Student Registration Report Year " +
                new Date().getFullYear() +
                " ( previous 12 months )",
        },
        tooltip: {},
        xAxis: {
            data: xAxisLabelsData,
        },
        yAxis: {},
        series: [
            {
                type: "line",
                data: series,
            },
        ],
    };
    // return <ReactECharts theme={theme} option={chartOptions} />;
    return (
        <ReactEChartsCore
            echarts={echarts}
            option={chartOptions}
            // notMerge={true}
            lazyUpdate={true}
            theme={theme}
            // onChartReady={this.onChartReadyCallback}
            // onEvents={EventsDict}
            // opts={}
        />
    );
}
