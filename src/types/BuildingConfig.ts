// 건물 구성 - 위치(x, y), 넓이(w, h), 벽높이(wall height), 컬러
export interface BuildingConfig {
    x: number;
    y: number;
    width: number;
    height: number;
    wallHeight: number;
    wallColor: number;
    roofColor: number;
    baseColor: number;
}