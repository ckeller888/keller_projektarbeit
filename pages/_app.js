
// import MapAPI from "./map/MapAPI";
// function App() {
//     return (
//         <>
//             <MapAPI />
//         </>
//     );
// }
// export default App;



// import { VegaViewerAPI } from "./components/VegaViewerAPI";
// function App() {
//     return (
//         <>
//             <VegaViewerAPI />
//         </>
//     );
// }
// export default App;



// FUNKTIONIERT VL ÜBERPRÜFEN
// import AppBarchart from "./chart/AppBarchart";
// function App() {
//     return (
//         <>
//             <AppBarchart />
//         </>
//     );
// }
// export default App;




// FUNKTIONIERT
// import AppTable from "./table/AppTable";
// function App() {
//     return (
//         <>
//             <AppTable />
//         </>
//     );
// }
// export default App;


import React, { useState } from "react";
import { Button, Container, Stack } from "@mui/material";
// import MapView from "../map-components/MapAPI";
import TableView from "../data-components/table/AppTable";
import BarChartView from "../data-components/chart/AppBarchart";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"

const MapView = dynamic(() => import("../map-components/AppMap"), { ssr: false });

export default function App() {
    const [view, setView] = useState("map");

    const toggleView = (viewType) => {
        setView(viewType);
    };

    return (
        <Container>
            <h1>Tägliche Meteodaten vom Jahr 2023 </h1>
            <p>Wie möchten Sie die Daten anschauen? </p>
            <Stack direction="row" spacing={2} justifyContent="left" marginTop={2}>
                <Button
                    variant="contained"
                    onClick={() => toggleView("map")}
                    disabled={view === "map" && <MapView />}

                >
                    Karte anzeigen
                </Button>
                <Button
                    variant="contained"
                    onClick={() => toggleView("table")}
                    disabled={view === "table" && <TableView />}
                >
                    Tabelle anzeigen
                </Button>
                <Button
                    variant="contained"
                    onClick={() => toggleView("barchart")}
                    disabled={view === "barchart" && <BarChartView />}
                >
                    Diagramm anzeigen
                </Button>
            </Stack>

            <div style={{ marginTop: 20 }}>
                {view === "map" && <MapView />}
                {view === "table" && <TableView />}
                {view === "barchart" && <BarChartView />}
            </div>
        </Container >
    );
}
