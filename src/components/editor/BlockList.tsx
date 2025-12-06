import { useState, useEffect } from 'react';
import type { Block, ComponentDefinition } from '../../utils/editorApi';

interface BlockListProps {
    blocks: Block[];
    selectedIndex: number | null;
    onSelectBlock: (index: number) => void;
    onAddBlock: (block: Block) => void;
    onDeleteBlock: (index: number) => void;
    onReorderBlocks: (fromIndex: number, toIndex: number) => void;
    componentRegistry: ComponentDefinition[];
}

export default function BlockList({ 
    blocks, 
    selectedIndex, 
    onSelectBlock, 
    onAddBlock, 
    onDeleteBlock, 
    onReorderBlocks, 
    componentRegistry = [] 
}: BlockListProps) {
    const [newBlockType, setNewBlockType] = useState('');
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    // Set default block type when registry loads
    useEffect(() => {
        if (componentRegistry.length > 0 && !newBlockType) {
            setNewBlockType(componentRegistry[0].type);
        }
    }, [componentRegistry, newBlockType]);

    const handleAddBlock = () => {
        const component = componentRegistry.find(c => c.type === newBlockType);
        if (!component) return;

        const newBlock: Block = {
            type: newBlockType,
            data: component.defaultData,
        };
        onAddBlock(newBlock);
    };

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === dropIndex) return;

        onReorderBlocks(draggedIndex, dropIndex);
        setDraggedIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const getBlockPreview = (block: Block): string => {
        const data = block.data as Record<string, unknown>;
        switch (block.type) {
            case 'HeroSection':
                return (data.title as string) || 'Untitled Hero';
            case 'FeaturesGrid':
                return `${(data.items as unknown[])?.length || 0} features`;
            case 'NewsletterSignup':
                return (data.ctaText as string) || 'Newsletter';
            case 'Header':
                return 'Header';
            case 'Hero':
                return (data.title as string) || 'Hero';
            case 'VehicleGrid':
                return (data.title as string) || 'Vehicle Grid';
            case 'ContentSection':
                return (data.title as string) || 'Content Section';
            case 'Footer':
                return 'Footer';
            case 'DynamicRenderer':
                return 'Dynamic Content';
            default:
                return block.type;
        }
    };

    return (
        <div className="blocks-panel panel">
            <div className="panel-header">
                <h2 className="panel-title">Blocks</h2>
                <span className="text-muted text-small">{blocks.length} total</span>
            </div>

            <div className="block-list">
                {blocks.length === 0 ? (
                    <div className="empty-state" style={{ padding: 'var(--space-xl)' }}>
                        <p className="text-muted text-small">No blocks yet. Add one below!</p>
                    </div>
                ) : (
                    blocks.map((block, index) => (
                        <div
                            key={index}
                            className={`block-item ${selectedIndex === index ? 'selected' : ''} ${draggedIndex === index ? 'dragging' : ''}`}
                            onClick={() => onSelectBlock(index)}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragEnd={handleDragEnd}
                        >
                            <span className="drag-handle" title="Drag to reorder">⋮⋮</span>
                            <div className="block-info">
                                <div className="block-type">{block.type}</div>
                                <div className="block-preview">{getBlockPreview(block)}</div>
                            </div>
                            <div className="block-actions">
                                <button
                                    className="small danger"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteBlock(index);
                                    }}
                                    title="Delete block"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="add-block-section">
                <label htmlFor="block-type-select">Add New Block</label>
                <div className="add-block-controls">
                    <select
                        id="block-type-select"
                        className="block-type-select"
                        value={newBlockType}
                        onChange={(e) => setNewBlockType(e.target.value)}
                    >
                        {componentRegistry.length === 0 ? (
                            <option value="">Loading components...</option>
                        ) : (
                            componentRegistry.map(comp => (
                                <option key={comp.type} value={comp.type}>
                                    {comp.icon ? `${comp.icon} ` : ''}{comp.label}
                                </option>
                            ))
                        )}
                    </select>
                    <button className="primary" onClick={handleAddBlock}>
                        + Add
                    </button>
                </div>
            </div>
        </div>
    );
}

