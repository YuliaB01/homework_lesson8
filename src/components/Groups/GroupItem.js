import React from 'react';
import Icon from '../common/Icon';
import {store} from '../../stores/RootStore';
import {observer} from 'mobx-react';
import T from 'prop-types';
import {GroupPropTypes} from '../../propTypes/groupPropTypes';

const GroupItem = ({group}) => {
    const onClick = () => {
        store.groups.toggleSelected(group);
    };

    return (
        <li className={group.isSelected ? 'isSelected groupItem' : 'groupItem'} onClick={onClick}>
            <div className="img">
                <Icon name={group.type === 'predefined' ? 'star' : 'list'} size='20px' color='#3079cf'/>
            </div>
            <span className="text">{group.title}</span>
            {group.todos.length ? <span>{group.todos.length}</span> : null}
        </li>
    );
};

GroupItem.propTypes = {
    group: T.shape({...GroupPropTypes})
};

export default observer(GroupItem);