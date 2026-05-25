
export default function ElementModal({ element}) {
    if (!element) return null;
    const lang= navigator.language;
    console.log(lang);
    return (


        <div className="modal-overlay">
            <div className="modal-content">
                <model-viewer
                    src={element.bohr_model_3d}
                    camera-controls
                    autoplay
                >
                </model-viewer>

                <div style={{ minWidth: '0', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1 style={{ margin: 0 }}>{element.name}</h1>
                        {element.hazard && element.hazard.map((h) => (
                            <img key={h} src={`/hazards/${h}.svg`} alt={h} style={{ width: '70px', height: '70px', padding: 0 }} />
                        ))}
                    </div>

                    <p> {element.summary} {element.appearance
                        ? ` Typically, it appears as a ${element.appearance}.`
                        : " Its physical appearance is currently unknown."} </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div><strong> Atomic Mass:</strong> {element.atomic_mass}</div>
                        <div><strong> Boiling Point:</strong> {element.boil ?? "unknown"}</div>
                        <div><strong> Melting Point:</strong> {element.melt ?? "unknown"} </div>
                        <div><strong> Density:</strong> {element.density ?? "unknown"} </div>
                        <div><strong> Discovered By:</strong> {element.discovered_by} </div>
                        <div><strong> Named By:</strong> {element.named_by ?? "unknown"} </div>
                    </div>
                    <strong> Electronic Distribution:</strong> <span dangerouslySetInnerHTML={{
                    __html: element.electron_configuration?.replace(/([spdf])(\d+)/g, '$1<sup>$2</sup>') ?? "unknown"
                }} />

                </div>
            </div>
            <hr />
        </div>
    )
}