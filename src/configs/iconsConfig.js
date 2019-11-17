import React from 'react';

export const iconsConfig = {
    'apps': ({size, color, ...props}) => (
        <svg xmlns="http://www.w3.org/2000/svg"
             width={size}
             viewBox="0 0 24 24"
             {...props}>
            <path fill={color}
                  d="M16,20H20V16H16M16,14H20V10H16M10,8H14V4H10M16,8H20V4H16M10,14H14V10H10M4,14H8V10H4M4,20H8V16H4M10,20H14V16H10M4,8H8V4H4V8Z"/>
        </svg>
    ),

    'star': ({size, color, ...props}) => (
        <svg xmlns="http://www.w3.org/2000/svg"
             width={size}
             viewBox="0 0 24 24"
             {...props}>
            <path fill={color}
                  d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
        </svg>
    ),

    'list': ({size, color, ...props}) => (
        <svg xmlns="http://www.w3.org/2000/svg"
             width={size}
             viewBox="0 0 24 24"
             {...props}>
            <path fill={color} stroke='1px'
                  d="M21,19V17H8V19H21M21,13V11H8V13H21M8,7H21V5H8V7M4,5V7H6V5H4M3,5A1,1 0 0,1 4,4H6A1,1 0 0,1 7,5V7A1,1 0 0,1 6,8H4A1,1 0 0,1 3,7V5M4,11V13H6V11H4M3,11A1,1 0 0,1 4,10H6A1,1 0 0,1 7,11V13A1,1 0 0,1 6,14H4A1,1 0 0,1 3,13V11M4,17V19H6V17H4M3,17A1,1 0 0,1 4,16H6A1,1 0 0,1 7,17V19A1,1 0 0,1 6,20H4A1,1 0 0,1 3,19V17Z"/>
        </svg>
    ),

    'plus': ({size, color, ...props}) => (
        <svg xmlns="http://www.w3.org/2000/svg"
             width={size}
             viewBox="0 0 24 24"
             {...props}>
            <path fill={color} d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
        </svg>
    )
};