// src/pages/CharacterPanelPage.jsx

import React, {useState, useRef, useCallback} from 'react';
import {Link} from 'react-router-dom';
import {toPng} from 'html-to-image';
import ArrowLeftIcon from '../components/ArrowLeftIcon';
import HexagonStatChart from '../components/HexagonStatChart';

const gradeMapping = {
    'A': 100, 'B': 80, 'C': 60, 'D': 40, 'E': 20,
};
const grades = Object.keys(gradeMapping);

const initialStatGrades = {
    "力": "C", "速": "B", "智": "A", "防": "D", "法": "B", "抗": "E",
};

function CharacterPanelPage() {
    const [statGrades, setStatGrades] = useState(initialStatGrades);
    // 修正：我们需要两个 ref，一个指向图表，一个指向面板以获取背景色
    const panelRef = useRef(null);
    const chartRef = useRef(null);

    const handleGradeChange = (statName, grade) => {
        setStatGrades(prev => ({...prev, [statName]: grade}));
    };

    const numericalStats = Object.fromEntries(
        Object.entries(statGrades).map(([name, grade]) => [name, gradeMapping[grade]])
    );

    // 修正：导出功能现在只针对图表，并从面板获取背景色，以避免导出多余的空白
    const handleExport = useCallback(() => {
        if (chartRef.current === null || panelRef.current === null) {
            return;
        }

        // 动态获取面板当前的背景颜色
        const panelBackgroundColor = window.getComputedStyle(panelRef.current).backgroundColor;

        toPng(chartRef.current, { // 目标是图表容器
            cacheBust: true,
            pixelRatio: 3, // 使用高像素比，确保图片清晰
            backgroundColor: panelBackgroundColor, // 应用从面板获取的背景色
        })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = 'character-chart.png'; // 文件名也更精确
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.error('导出图片失败!', err);
                alert('抱歉，导出图片时遇到问题。');
            });
    }, [panelRef, chartRef]);

    return (
        <>
            {/* 页眉部分保持不变 */}
            <div className="page-header">
                <Link to="/tdoa" className="back-link" title="返回冒险家日记">
                    <ArrowLeftIcon/>
                </Link>
                <h1>角色面板生成器</h1>
            </div>

            <div style={{lineHeight: '1'}}>
                <p><strong>注：</strong>请使用浅色模式导出，否则会有神秘 BUG！</p>
                <p>记得 CCB</p>
            </div>

            {/* 将 ref 附加到面板容器上 */}
            <div className="character-panel" ref={panelRef}>
                <div className="generator-layout">
                    {/* 将 chartRef 附加到图表的直接容器上 */}
                    <div className="chart-container" ref={chartRef}>
                        <HexagonStatChart stats={numericalStats} grades={statGrades}/>
                    </div>
                    <div className="stat-controls">
                        {Object.entries(statGrades).map(([name, grade]) => (
                            <div key={name} className="stat-item">
                                <label htmlFor={name}>{name}</label>
                                <div className="select-wrapper">
                                    <select id={name} value={grade}
                                            onChange={(e) => handleGradeChange(name, e.target.value)}>
                                        {grades.map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* 导出按钮 */}
                <button onClick={handleExport} className="export-button">
                    导出图片
                </button>
            </div>
        </>
);
}

export default CharacterPanelPage;