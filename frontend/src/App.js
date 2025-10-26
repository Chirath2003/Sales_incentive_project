import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SlabLevelTable from './components/SlabLevelTable';
import SlabLevelForm from './components/SlabLevelForm';
import { slabAPI } from './api/slabAPI';
import './styles/App.css';

function App() {
    const [slabs, setSlabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        fetchSlabs();
    }, []);

    const fetchSlabs = async () => {
        try {
            setLoading(true);
            const data = await slabAPI.getAllSlabs();
            setSlabs(data);
        } catch (error) {
            toast.error('Error fetching data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditData(null);
        setShowModal(true);
    };

    const handleEdit = (slab) => {
        setEditData(slab);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this slab level?')) {
            return;
        }

        try {
            await slabAPI.deleteSlab(id);
            toast.success('Slab deleted successfully!');
            fetchSlabs();
        } catch (error) {
            toast.error('Error: ' + error.message);
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editData) {
                await slabAPI.updateSlab(editData.id, formData);
                toast.success('Slab updated successfully!');
            } else {
                await slabAPI.createSlab(formData);
                toast.success('Slab created successfully!');
            }
            setShowModal(false);
            fetchSlabs();
        } catch (error) {
            toast.error('Error: ' + error.message);
        }
    };

    return (
        <div className="app-container">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className="content-wrapper">
                <header className="app-header">
                    <div className="header-content">
                        <div>
                            <h1>Slab Level Management</h1>
                            <p>Sales Incentive Automation System</p>
                        </div>
                        <button onClick={handleAdd} className="btn-add">
                            ➕ Add New Slab
                        </button>
                    </div>
                </header>

                <main className="app-main">
                    <SlabLevelTable
                        slabs={slabs}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        loading={loading}
                    />
                </main>
            </div>

            <SlabLevelForm
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleFormSubmit}
                editData={editData}
            />
        </div>
    );
}

export default App;