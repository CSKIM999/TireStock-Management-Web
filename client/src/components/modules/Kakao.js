import React from "react";
import { Box } from "@mui/material";
const { kakao } = window;
const Kakao = () => {
  React.useEffect(() => {
    let mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(
          // process.env.REACT_APP_LATI,
          // process.env.REACT_APP_LONGI
          37.56178663230552,
          127.0703364061982
        ),
        level: 2,
      };
    let map = new kakao.maps.Map(mapContainer, mapOption);
    let markerPosition = new kakao.maps.LatLng(
      37.56178663230552,
      127.0703364061982
      // process.env.REACT_APP_LATI,
      // process.env.REACT_APP_LONGI
    );
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);

  return (
    <Box
      id="map"
      sx={{ width: "80%", height: "80%", borderRadius: "1rem" }}
    ></Box>
  );
};

export default Kakao;
