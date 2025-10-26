import React from 'react';
import '../styles/SlabLevelTable.css';

const SlabLevelTable = ({ slabs, onEdit, onDelete, loading }) => {
    if (loading) {
        return <div className="table-loading">Loading...</div>;
    }

    if (slabs.length === 0) {
        return (
            <div className="table-empty">
                No slab levels found. Create your first one!
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className="slab-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Slab Level</th>
                        <th>Upper Range</th>
                        <th>Status</th>
                        <th>Created User</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {slabs.map((slab) => (
                        <tr key={slab.id}>
                            <td>{slab.id}</td>
                            <td className="slab-level">{slab.slab_level}</td>
                            <td>{slab.upper_range}</td>
                            <td>
                                <span className={`status-badge ${slab.status.toLowerCase()}`}>
                                    {slab.status}
                                </span>
                            </td>
                            <td>{slab.created_user}</td>
                            <td className="created-date">
                                {new Date(slab.created_at).toLocaleString()}
                            </td>
                            <td>
                                <div className="action-buttons">
                                    <button
                                        onClick={() => onEdit(slab)}
                                        className="btn-edit"
                                        title="Edit"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => onDelete(slab.id)}
                                        className="btn-delete"
                                        title="Delete"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SlabLevelTable;