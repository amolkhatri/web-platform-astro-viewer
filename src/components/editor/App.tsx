import { useState, useEffect, useCallback } from 'react';
import BlockList from './BlockList';
import BlockEditor from './BlockEditor';
import Preview from './Preview';
import ComponentPlayground from './ComponentPlayground';
import { 
    fetchPages, 
    saveDraftPage, 
    publishPage, 
    fetchComponentRegistry, 
    fetchLayouts,
    type Page,
    type Block,
    type ComponentDefinition,
    type Layout
} from '../../utils/editorApi';

export default function App() {
    const [pages, setPages] = useState<Page[]>([]);
    const [currentPage, setCurrentPage] = useState<Page | null>(null);
    const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [componentRegistry, setComponentRegistry] = useState<ComponentDefinition[]>([]);
    const [layouts, setLayouts] = useState<Layout[]>([]);
    const [autosaving, setAutosaving] = useState(false);
    const [showPlayground, setShowPlayground] = useState(false);

    // Load pages, component registry, and layouts on mount
    useEffect(() => {
        loadPages();
        loadComponentRegistry();
        loadLayoutRegistry();
    }, []);

    const loadPages = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchPages();
            setPages(data);
            if (data.length > 0) {
                setCurrentPage(data[0]);
            }
        } catch (err) {
            setError('Failed to load pages. Please check your connection and ensure the API is accessible.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loadComponentRegistry = async () => {
        try {
            const components = await fetchComponentRegistry();
            setComponentRegistry(components);
        } catch (err) {
            setError('Failed to load component registry.');
            console.error(err);
        }
    };

    const loadLayoutRegistry = async () => {
        try {
            const layoutsData = await fetchLayouts();
            setLayouts(layoutsData);
        } catch (err) {
            console.error('Failed to load layouts:', err);
        }
    };

    const handlePageChange = (slug: string) => {
        const page = pages.find((p) => p.slug === slug);
        if (page) {
            setCurrentPage(page);
            setSelectedBlockIndex(null);
        }
    };

    const handleLayoutChange = (layoutId: string) => {
        if (!currentPage) return;
        setCurrentPage({
            ...currentPage,
            layout: layoutId,
        });
    };

    const handleAddBlock = (newBlock: Block) => {
        if (!currentPage) return;

        const updatedBlocks = [...currentPage.blocks, newBlock];
        setCurrentPage({
            ...currentPage,
            blocks: updatedBlocks,
        });
        setSelectedBlockIndex(updatedBlocks.length - 1);
    };

    const handleDeleteBlock = (index: number) => {
        if (!currentPage) return;

        const updatedBlocks = currentPage.blocks.filter((_, i) => i !== index);
        setCurrentPage({
            ...currentPage,
            blocks: updatedBlocks,
        });

        if (selectedBlockIndex === index) {
            setSelectedBlockIndex(null);
        } else if (selectedBlockIndex !== null && selectedBlockIndex > index) {
            setSelectedBlockIndex(selectedBlockIndex - 1);
        }
    };

    const handleUpdateBlock = (updatedBlock: Block) => {
        if (!currentPage || selectedBlockIndex === null) return;

        const updatedBlocks = [...currentPage.blocks];
        updatedBlocks[selectedBlockIndex] = updatedBlock;
        setCurrentPage({
            ...currentPage,
            blocks: updatedBlocks,
        });
    };

    const handleReorderBlocks = (fromIndex: number, toIndex: number) => {
        if (!currentPage) return;

        const updatedBlocks = [...currentPage.blocks];
        const [movedBlock] = updatedBlocks.splice(fromIndex, 1);
        updatedBlocks.splice(toIndex, 0, movedBlock);

        setCurrentPage({
            ...currentPage,
            blocks: updatedBlocks,
        });

        // Update selected index if needed
        if (selectedBlockIndex === fromIndex) {
            setSelectedBlockIndex(toIndex);
        } else if (selectedBlockIndex !== null && selectedBlockIndex > fromIndex && selectedBlockIndex <= toIndex) {
            setSelectedBlockIndex(selectedBlockIndex - 1);
        } else if (selectedBlockIndex !== null && selectedBlockIndex < fromIndex && selectedBlockIndex >= toIndex) {
            setSelectedBlockIndex(selectedBlockIndex + 1);
        }
    };

    // --- Draft autosave behavior ---
    // We autosave the current page as a draft whenever its structure changes.
    const autosaveDraft = useCallback(
        async (page: Page) => {
            if (!page) return;
            try {
                setAutosaving(true);
                await saveDraftPage(page);
            } catch (err) {
                console.error('Autosave draft failed:', err);
            } finally {
                setAutosaving(false);
            }
        },
        []
    );

    // Trigger autosave when the currentPage changes (blocks or layout)
    useEffect(() => {
        if (!currentPage) return;
        // Fire and forget; errors are logged inside autosaveDraft
        autosaveDraft(currentPage);
    }, [currentPage, autosaveDraft]);

    const handleSave = async () => {
        if (!currentPage) return;

        try {
            setSaving(true);
            setError(null);
            setSuccessMessage(null);

            // First ensure the latest state is in the draft store
            await saveDraftPage(currentPage);
            // Then publish the draft to live
            await publishPage(currentPage.slug);

            // Update pages list (live version now matches current draft)
            const updatedPages = pages.map((p) =>
                p.slug === currentPage.slug ? currentPage : p
            );
            setPages(updatedPages);

            setSuccessMessage('Page published successfully!');
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            setError('Failed to publish page. Please try again.');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleNewPage = () => {
        const slug = prompt('Enter page slug (e.g., "about", "contact"):');
        if (!slug) return;

        const title = prompt('Enter page title:') || slug;

        const newPage: Page = {
            slug,
            title,
            blocks: [],
            layout: 'default',
        };

        setPages([...pages, newPage]);
        setCurrentPage(newPage);
        setSelectedBlockIndex(null);
    };

    const handleComponentCreated = () => {
        // Refresh component registry after creating a new component
        loadComponentRegistry();
    };

    if (loading) {
        return (
            <div className="app">
                <div className="loading">Loading pages...</div>
            </div>
        );
    }

    return (
        <div className="app">
            <header className="app-header">
                <h1>🎨 Page Editor</h1>

                <div className="header-controls">
                    {pages.length > 0 && currentPage && (
                        <select
                            className="page-selector"
                            value={currentPage.slug}
                            onChange={(e) => handlePageChange(e.target.value)}
                        >
                            {pages.map((page) => (
                                <option key={page.slug} value={page.slug}>
                                    {page.title || page.slug}
                                </option>
                            ))}
                        </select>
                    )}

                    <button onClick={handleNewPage}>
                        + New Page
                    </button>

                    <button onClick={() => setShowPlayground(true)}>
                        🎨 Component Playground
                    </button>
                </div>

                {currentPage && layouts.length > 0 && (
                    <div className="header-controls">
                        <label htmlFor="layout-selector" style={{ marginRight: '8px' }}>
                            Layout:
                        </label>
                        <select
                            id="layout-selector"
                            className="layout-selector"
                            value={currentPage.layout || 'default'}
                            onChange={(e) => handleLayoutChange(e.target.value)}
                        >
                            {layouts.map((layout) => (
                                <option key={layout.id} value={layout.id}>
                                    {layout.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="header-actions">
                    <button onClick={loadPages} disabled={loading}>
                        🔄 Refresh
                    </button>
                    <button
                        className="primary"
                        onClick={handleSave}
                        disabled={saving || !currentPage}
                    >
                        {saving ? 'Publishing...' : '💾 Publish'}
                    </button>
                </div>
            </header>

            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
            {autosaving && !saving && (
                <div className="info" style={{ textAlign: 'right', padding: '0 1rem' }}>
                    Autosaving draft...
                </div>
            )}

            {!currentPage ? (
                <div className="empty-state" style={{ flex: 1 }}>
                    <div className="empty-state-icon">📄</div>
                    <h2>No Pages Found</h2>
                    <p>Create a new page to get started</p>
                    <button className="primary" onClick={handleNewPage}>
                        + Create Page
                    </button>
                </div>
            ) : (
                <main className="app-main">
                    <BlockList
                        blocks={currentPage.blocks}
                        selectedIndex={selectedBlockIndex}
                        onSelectBlock={setSelectedBlockIndex}
                        onAddBlock={handleAddBlock}
                        onDeleteBlock={handleDeleteBlock}
                        onReorderBlocks={handleReorderBlocks}
                        componentRegistry={componentRegistry}
                    />

                    <Preview
                        blocks={currentPage.blocks}
                        pageSlug={currentPage.slug}
                        layout={currentPage.layout}
                    />

                    <BlockEditor
                        block={selectedBlockIndex !== null ? currentPage.blocks[selectedBlockIndex] : null}
                        onUpdateBlock={handleUpdateBlock}
                        componentRegistry={componentRegistry}
                    />
                </main>
            )}

            {showPlayground && (
                <ComponentPlayground
                    onClose={() => setShowPlayground(false)}
                    onComponentCreated={handleComponentCreated}
                />
            )}
        </div>
    );
}

