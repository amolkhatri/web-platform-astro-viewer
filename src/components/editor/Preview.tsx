import React, { useState, useEffect, useMemo } from 'react';
import type { Block } from '../../utils/editorApi';

interface PreviewProps {
    blocks: Block[];
    pageSlug: string;
    layout?: string;
}

export default function Preview({ blocks, pageSlug, layout }: PreviewProps) {
    const [reloadKey, setReloadKey] = useState(0);

    const normalizedSlug = useMemo(() => {
        if (!pageSlug) return 'home';
        return pageSlug.replace(/^\/+/, '') || 'home';
    }, [pageSlug]);

    // Since we're now in the same Astro app, use relative URLs for preview
    const draftPreviewUrl = `/${normalizedSlug}?draft=true`;
    const livePreviewUrl = `/${normalizedSlug}`;

    // Whenever blocks or layout change, bump the reload key so the iframe reloads the draft URL
    useEffect(() => {
        if (blocks && blocks.length >= 0) {
            setReloadKey((key) => key + 1);
        }
    }, [blocks, layout]);

    return (
        <div className="preview-panel panel">
            <div className="panel-header">
                <h2 className="panel-title">Preview</h2>
                <span className="text-muted text-small">
                    Draft preview (from ?draft=true)
                </span>
                <button
                    className="small secondary"
                    onClick={() => window.open(livePreviewUrl, '_blank', 'noopener,noreferrer')}
                >
                    Open live page ↗
                </button>
            </div>
            <div className="preview-content">
                {blocks.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">👁️</div>
                        <p>Add blocks to see preview</p>
                    </div>
                ) : (
                    <iframe
                        key={reloadKey}
                        title="Page preview"
                        className="preview-iframe"
                        src={draftPreviewUrl}
                    />
                )}
            </div>
        </div>
    );
}

