import React, {useEffect, useState} from 'react';
import T from 'prop-types';

export const ToDoInput = React.forwardRef(({onAdd, placeholder}, ref) => {
    const [value, setInputValue] = useState('');

    useEffect(() => {
        if(ref) {
            ref.current.focus()
        }
    }, [ref]);

    const onChange = event => setInputValue(event.target.value);

    const onSubmit = event => {
        event.preventDefault();
        if (!value) return;
        onAdd(value);
        setInputValue('');
    };

    return (
        <form onSubmit={onSubmit}>
            <input {...{ref}} type="text" className='input' {...{value}} onChange={onChange} placeholder={placeholder}/>
        </form>
    );
});

ToDoInput.propTypes = {
    onAdd: T.func.isRequired,
    placeholder: T.string
};

ToDoInput.defaultProps = {
    placeholder: 'Start typing...'
};