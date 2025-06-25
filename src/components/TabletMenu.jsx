import React from 'react';

const TabletMenu = ({ sections, onSelect }) => {
    return (
        <div className="w-screen h-screen bg-[#f5f2f0] text-[#3b2e26] p-8 font-sans">
            <h2 className="text-3xl font-bold text-[#976a4d] mb-6 border-b border-[#976a4d]/40">What We Offer</h2>
            <ul className="space-y-4 text-lg">
                {sections.map((section, index) => (
                    <li
                        key={index}
                        onClick={() => onSelect(index)}
                        className="cursor-pointer px-5 py-3 rounded-lg bg-white shadow
             hover:bg-[#976a4d]/10 active:bg-[#976a4d]/20 focus:bg-[#976a4d]/20
             transition outline-none"
                        tabIndex={0} // klavye ve dokunma için focus almasını sağlar
                    >
                        {section.title}
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default TabletMenu;