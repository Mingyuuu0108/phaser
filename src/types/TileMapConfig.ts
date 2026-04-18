export interface TileLayer {
    name: string;
    tilesetKey: string;  // "floors" | "walls"
    depth: number;
    data: number[][];
}

export interface TileMapConfig {
    tileWidth: number;
    tileHeight: number;
    layers: TileLayer[];
}