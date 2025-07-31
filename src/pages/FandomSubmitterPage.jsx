// /Users/heisenbergwerner/Projects/TDOA/GithubPage/src/pages/FandomSubmitterPage.jsx

import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import ArrowLeftIcon from '../components/ArrowLeftIcon';
import MarkdownEditor from '../components/WikitextEditor';

/**
 * 一个轻量级、无依赖的转换器，将基础的 Markdown 转换为 Wikitext。
 * @param {string} markdown - 用户输入的 Markdown 文本。
 * @returns {string} - 转换后的 Wikitext。
 */
const markdownToWikitext = (markdown) => {
    if (!markdown) return '';

    let text = markdown;

    // 块级元素 (标题, 列表)
    text = text.replace(/^##\s+(.*)/gm, '== $1 ==');
    text = text.replace(/^###\s+(.*)/gm, '=== $1 ===');
    text = text.replace(/^- (.*)/gm, '* $1');
    text = text.replace(/^\n- (.*)/gm, '\n* $1');

    // 内联元素 (链接, 粗体, 斜体)
    text = text.replace(/\[(.*?)]\((.*?)\)/g, '[$2 $1]');
    text = text.replace(/\*\*\*(.*?)\*\*\*/g, "'''''$1'''''");
    text = text.replace(/\*\*(.*?)\*\*/g, "'''$1'''");
    text = text.replace(/\*(.*?)\*/g, "''$1''");
    text = text.replace(/\/(.*?)\//g, "''$1''");

    // 处理单个换行符
    text = text.replace(/(?<!\n)\n(?!\n)/g, '<br />\n');

    return text;
};

function FandomSubmitterPage() {
    const [pageTitle, setPageTitle] = useState('');
    const [pageContent, setPageContent] = useState('');
    const [buttonText, setButtonText] = useState('生成 Wikitext 并跳转到 Fandom');
    const targetWiki = 'the-diary-of-adventurers';

    const handleGenerateAndGo = () => {
        if (!pageTitle.trim()) {
            alert('请输入页面标题！');
            return;
        }

        const fandomEditUrl = `https://${targetWiki}.fandom.com/zh/wiki/${encodeURIComponent(pageTitle)}?action=edit`;
        window.open(fandomEditUrl, '_blank');

        const wikitextResult = markdownToWikitext(pageContent);

        navigator.clipboard.writeText(wikitextResult).then(() => {
            setButtonText('已复制！请在新页面中粘贴');
            setTimeout(() => {
                setButtonText('生成 Wikitext 并跳转到 Fandom');
            }, 3000);
        }).catch(err => {
            console.error('复制失败: ', err);
            alert('自动复制失败，请在新打开的窗口中手动粘贴。');
        });
    };

    return (
        <>
            <div className="page-header">
                <Link to="/tdoa" className="back-link" title="返回冒险家日记">
                    <ArrowLeftIcon/>
                </Link>
                <h1>Fandom Wiki 提交器</h1>
            </div>

            {/*
              代码质量建议：将所有表单相关元素包裹在 .form-container 中，
              这与您的 index.css 设计相符，结构更清晰。
            */}
            <div className="form-container">
                <p>
                    在此处使用 Markdown 语法编辑您的页面。完成后，点击下方按钮即可跳转到 Fandom 进行最终提交。
                    <br/>
                    目标 Wiki: <strong>{targetWiki}.fandom.com</strong>
                </p>

                {/* 修正：这是标题的 form-group */}
                <div className="form-group">
                    <label htmlFor="pageTitle">页面标题</label>
                    <input
                        type="text"
                        id="pageTitle"
                        value={pageTitle}
                        onChange={(e) => setPageTitle(e.target.value)}
                        placeholder="例如: 饼的馅料之研究"
                    />
                </div>

                {/* 修正：这是内容的 form-group，它应该是标题 form-group 的兄弟元素 */}
                <div className="form-group">
                    <label htmlFor="pageContent">页面内容</label>
                    <MarkdownEditor
                        content={pageContent}
                        setContent={setPageContent}
                    />
                </div>

                {/*
                  代码质量建议：将多个提示整合到一个 .pre-submit-notice 中，
                  并使用 <ul> 列表来展示，而不是用 <br> 和隐藏的 <strong>。
                */}
                <div className="pre-submit-notice">
                    <p>
                        <strong>重要提示：</strong>
                    </p>
                    <ul>
                        <li>在继续之前，请确保您已在 Fandom 网站登录。</li>
                        <li>点击按钮后，内容已自动复制，请在新打开的 Wiki 页面手动粘贴。</li>
                        <li>图片等复杂元素，请在提交后于 Fandom 官方页面上进行编辑。</li>
                        <li>如遇预览不正常的情况，可尝试加个空格，例如<code>**姓名：** (此处加空格) 月饼</code></li>
                    </ul>
                </div>

                <button type="button" className="submit-button" onClick={handleGenerateAndGo}>
                    {buttonText}
                </button>
            </div>
        </>
    );
}

export default FandomSubmitterPage;