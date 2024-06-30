import React, { useState } from 'react';

interface AddTodoProps {
    onAdd: (name: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
    const [name, setName] = useState('');

    const handleAddClick = () => {
        if (name.trim() !== '') {
            onAdd(name);
            setName('');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter todo name"
            />
            <button onClick={handleAddClick}>Add</button>
        </div>
    );
};

export default AddTodo;