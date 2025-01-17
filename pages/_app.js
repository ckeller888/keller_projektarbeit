import React, { useState } from "react";
import { Button, Container, Stack } from "@mui/material";
import TableView from "../table-components/AppTable";
import BarChartView from "../chart-components/AppBarchart";

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
