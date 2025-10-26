import React, { useState, useEffect } from 'react';
import '../styles/SlabLevelForm.css';

const SlabLevelForm = ({ show, onClose, onSubmit, editData }) => {
    const [formData, setFormData] = useState({
        slab_level: '',
        upper_range: '',
        status: 'Active',
        created_user: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editData) {
            setFormData({
                slab_level: editData.slab_level,
                upper_range: editData.upper_range,
                status: editData.status,
                created_user: editData.created_user
            });
        } else {
            setFormData({
                slab_level: '',
                upper_range: '',
                status: 'Active',
                created_user: ''
            });
        }
        setErrors({});
    }, [editData, show]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.slab_level.trim()) {
            newErrors.slab_level = 'Slab level is required';
        }

        if (!formData.upper_range) {
            newErrors.upper_range = 'Upper range is required';
        } else if (isNaN(formData.upper_range) || parseFloat(formData.upper_range) <= 0) {
            newErrors.upper_range = 'Upper range must be a positive number';
        }

        if (!formData.created_user.trim()) {
            newErrors.created_user = 'Created user is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{editData ? 'Edit Slab Level' : 'Add New Slab Level'}</h2>
                    <button onClick={onClose} className="btn-close">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="slab-form">
                    <div className="form-group">
                        <label>
                            Slab Level <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="slab_level"
                            value={formData.slab_level}
                            onChange={handleInputChange}
                            placeholder="e.g., Level01"
                            className={errors.slab_level ? 'error' : ''}
                        />
                        {errors.slab_level && (
                            <span className="error-message">{errors.slab_level}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>
                            Upper Range <span className="required">*</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            name="upper_range"
                            value={formData.upper_range}
                            onChange={handleInputChange}
                            placeholder="e.g., 10000"
                            className={errors.upper_range ? 'error' : ''}
                        />
                        {errors.upper_range && (
                            <span className="error-message">{errors.upper_range}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>
                            Status <span className="required">*</span>
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>
                            Created User <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="created_user"
                            value={formData.created_user}
                            onChange={handleInputChange}
                            placeholder="Enter username"
                            className={errors.created_user ? 'error' : ''}
                        />
                        {errors.created_user && (
                            <span className="error-message">{errors.created_user}</span>
                        )}
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">
                            Cancel
                        </button>
                        <button type="submit" className="btn-submit">
                            {editData ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SlabLevelForm;