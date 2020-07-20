import * as React from 'react';

function Covers() {
    return (
        <>
            {/*Black*/}
            <defs>
                <pattern id="CB1" width="6" height="6" patternUnits="userSpaceOnUse">
                    <path d="M3 0L6 3L3 6L0 3Z" fill="black" />
                </pattern>
            </defs>

            {/*Red*/}
            <defs>
                <pattern id="CR1" width="6" height="6" patternUnits="userSpaceOnUse">
                    <path d="M3 0L6 3L3 6L0 3Z" fill="red" />
                </pattern>
            </defs>
        </>
    );
}

export { Covers };
