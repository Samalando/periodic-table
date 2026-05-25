import './App.css'
import elementsData from '../src/assets/PeriodicTableJSON.json';
import ElementModal from "../ElementModal";
import {useState} from "react";
import '@google/model-viewer';


const categoryColors = {
    'actinide': 'hsl(35, 94%, 55%)',
    'lanthanide': 'hsl(196, 32%, 54%)',
    'noble-gas': 'hsl(335, 67%, 60%)',
    'nonmetal': 'hsl(215, 67%, 69%)',
    'metalloid': 'hsl(40, 43%, 52%)',
    'post-transition-metal': 'hsl(128, 46%, 61%)',
    'transition-metal': 'hsl(262, 71%, 68%)',
    'alkine-earth-metal': 'hsl(0, 63%, 63%)',
    'alkali-metal': 'hsl(161, 43%, 74%)',
}

const getCategory = (category) => {
  const match = Object.keys(categoryColors).find(key => category.includes(key));
  return match ? categoryColors[match] : '#888888';
}


function Square({Name, Symbol, AtomicNumber, onElementClick, onMouseEnter, onMouseLeave, category, column, row, cpkHex}) {
    return (
        <button
            className={`square ${category}`}
            onClick={onElementClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
                gridColumn: column,
                gridRow: row,
                '--hover-color': cpkHex ? `#${cpkHex}` : getCategory(category),
            }}
        >
            <div className="square-content">
                <div className="atomic-number">{AtomicNumber}</div>
                <div className="symbol">{Symbol}</div>
                <div className="name">{Name}</div>
            </div>
        </button>
    );
}

function RGBHSL(color){
    // Source - https://gist.github.com/mjackson/5311256
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);

    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if(max === min){
        h = s = 0; // achromatic
    }else{
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    h *= 360;
    s *= 100;
    l *= 100;

    return `hsl(${h}, ${s}%, ${l}%)`;
}


function Legend({ bg, border, text }){
    return(
    <div>
        <div style={{
            backgroundColor: bg,
            border: `2px solid color-mix(in hsl, ${border} 70%, black)`,
            width: "0.75rem",
            height: "0.75rem",
            borderRadius: "1rem",
            flexShrink: 0
        }}>
        </div>
        <p> {text} </p>
    </div>)
}

function App() {
    const [selectedElement, setSelectedElement] = useState(null);
    const elements = elementsData.elements;
    const [hoveredColor, setHoveredColor] = useState(null);
    const getPreviewColor = () => {
        if (!hoveredColor) {
            return '#000000';
        }
        if (hoveredColor.cpkHex) {
            return `#${hoveredColor.cpkHex}`;
        }
        return getCategory(hoveredColor.category);
    };

    return (
        <div className="App">

            <div>
                <div className="periodic-table">
                    {elements.map((element) => (
                        <Square key={element.number}
                                style={{'--hover-color': `#${element.cpkHex}`}}
                                onMouseEnter={() => setHoveredColor(element)}
                                onMouseLeave={() => setHoveredColor(null)}
                                Name={element.name}
                                Symbol={element.symbol}
                                category={element.category}
                                AtomicNumber={element.number}
                                column={element.xpos}
                                row={element.ypos}
                                cpkHex={element.cpkHex}
                                onElementClick={() => setSelectedElement(element)}
                        />
                    ))}
                </div>
                <br/>
                <div className="categories">
                    <Legend
                        bg={categoryColors["noble-gas"]}
                        border={categoryColors["noble-gas"]}
                        text='Noble Gas' />
                    <Legend
                        bg={categoryColors.actinide}
                        border={categoryColors.actinide}
                        text='Actinide'
                    />
                    <Legend
                        bg={categoryColors.lanthanide}
                        border={categoryColors.lanthanide}
                        text='Lanthanide'
                    />
                    <Legend
                        bg={categoryColors.nonmetal}
                        border={categoryColors.nonmetal}
                        text='Non-metal'
                    />
                    <Legend
                        bg={categoryColors.metalloid}
                        border={categoryColors.metalloid}
                        text='Metalloid'
                    />
                    <Legend
                        bg={categoryColors["post-transition-metal"]}
                        border={categoryColors["post-transition-metal"]}
                        text='Post Transition Metal'
                    />
                    <Legend
                        bg={categoryColors["transition-metal"]}
                        border={categoryColors["transition-metal"]}
                        text='Transition Metal'
                    />
                    <Legend
                        bg={categoryColors["alkine-earth-metal"]}
                        border={categoryColors["alkine-earth-metal"]}
                        text='Alkaline Earth Metal'
                    />
                    <Legend
                        bg={categoryColors["alkali-metal"]}
                        border={categoryColors["alkali-metal"]}
                        text='Alkali Metal'
                    />
                    <Legend
                        bg={getPreviewColor()}
                        border={RGBHSL(getPreviewColor())}
                        text='CPK Coloring'
                    />
                </div>
                <hr/>

                    <h3>
                        What is the periodic table?
                    </h3>
                <p>
                    The periodic table of elements is a table for all 118 chemical elements. The table is divided into 4 blocks. These 4 blocks are the s-block, f-block, d-block, and p-block, except for Helium, which is in the s-block due to its electron configuration, but in the p-block due to being a noble gas.
                    These blocks are named this because of their atomic orbit. <a href="https://wikipedia.org/wiki/Atomic_orbital">source</a> <br/>
                    Normally, the f-block is moved to the bottom of the page to save horizontal space.
                    The layout is very specific. Vertically, the table is sorted into 18 columns called groups. These groups represent the amount of valence energy, the extra electrons in an atom. <br/>
                    Horizontally, the table is sorted into 7 rows called periods. These groups represent the number of electron shells.
                    Our modern periodic table wasn't the first. The most historical table is Dmitri Mendeleev's. It was the first one that sorted elements into groups and periods. It had empty spaces for theorized elements, and led to the one we have today.
                    Currently, the periodic table contains 118 elements. <br/> Beyond this, we currently don't know if it's possible to have more, due to stability limits.
                </p>
                <hr/>

                <ElementModal
                    element={selectedElement}
                    onClose={() => setSelectedElement(null)}
                />


                <details>
                    <summary>Sources</summary>
                    <ul>
                   <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/Bowserinator/Periodic-Table-JSON">Atomic info</a></li>
                       <li><a target="_blank" rel="noopener noreferrer" href="https://stem.signalgarden.com/">3d Models</a></li>
                           <li><a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Periodic_table">Periodic table</a></li>
                               <li><a target="_blank" rel="noopener noreferrer" href="https://claude.ai">Claude</a> was used to assist with debugging. No AI-generated content is directly displayed.</li>
                        <li><a target="_blank" rel="noopener noreferrer" href="https://https://github.com/Samalando/periodic-table"> Source Code</a> </li>
                        </ul>
                </details>
            </div>

        </div>
    )
}

export default App
