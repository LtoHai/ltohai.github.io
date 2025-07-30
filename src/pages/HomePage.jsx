import React from 'react';
import { Link } from 'react-router-dom'; // 注意这里我们用 Link

function HomePage() {
    return (
        <>
            <div className="page-header">
                <h1>LtoHai 的个人主页</h1>
            </div>

            <div style={{ lineHeight: '1' }}>
                <p>欢迎来到我的个人主页，目前这里啥都木有，随便来看看吧！</p>
                <p>我目前正在参与：<strong>FractalDAW</strong> & <strong>冒险家日记</strong> (Bilibili @饼某人mooncake 的项目)</p>
            </div>

            <div style={{ lineHeight: '1', marginTop: '1.5em' }}>
                <p><strong>GitHub:</strong> LtoHai </p>
                <p><strong>邮箱:</strong> xxxltohai@gmail.com </p>
                <p><strong>QQ:</strong> 1526890090 </p>
            </div>

            <hr className="divider" />

            <h2>导航</h2>
            {/* 使用 Link 组件进行内部导航 */}
            <h3><Link to="/tdoa">冒险家日记</Link></h3>
        </>
    );
}

export default HomePage;