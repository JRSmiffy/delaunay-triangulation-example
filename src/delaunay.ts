import { Point } from './shape/point';

export class Delaunay {
  public static generatePoints(width: number, height: number, numPoints: number): Point[] {
    const pointSet: Point[] = [];
    const xList: number[] = [];
    const yList: number[] = [];

    for (let i = 1; i <= numPoints; i++) {
      let newPointRequired = true;
      while (newPointRequired) {
        const candidate = this.generateRandomPoint(width, height);

        const uniqueCandidate = !(xList.includes(candidate.x) || yList.includes(candidate.y));
        if (uniqueCandidate) {
          pointSet.push(candidate);
          xList.push(candidate.x);
          yList.push(candidate.y);

          newPointRequired = false;
        } // else console.debug(`Duplicate candidate found! (x: ${candidate.x}, y: ${candidate.y})`);
      }
    }

    return pointSet;
  }

  private static generateRandomPoint(width: number, height: number) {
    const borderRatio = 0.1;
    const xMax = width * (1 - borderRatio);
    const yMax = height * (1 - borderRatio);

    const xMin = width * borderRatio;
    const yMin = height * borderRatio;

    const xCoord = this.randomIntFromInterval(xMin, xMax);
    const yCoord = this.randomIntFromInterval(yMin, yMax);

    return new Point(xCoord, yCoord);
  }

  private static randomIntFromInterval(min: number, max: number) {
    // Note: result is inclusive of min/max
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
