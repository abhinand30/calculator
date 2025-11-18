import React, { useState } from "react";
import Modal from "../components/Modal";

const CompoundComponents = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Open Modal
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <Modal.Header>Hello 👋</Modal.Header>
                <Modal.Content> <p>This is a Tailwind modal component!</p></Modal.Content>
                <Modal.Action onClose={() => setModalOpen(false)}> <button
                    onClick={() => setModalOpen(false)}
                    className="mt-4 px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                    Close
                </button> </Modal.Action>

            </Modal>
        </div>
    );
};

export default CompoundComponents;
