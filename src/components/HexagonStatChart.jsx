// src/components/HexagonStatChart.jsx

import React from 'react';

/**
 * 动态生成内联样式，确保在导出时SVG样式能被正确应用。
 * @returns {string} - 包含已解析颜色值的CSS样式字符串。
 */
const getEmbeddedSvgStyles = () => {
    // 在非浏览器环境中（如SSR）直接返回空字符串
    if (typeof window === 'undefined') return '';

    const rootStyle = getComputedStyle(document.documentElement);
    const gridColor = rootStyle.getPropertyValue('--chart-grid-color').trim();
    const fillColor = rootStyle.getPropertyValue('--chart-fill-color').trim();
    const linkColor = rootStyle.getPropertyValue('--link-color').trim();
    const labelColor = rootStyle.getPropertyValue('--chart-label-color').trim();

    // 返回一个完整的、包含具体颜色值的 <style> 内容
    return `
        .chart-grid line, .chart-grid polygon { stroke: ${gridColor}; stroke-width: 1px; fill: none; }
        .chart-stat-area { fill: ${fillColor}; stroke: ${linkColor}; stroke-width: 2px; }
        .chart-labels text { fill: ${labelColor}; font-size: 14px; font-weight: 600; }
    `;
};

// 定义六个顶点的标签 (力、速、智、防、法、抗)
const statLabels = ["力", "速", "智", "防", "法", "抗"];

function HexagonStatChart({ stats, grades, size = 200, maxValue = 100 }) {
    const center = size / 2;
    // 调整半径，为更长的标签留出空间
    const radius = center * 0.75;

    // 辅助函数：计算给定角度和半径的点的坐标
    const getPointOnRadius = (angle, r) => {
        const rad = (angle * Math.PI) / 180;
        return {
            x: center + r * Math.cos(rad),
            y: center + r * Math.sin(rad),
        };
    };

    // 计算六边形网格和标签的顶点
    const points = Array.from({ length: 6 }, (_, i) => {
        // 从-90度（顶部）开始，每个点间隔60度
        const angle = -90 + i * 60;
        return getPointOnRadius(angle, radius);
    });

    // 计算内部实际能力多边形的顶点
    const statPolygonPoints = points.map((point, i) => {
        const statName = statLabels[i];
        const statValue = stats[statName] || 0;
        const statRadius = (statValue / maxValue) * radius;
        const angle = -90 + i * 60;
        return getPointOnRadius(angle, statRadius);
    });

    // 将坐标数组转换为 SVG polygon 的 points 字符串
    const toPointsString = (pointArray) =>
        pointArray.map(p => `${p.x},${p.y}`).join(' ');

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* 将解析好的样式直接嵌入SVG中，确保导出时能正确渲染 */}
            <style>{getEmbeddedSvgStyles()}</style>

            {/* 绘制六边形网格 */}
            <g className="chart-grid">
                {/* 绘制从中心到顶点的连线 */}
                {points.map((p, i) => (
                    <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} />
                ))}
                {/* 绘制最外层六边形 */}
                <polygon points={toPointsString(points)} />
                {/* 绘制内层50%处的六边形 */}
                <polygon points={toPointsString(points.map(p => ({
                    x: center + (p.x - center) * 0.5,
                    y: center + (p.y - center) * 0.5,
                })))} />
            </g>

            {/* 绘制能力多边形 */}
            <polygon className="chart-stat-area" points={toPointsString(statPolygonPoints)} />

            {/* 绘制能力标签 */}
            <g className="chart-labels">
                {points.map((p, i) => {
                    const label = statLabels[i];
                    // 从传入的 grades 对象中获取评级
                    const grade = grades[label];
                    return (
                        <text
                            key={i}
                            // 调整标签位置，使其更靠外
                            x={center + (p.x - center) * 1.25}
                            y={center + (p.y - center) * 1.25}
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            {/* 拼接属性名和评级 */}
                            {`${label} ${grade}`}
                        </text>
                    );
                })}
            </g>
        </svg>
    );
}

export default HexagonStatChart;