import { matrix, toBase } from "./generativeFunctions";

type getFontNumberT = {
    x: number,
    element: any
}

export const getFontNumber = ({
    x,
    element
}: getFontNumberT) => {

    let number;
    let n = 6;
    let k = 4;

    function map(value: number, start1: number, stop1: number, start2: number, stop2: number, interval: number): number {
        const scaledValue = start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
        const adjustedValue = Math.round(scaledValue / interval) * interval;
        return start2 < stop2 ? Math.min(adjustedValue, stop2) : Math.max(adjustedValue, stop2);
    }

    if(element.current) {
        const rect = element.current.getBoundingClientRect();
        const mouseX = x - rect.left;

        // Ajusta el valor del 'interval' según el cambio deseado 
        const interval = 10;

        // Mapear la posición del ratón en X al rango de 0 a 1295 con intervalos de 10 en 10 
        const mappedX = map(mouseX, 0, rect.width, 0, 1295, interval);
        const roundedX = Math.round(mappedX);

        // Puedes usar roundedX y roundedY como desees o establecerlos en el estado 
        number = roundedX;

        let a = toBase(number, n, k);
        const matrice = matrix(a, 2).map((string) => string)
        
        return matrice.filter(Boolean);
    }
      
}