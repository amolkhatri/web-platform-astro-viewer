import React from 'react';
import type { Block, ComponentDefinition, ComponentField } from '../../utils/editorApi';

interface BlockEditorProps {
    block: Block | null;
    onUpdateBlock: (block: Block) => void;
    componentRegistry: ComponentDefinition[];
}

export default function BlockEditor({ block, onUpdateBlock, componentRegistry = [] }: BlockEditorProps) {
    if (!block) {
        return (
            <div className="editor-panel panel">
                <div className="panel-header">
                    <h2 className="panel-title">Block Editor</h2>
                </div>
                <div className="empty-state">
                    <div className="empty-state-icon">📝</div>
                    <p>Select a block to edit its properties</p>
                </div>
            </div>
        );
    }

    const component = componentRegistry.find(c => c.type === block.type);

    if (!component) {
        return (
            <div className="editor-panel panel">
                <div className="panel-header">
                    <h2 className="panel-title">Block Editor</h2>
                    <span className="text-muted text-small">{block.type}</span>
                </div>
                <div className="editor-content">
                    <p className="text-muted">Component definition not found. Make sure the API is accessible.</p>
                </div>
            </div>
        );
    }

    const handleChange = (field: string, value: unknown) => {
        onUpdateBlock({
            ...block,
            data: {
                ...block.data,
                [field]: value,
            },
        });
    };

    const handleNestedChange = (parentField: string, childField: string, value: unknown) => {
        const parentData = block.data[parentField] as Record<string, unknown> | undefined;
        onUpdateBlock({
            ...block,
            data: {
                ...block.data,
                [parentField]: {
                    ...(parentData || {}),
                    [childField]: value
                }
            },
        });
    };

    const handleArrayChange = (field: string, index: number, value: unknown) => {
        const newArray = [...((block.data[field] as unknown[]) || [])];
        newArray[index] = value;
        handleChange(field, newArray);
    };

    const handleArrayAdd = (field: string, defaultValue: unknown = '') => {
        const newArray = [...((block.data[field] as unknown[]) || []), defaultValue];
        handleChange(field, newArray);
    };

    const handleArrayRemove = (field: string, index: number) => {
        const newArray = ((block.data[field] as unknown[]) || []).filter((_, i) => i !== index);
        handleChange(field, newArray);
    };

    const handleArrayOfObjectsChange = (field: string, index: number, childField: string, value: unknown) => {
        const newArray = [...((block.data[field] as Record<string, unknown>[]) || [])];
        newArray[index] = {
            ...(newArray[index] || {}),
            [childField]: value
        };
        handleChange(field, newArray);
    };

    const handleArrayOfObjectsAdd = (field: string, fields: ComponentField[]) => {
        const defaultObject: Record<string, unknown> = {};
        fields.forEach(f => {
            defaultObject[f.name] = '';
        });
        const newArray = [...((block.data[field] as unknown[]) || []), defaultObject];
        handleChange(field, newArray);
    };

    const renderField = (field: ComponentField, value: unknown, onChange: (value: unknown) => void): JSX.Element => {
        switch (field.type) {
            case 'text':
            case 'url':
                return (
                    <input
                        type="text"
                        value={(value as string) || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={field.placeholder}
                    />
                );

            case 'number':
                return (
                    <input
                        type="number"
                        value={(value as number) || 0}
                        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
                        placeholder={field.placeholder}
                    />
                );

            case 'textarea':
                return (
                    <textarea
                        value={(value as string) || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={field.placeholder}
                        rows={5}
                    />
                );

            case 'array':
                return (
                    <div className="array-input">
                        {((value as unknown[]) || []).map((item, index) => (
                            <div key={index} className="array-item">
                                {field.itemType === 'textarea' ? (
                                    <textarea
                                        value={item as string}
                                        onChange={(e) => handleArrayChange(field.name, index, e.target.value)}
                                        placeholder={`${field.label} ${index + 1}`}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={item as string}
                                        onChange={(e) => handleArrayChange(field.name, index, e.target.value)}
                                        placeholder={`${field.label} ${index + 1}`}
                                    />
                                )}
                                <button
                                    className="small danger"
                                    onClick={() => handleArrayRemove(field.name, index)}
                                    title="Remove item"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        <div className="array-actions">
                            <button
                                className="small primary"
                                onClick={() => handleArrayAdd(field.name, '')}
                            >
                                {field.addButtonText || '+ Add Item'}
                            </button>
                        </div>
                    </div>
                );

            case 'object':
                return (
                    <div className="object-input">
                        {field.fields?.map(childField => (
                            <div key={childField.name} className="form-group nested">
                                <label htmlFor={`${field.name}-${childField.name}`}>
                                    {childField.label}
                                    {childField.required && <span className="required">*</span>}
                                </label>
                                {renderField(
                                    childField,
                                    ((value as Record<string, unknown>) || {})[childField.name],
                                    (newValue) => handleNestedChange(field.name, childField.name, newValue)
                                )}
                            </div>
                        ))}
                    </div>
                );

            case 'array-of-objects':
                return (
                    <div className="array-of-objects-input">
                        {((value as Record<string, unknown>[]) || []).map((item, index) => (
                            <div key={index} className="object-item">
                                <div className="object-item-header">
                                    <span className="object-item-number">#{index + 1}</span>
                                    <button
                                        className="small danger"
                                        onClick={() => handleArrayRemove(field.name, index)}
                                        title="Remove item"
                                    >
                                        ✕
                                    </button>
                                </div>
                                {field.fields?.map(childField => (
                                    <div key={childField.name} className="form-group nested">
                                        <label htmlFor={`${field.name}-${index}-${childField.name}`}>
                                            {childField.label}
                                            {childField.required && <span className="required">*</span>}
                                        </label>
                                        {renderField(
                                            childField,
                                            (item || {})[childField.name],
                                            (newValue) => handleArrayOfObjectsChange(field.name, index, childField.name, newValue)
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                        <div className="array-actions">
                            <button
                                className="small primary"
                                onClick={() => handleArrayOfObjectsAdd(field.name, field.fields || [])}
                            >
                                {field.addButtonText || '+ Add Item'}
                            </button>
                        </div>
                    </div>
                );

            default:
                return <p className="text-muted">Unknown field type: {field.type}</p>;
        }
    };

    return (
        <div className="editor-panel panel">
            <div className="panel-header">
                <h2 className="panel-title">Block Editor</h2>
                <span className="text-muted text-small">
                    {component.icon && `${component.icon} `}{component.label}
                </span>
            </div>
            <div className="editor-content">
                {/* Server Island Toggle */}
                <div className="form-group checkbox-group" style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={block.serverIsland || false}
                            onChange={(e) => onUpdateBlock({ ...block, serverIsland: e.target.checked })}
                        />
                        <span>Render as Server Island</span>
                    </label>
                    <small style={{ display: 'block', marginTop: '0.25rem', color: '#666' }}>
                        When enabled, this component will be rendered dynamically on the server (server:defer).
                    </small>
                </div>

                {/* Dynamic Form Fields */}
                {component.fields.map(field => (
                    <div key={field.name} className="form-group">
                        <label htmlFor={field.name}>
                            {field.label}
                            {field.required && <span className="required">*</span>}
                        </label>
                        {renderField(field, block.data[field.name], (value) => handleChange(field.name, value))}
                    </div>
                ))}
            </div>
        </div>
    );
}

