// Google Maps のカスタムスタイル設定
// 必要なもののみ画面に表示する

export const customMapStyle = [
  // すべてのラベルを一旦非表示
  { elementType: "labels", stylers: [{ visibility: "off" }] },
  // 道路のラベルを非表示
  {
    featureType: "road",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  // 交通機関を非表示
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
  // 小さい建物のラベルを非表示
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.business",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  // 市区町村名を表示
  {
    featureType: "administrative.locality",
    elementType: "labels.text",
    stylers: [{ visibility: "on" }, { weight: "bold" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ visibility: "on" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.stroke",
    stylers: [{ visibility: "on" }],
  },
  // 都道府県名を表示
  {
    featureType: "administrative.province",
    elementType: "labels.text",
    stylers: [{ visibility: "on" }],
  },
];
