'use client'

import React, { useState } from 'react';
import styles from './Compiler.module.scss';

interface MetaData {
    id: string;
    cat: string[];
    date: string;
    place: string;
    client: string;
}

interface LinkItem {
    name: string;
    url: string;
}

interface ContentData {
    title: string;
    subtitle: string;
    description: string;
    details: string[];
    link: LinkItem[];
}

export default function ProjectCompiler() {
    const [meta, setMeta] = useState<MetaData>({
        id: '',
        cat: [],
        date: '',
        place: '',
        client: ''
    });

    const [it, setIt] = useState<ContentData>({
        title: '',
        subtitle: '',
        description: '',
        details: [],
        link: []
    });

    const [en, setEn] = useState<ContentData>({
        title: '',
        subtitle: '',
        description: '',
        details: [],
        link: []
    });

    const [activeTab, setActiveTab] = useState<'it' | 'en' | 'meta'>('it');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Sync scroll is a bit complex for React without refs, 
    // but let's focus on independent scrolling as requested first.

    const handleMetaChange = (key: keyof MetaData, value: string | string[]) => {
        setMeta(prev => ({ ...prev, [key]: value }));
    };

    const handleContentChange = (lang: 'it' | 'en', key: keyof ContentData, value: any) => {
        if (lang === 'it') {
            setIt(prev => ({ ...prev, [key]: value }));
        } else {
            setEn(prev => ({ ...prev, [key]: value }));
        }
    };

    const addListItem = (lang: 'it' | 'en', itemType: 'details' | 'link') => {
        if (itemType === 'details') {
            const current = lang === 'it' ? it.details : en.details;
            handleContentChange(lang, 'details', [...current, '']);
        } else {
            const current = lang === 'it' ? it.link : en.link;
            handleContentChange(lang, 'link', [...current, { name: '', url: '' }]);
        }
    };

    const removeListItem = (lang: 'it' | 'en', itemType: 'details' | 'link', index: number) => {
        if (itemType === 'details') {
            const current = lang === 'it' ? it.details : en.details;
            handleContentChange(lang, 'details', current.filter((_, i) => i !== index));
        } else {
            const current = lang === 'it' ? it.link : en.link;
            handleContentChange(lang, 'link', current.filter((_, i) => i !== index));
        }
    };

    const updateListItem = (lang: 'it' | 'en', index: number, value: string) => {
        const current = lang === 'it' ? it.details : en.details;
        const next = [...current];
        next[index] = value;
        handleContentChange(lang, 'details', next);
    };

    const updateLinkItem = (lang: 'it' | 'en', index: number, field: keyof LinkItem, value: string) => {
        const current = lang === 'it' ? it.link : en.link;
        const next = [...current];
        next[index] = { ...next[index], [field]: value };
        handleContentChange(lang, 'link', next);
    };

    const copyToClipboard = () => {
        const data = activeTab === 'it' ? it : activeTab === 'en' ? en : meta;
        navigator.clipboard.writeText(JSON.stringify(data, null, 4));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadJSON = () => {
        const data = activeTab === 'it' ? it : activeTab === 'en' ? en : meta;
        const blob = new Blob([JSON.stringify(data, null, 4)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${activeTab}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const processFileData = (json: any, fileName: string) => {
        try {
            // Identify the type of JSON by keys
            if ('id' in json && 'cat' in json) {
                setMeta({
                    id: json.id || '',
                    cat: Array.isArray(json.cat) ? json.cat : [],
                    date: json.date || '',
                    place: json.place || '',
                    client: json.client || ''
                });
                setActiveTab('meta');
            } else if ('title' in json && 'description' in json) {
                const sanitizedContent = {
                    title: json.title || '',
                    subtitle: json.subtitle || '',
                    description: json.description || '',
                    details: Array.isArray(json.details) ? json.details : [],
                    link: Array.isArray(json.link) ? json.link : []
                };

                if (fileName.includes('it')) {
                    setIt(sanitizedContent);
                    setActiveTab('it');
                } else if (fileName.includes('en')) {
                    setEn(sanitizedContent);
                    setActiveTab('en');
                } else {
                    if (activeTab === 'it') setIt(sanitizedContent);
                    else if (activeTab === 'en') setEn(sanitizedContent);
                    else setIt(sanitizedContent);
                }
            }
        } catch (err) {
            alert('Error processing JSON file.');
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                processFileData(json, file.name);
            } catch (err) {
                alert('Error parsing JSON file. Please make sure it is a valid JSON.');
            }
        };
        reader.readAsText(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (!file || !file.name.endsWith('.json')) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                processFileData(json, file.name);
            } catch (err) {
                alert('Error parsing JSON file.');
            }
        };
        reader.readAsText(file);
    };

    const renderContentForm = (lang: 'it' | 'en') => {
        const data = lang === 'it' ? it : en;
        return (
            <div className={styles.editorColumn}>
                <div className={styles.langBadge}>{lang.toUpperCase()}</div>

                <label>Title</label>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => handleContentChange(lang, 'title', e.target.value)}
                    placeholder="Project Title"
                />

                <label>Subtitle</label>
                <input
                    type="text"
                    value={data.subtitle}
                    onChange={(e) => handleContentChange(lang, 'subtitle', e.target.value)}
                    placeholder="Subtitle / Year / Location"
                />

                <label>Description (use *enter* for new lines in EN if needed)</label>
                <textarea
                    value={data.description}
                    onChange={(e) => handleContentChange(lang, 'description', e.target.value)}
                    placeholder="Project description..."
                />

                <label>Details / Credits</label>
                <div className={styles.dynamicList}>
                    {data.details.map((detail, idx) => (
                        <div key={idx} className={styles.listItem}>
                            <input
                                type="text"
                                value={detail}
                                onChange={(e) => updateListItem(lang, idx, e.target.value)}
                            />
                            <button className={styles.removeBtn} onClick={() => removeListItem(lang, 'details', idx)}>×</button>
                        </div>
                    ))}
                    <button className={styles.addBtn} onClick={() => addListItem(lang, 'details')}>+ Add Detail</button>
                </div>

                <label>Links</label>
                <div className={styles.dynamicList}>
                    {data.link.map((lnk, idx) => (
                        <div key={idx} className={styles.linkItem}>
                            <div className={styles.linkHeader}>
                                <span>Link {idx + 1}</span>
                                <button className={styles.removeBtn} onClick={() => removeListItem(lang, 'link', idx)}>Remove</button>
                            </div>
                            <input
                                type="text"
                                placeholder="Name (e.g. Website, Instagram)"
                                value={lnk.name}
                                onChange={(e) => updateLinkItem(lang, idx, 'name', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="URL"
                                value={lnk.url}
                                onChange={(e) => updateLinkItem(lang, idx, 'url', e.target.value)}
                            />
                        </div>
                    ))}
                    <button className={styles.addBtn} onClick={() => addListItem(lang, 'link')}>+ Add Link</button>
                </div>
            </div>
        );
    };

    return (
        <div
            className={`${styles.container} ${isDragging ? styles.dragging : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {isDragging && (
                <div className={styles.dragOverlay}>
                    <div className={styles.dragMessage}>
                        Drop JSON to Upload
                    </div>
                </div>
            )}
            <header className={styles.header}>
                <h1>Project Compiler Tools</h1>
                <div className={styles.actions}>
                    <label className={styles.uploadBtn}>
                        Upload JSON
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                        />
                    </label>
                    <button className={styles.buttonPrimary} onClick={() => {
                        const id = prompt("Enter Project ID (folder name):");
                        if (id) handleMetaChange('id', id);
                    }}>New Project ID</button>
                </div>
            </header>

            <div className={styles.mainContent}>
                <aside className={styles.sidebar}>
                    <div className={styles.sectionTitle}>Metadata (meta.json)</div>

                    <label>Project ID (folder name)</label>
                    <input
                        type="text"
                        value={meta.id}
                        onChange={(e) => handleMetaChange('id', e.target.value)}
                        placeholder="e.g. infinite_disegni"
                    />

                    <label>Categories (comma separated)</label>
                    <input
                        type="text"
                        value={meta.cat.join(', ')}
                        onChange={(e) => handleMetaChange('cat', e.target.value.split(',').map(s => s.trim()))}
                        placeholder="editorial, web, coding"
                    />

                    <label>Date</label>
                    <input
                        type="text"
                        value={meta.date}
                        onChange={(e) => handleMetaChange('date', e.target.value)}
                        placeholder="A.A. 2023/24"
                    />

                    <label>Place</label>
                    <input
                        type="text"
                        value={meta.place}
                        onChange={(e) => handleMetaChange('place', e.target.value)}
                        placeholder="Milan, Italy"
                    />

                    <label>Client</label>
                    <input
                        type="text"
                        value={meta.client}
                        onChange={(e) => handleMetaChange('client', e.target.value)}
                        placeholder="Private / Agency"
                    />
                </aside>

                <section className={styles.editorsContainer}>
                    {renderContentForm('it')}
                    {renderContentForm('en')}
                </section>
            </div>

            <div className={`${styles.previewPanel} ${isPreviewOpen ? styles.open : ''}`}>
                <div className={styles.previewHeader}>
                    <h3>JSON Preview</h3>
                    <span className={styles.closeBtn} onClick={() => setIsPreviewOpen(false)}>Close</span>
                </div>
                <div className={styles.previewTabs}>
                    <button className={activeTab === 'it' ? styles.active : ''} onClick={() => setActiveTab('it')}>it.json</button>
                    <button className={activeTab === 'en' ? styles.active : ''} onClick={() => setActiveTab('en')}>en.json</button>
                    <button className={activeTab === 'meta' ? styles.active : ''} onClick={() => setActiveTab('meta')}>meta.json</button>
                </div>
                <pre>
                    {JSON.stringify(activeTab === 'it' ? it : activeTab === 'en' ? en : meta, null, 4)}
                </pre>
                <div className={styles.previewActions}>
                    <button className={styles.copyBtn} onClick={copyToClipboard}>
                        {copied ? 'Copied!' : `Copy ${activeTab}.json`}
                    </button>
                    <button className={styles.downloadBtn} onClick={downloadJSON}>
                        Download {activeTab}.json
                    </button>
                </div>
            </div>

            <div className={styles.togglePreviewBtn} onClick={() => setIsPreviewOpen(true)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
            </div>
        </div>
    );
}
