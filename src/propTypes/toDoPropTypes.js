import T from 'prop-types';

export const ToDoPropTypes = {
    id: T.string.isRequired,
    title: T.string.isRequired,
    isCompleted: T.bool,
    isFavorite: T.bool
};