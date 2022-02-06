import React from 'react';
import { icon } from 'utils/icon';

function Footer() {
    return (
        <div>
            <span>
                {icon.dropdownArrow}
            </span>
            <div>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>...</span>
                <span>10</span>
            </div>
            <span>
                {icon.dropdownArrow}
            </span>
        </div>
    );
}

export default Footer;
