import React from 'react';

function ArrowLeftIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28" // 稍微调大一点尺寸以匹配标题
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor" // 颜色会由 CSS 控制
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
    );
}

export default ArrowLeftIcon;