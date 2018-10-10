import { build, Collection, getRandomInt } from '@caiu/library';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export class RouletteWheelSpin {
    moment = 0;
    position: PixelPosition = new PixelPosition();
    slot: RouletteWheelSlot = new RouletteWheelSlot();

    get id(): number {
        return this.moment;
    }

    set id(value: number) {
    }

    get slotColor(): string {
        return this.slot.color;
    }

    get slotNumber(): string {
        return this.slot.number;
    }

    set slotNumber(value: string) {
        this.slot.number = value;
    }

}

export class Roulette extends Collection<RouletteWheelSpin> {
    constructor() {
        super(RouletteWheelSpin);
    }

    addSpin(data: RouletteWheelSpin): Roulette {
        const spin = build(RouletteWheelSpin, data, {
            slotNumber: data.slotNumber === '35' && data.slotColor === 'red' ? '25' : data.slotNumber,
        });
        return build(Roulette, this.update(spin));
    }

}

export class RouletteWheel {
    ballDistanceFromCenterInitialOffset = 100;
    ballDistanceFromCenterFinalOffset = 0;
    ballDistanceFromCenterStoppedOffset = 50;
    ballSubject = new BehaviorSubject<RouletteBall>(new RouletteBall());
    lastSpin: RouletteWheelSpin;
    lastSpinSubject = new Subject<RouletteWheelSpin>();
    momentSubject = new BehaviorSubject<number>(0);
    status: 'STOPPED' | 'STARTED' | 'SPINNING' | 'TRANSITIONING' | 'RELOADING' = 'STOPPED';
    stoppedDegreesCounterClockwise = 0;
    stoppedMoment = 0;
    timeInterval;
    timerPeriod = 5;
    totalSpinSeconds = 12;
    _ball: RouletteBall;
    _moment = 0;
    _slots: RouletteWheelSlot[] = [];

    static ArcLength(diameter: number, centralAngle: number): number {
        return Math.PI * diameter * (centralAngle / 360);
    }

    static Degrees2Radians(degrees: number) {
        return Math.PI / 180 * degrees;
    }

    static GetCoordinatesRelativeToCenter(centralAngleDegrees: number, distanceFromCenter: number): PixelCoordinates {
        const radians = RouletteWheel.Degrees2Radians(centralAngleDegrees);
        return build(PixelCoordinates, {
            x: distanceFromCenter * Math.cos(radians),
            y: distanceFromCenter * Math.cos(radians) * Math.tan(radians)
        });
    }

    static GetDegreesCounterClockwiseFromPosition(center: PixelPosition, position: PixelPosition): number {
        const x = position.left - center.left;
        const y = position.top - center.top;
        const theta = RouletteWheel.Radians2Degrees(Math.atan(Math.abs(y) / Math.abs(x)));
        if (x >= 0 && y <= 0) { // Q1
            return 270 + theta;
        } else if (x >= 0 && y >= 0) { // Q2
            return 270 - theta;
        } else if (x <= 0 && y >= 0) { // Q3
            return 90 + theta;
        } else if (x <= 0 && y <= 0) { // Q4
            return 90 - theta;
        }
    }

    static GetMiddleDegrees(startDegrees: number, endDegrees: number): number {
        return endDegrees > startDegrees ? (startDegrees + endDegrees) / 2
            : ((startDegrees + endDegrees + 360) / 2) % 360;
    }

    static GetQuartileDegrees(startDegrees: number, endDegrees: number): number {
        return RouletteWheel.GetMiddleDegrees(startDegrees, RouletteWheel.GetMiddleDegrees(startDegrees, endDegrees));
    }

    static GetPosition(center: PixelPosition, degreesClockwise: number, distanceFromCenter: number): PixelPosition {
        const centralAngle = RouletteWheel.Degrees2CentralAngleClockwise(degreesClockwise);
        const coordinates = RouletteWheel.GetCoordinatesRelativeToCenter(centralAngle, distanceFromCenter);
        return RouletteWheel.GetPositionRelativeToCenter(center, coordinates, degreesClockwise);
    }

    static GetPositionRelativeToCenter(center: PixelPosition, coordinates: PixelCoordinates, degreesClockwise: number): PixelPosition {
        if (degreesClockwise <= 90) {
            return build(PixelPosition, { // Q1
                top: center.top - coordinates.y,
                left: center.left + coordinates.x
            });
        } else if (degreesClockwise <= 180) { // Q2
            return build(PixelPosition, {
                top: center.top + coordinates.y,
                left: center.left + coordinates.x
            });
        } else if (degreesClockwise <= 270) { // Q3
            return build(PixelPosition, {
                top: center.top + coordinates.y,
                left: center.left - coordinates.x
            });
        } else {
            return build(PixelPosition, { // Q4
                top: center.top - coordinates.y,
                left: center.left - coordinates.x
            });
        }
    }

    static Degrees2CentralAngleClockwise(degrees: number): number {
        if (degrees <= 90) { // Q1
            return 90 - degrees;
        } else if (degrees <= 180) { // Q2
            return degrees - 90;
        } else if (degrees <= 270) { // Q3
            return 270 - degrees;
        } else { // Q4
            return degrees - 270;
        }
    }

    static Degrees2CentralAngleCounterClockwise(degrees: number): number {
        if (degrees <= 90) { // Q4
            return 90 - degrees;
        } else if (degrees <= 180) { // Q3
            return degrees - 90;
        } else if (degrees <= 270) { // Q2
            return 270 - degrees;
        } else { // Q1
            return degrees - 270;
        }
    }

    static RotateDegreesClockwise(startDegreesClockwise: number, rotateDegrees: number): number {
        return (startDegreesClockwise + rotateDegrees) % 360;
    }

    static RotateDegreesCounterClockwise(startDegreesClockwise: number, rotateDegrees: number): number {
        return RouletteWheel.RotateDegreesClockwise(startDegreesClockwise, 360 - rotateDegrees);
    }

    static RotateSlot(slot: RouletteWheelSlot, degreesCounterClockwise: number): RouletteWheelSlot {
        const d = (slot.startDegrees - degreesCounterClockwise) % 360;
        const startDegrees = d < 0 ? d + 360 : d;
        const endDegrees = (startDegrees + 360 / 38) % 360;
        return build(RouletteWheelSlot, slot, { startDegrees, endDegrees });
    }

    static RotateSlots(slots: RouletteWheelSlot[], degreesCounterClockwise: number): RouletteWheelSlot[] {
        return slots.map(x => RouletteWheel.RotateSlot(x, degreesCounterClockwise));
    }

    static Radians2Degrees(radians: number) {
        return 180 / Math.PI * radians;
    }

    constructor(
        public diameter = 600,
        public offsetLeft = 0,
        public offsetTop = 0,
        public wheelSecondsPerRevolution = 5,
        public ballSecondsPerRevolution = 2) {
        this.slots = [
            build(RouletteWheelSlot, { number: '00' }),
            build(RouletteWheelSlot, { number: '27' }),
            build(RouletteWheelSlot, { number: '10' }),
            build(RouletteWheelSlot, { number: '25' }),
            build(RouletteWheelSlot, { number: '29' }),
            build(RouletteWheelSlot, { number: '12' }),
            build(RouletteWheelSlot, { number: '8' }),
            build(RouletteWheelSlot, { number: '19' }),
            build(RouletteWheelSlot, { number: '31' }),
            build(RouletteWheelSlot, { number: '18' }),
            build(RouletteWheelSlot, { number: '6' }),
            build(RouletteWheelSlot, { number: '21' }),
            build(RouletteWheelSlot, { number: '33' }),
            build(RouletteWheelSlot, { number: '16' }),
            build(RouletteWheelSlot, { number: '4' }),
            build(RouletteWheelSlot, { number: '23' }),
            build(RouletteWheelSlot, { number: '35' }),
            build(RouletteWheelSlot, { number: '14' }),
            build(RouletteWheelSlot, { number: '2' }),
            build(RouletteWheelSlot, { number: '0' }),
            build(RouletteWheelSlot, { number: '28' }),
            build(RouletteWheelSlot, { number: '9' }),
            build(RouletteWheelSlot, { number: '26' }),
            build(RouletteWheelSlot, { number: '30' }),
            build(RouletteWheelSlot, { number: '11' }),
            build(RouletteWheelSlot, { number: '7' }),
            build(RouletteWheelSlot, { number: '20' }),
            build(RouletteWheelSlot, { number: '32' }),
            build(RouletteWheelSlot, { number: '17' }),
            build(RouletteWheelSlot, { number: '5' }),
            build(RouletteWheelSlot, { number: '22' }),
            build(RouletteWheelSlot, { number: '34' }),
            build(RouletteWheelSlot, { number: '15' }),
            build(RouletteWheelSlot, { number: '3' }),
            build(RouletteWheelSlot, { number: '24' }),
            build(RouletteWheelSlot, { number: '36' }),
            build(RouletteWheelSlot, { number: '13' }),
            build(RouletteWheelSlot, { number: '1' }),
        ];
    }

    get lastSpin$(): Observable<RouletteWheelSpin> {
        return this.lastSpinSubject.asObservable();
    }

    set ball(value: RouletteBall) {
        this._ball = value;
    }

    get ball(): RouletteBall {
        return this._ball || this.ballBeforeSpin;
    }

    get ballBeforeSpin(): RouletteBall { // TODO: make this position random
        const position = RouletteWheel.GetPosition(this.centerPosition, (this.randomSlotNumber * this.slotCentralAngle) % 360, this.ballDistanceFromCenterInitial);
        return build(RouletteBall, { position });
    }

    get ball$(): Observable<RouletteBall> {
        return this.ballSubject.asObservable();
    }

    get ballDegreesTraversedPerMomentAverage(): number { // TODO: read from ball motion model
        return (this.ballRevolutionsPerSpin * 360) / this.momentsPerSpin;
    }

    get ballDistanceTraversedPerSpin(): number {
        return this.ballDistanceFromCenterInitial - this.ballDistanceFromCenterFinal;
    }

    get ballDistanceTraversedPerMomentAverage(): number {
        return this.ballDistanceTraversedPerSpin / this.momentsPerSpin;
    }

    get ballDistanceFromCenter(): number {
        return this.getDistanceFromCenter(this.ball.position);
    }

    get ballDistanceFromCenterInitial(): number {
        return this.radius + this.ballDistanceFromCenterInitialOffset;
    }

    get ballDistanceFromCenterFinal(): number {
        return this.radius - this.ballDistanceFromCenterFinalOffset;
    }

    get ballDistanceFromCenterStopped(): number {
        return this.radius - this.ballDistanceFromCenterStoppedOffset;
    }

    get ballRevolutionsPerSpin(): number { // TODO: read from ball motion model
        return this.totalSpinSeconds * (1 / this.ballSecondsPerRevolution);
    }

    get ballStopped(): boolean {
        return this.ballDistanceFromCenter <= this.ballDistanceFromCenterFinal;
    }

    get centerPosition(): PixelPosition {
        return build(PixelPosition, {
            top: this.offsetTop + this.radius,
            left: this.offsetLeft + this.radius,
        });
    }

    get circumference(): number {
        return Math.PI * this.diameter;
    }

    get lastSlotPosition(): PixelPosition {
        return this.getSlotPosition(this.lastSpin.slotNumber);
    }

    set moment(value: number) {
        this._moment = value;
        this.momentSubject.next(value);
    }

    get moment(): number {
        return this._moment;
    }

    get moment$(): Observable<number> {
        return this.momentSubject.asObservable();
    }

    get momentsPerSecond(): number {
        return 1000 / this.timerPeriod;
    }

    get momentsPerSpin(): number {
        return this.momentsPerSecond * this.totalSpinSeconds;
    }

    get nextBallPosition(): PixelPosition {
        return this.getPositionRelativeToCenter(this.nextBallCoordinatesRelativeToCenter, this.nextBallPositionDegreesTraversed);
    }

    get nextBallCoordinatesRelativeToCenter(): PixelCoordinates {
        return RouletteWheel.GetCoordinatesRelativeToCenter(this.nextBallPositionCentralAngle, this.nextBallPositionDistanceFromCenter);
    }

    get nextBallPositionDegreesTraversed(): number { // TODO: read from ball motion model
        return (this.moment * this.ballDegreesTraversedPerMomentAverage) % 360;
    }

    get nextBallPositionDistanceFromCenter(): number { // TODO: read from ball motion model
        const d = this.ballDistanceFromCenter - this.ballDistanceTraversedPerMomentAverage;
        return Math.max(d, this.ballDistanceFromCenterFinal);
    }

    get nextBallPositionCentralAngle(): number {
        return RouletteWheel.Degrees2CentralAngleClockwise(this.nextBallPositionDegreesTraversed);
    }

    get radius(): number {
        return this.diameter / 2;
    }

    get randomSlotNumber(): number {
        return getRandomInt(38);
    }

    get randomSlotString(): string {
        const r = this.randomSlotNumber;
        return r === 38 ? '00'
            : r === 37 ? '0'
                : r.toString();
    }

    get slotArcLength(): number {
        return RouletteWheel.ArcLength(this.diameter, this.slotCentralAngle);
    }

    get slotCentralAngle(): number {
        return 360 / 38;
    }

    set slots(value: RouletteWheelSlot[]) {
        this._slots = value.map((x, i) => {
            const startDegrees = i === 0 ? 360 - (this.slotCentralAngle / 2)
                : (this.slotCentralAngle) * (i - 1) + (this.slotCentralAngle / 2);
            const endDegrees = (startDegrees + this.slotCentralAngle) % 360;
            return build(RouletteWheelSlot, x, { startDegrees, endDegrees });
        });
    }

    get slots(): RouletteWheelSlot[] {
        return this._slots;
    }

    get spinning(): boolean {
        return this.status === 'SPINNING';
    }

    get started(): boolean {
        return !this.stopped;
    }

    get stopped(): boolean {
        return this.status === 'STOPPED';
    }

    get stoppedDegreesClockwise(): number {
        return 360 - this.stoppedDegreesCounterClockwise;
    }

    get transitioning(): boolean {
        return this.status === 'TRANSITIONING';
    }

    get wheelDegreesPerMoment(): number {
        return (360 / this.wheelSecondsPerRevolution) * (this.timerPeriod / 1000);
    }

    getWheelDegreesTraversedAtPosition(pos: PixelPosition): number { // WHEEL IS MOVING COUNTER-CLOCKWISE!
        const centerLeft = this.centerPosition.left;
        const centerTop = this.centerPosition.top;
        const x = pos.left - centerLeft;
        const y = pos.top - centerTop;
        const theta = RouletteWheel.Radians2Degrees(Math.atan(Math.abs(y) / Math.abs(x)));
        if (x >= 0 && y <= 0) { // Q1
            return 270 + theta;
        } else if (x >= 0 && y >= 0) { // Q2
            return 270 - theta;
        } else if (x <= 0 && y >= 0) { // Q3
            return 90 + theta;
        } else if (x <= 0 && y <= 0) { // Q4
            return 90 - theta;
        }
    }

    getWheelDegreesTraversedAtTime(t: number): number {
        return (t * this.wheelDegreesPerMoment) % 360;
    }

    getDistanceFromCenter(pos: PixelPosition): number {
        return Math.sqrt(Math.pow(this.centerPosition.top - pos.top, 2) + Math.pow(this.centerPosition.left - pos.left, 2));
    }

    getPositionRelativeToCenter(coordinates: PixelCoordinates, degreesTraversedClockwise: number): PixelPosition {
        return RouletteWheel.GetPositionRelativeToCenter(this.centerPosition, coordinates, degreesTraversedClockwise);
    }

    getSlotPosition(slotNumber: string): PixelPosition {
        const slot = RouletteWheel.RotateSlot(this.slots.find(x => x.number === slotNumber), this.getWheelDegreesTraversedAtTime(this.moment));
        return slot.getBallPosition(this.centerPosition, this.radius);
    }

    slotAtTimeAndDegrees(t: number, degrees: number): RouletteWheelSlot {
        return this.slotsAtTime(t).find(x => x.inSlot(360 - degrees));
    }

    slotAtTimeAndPosition(t: number, pos: PixelPosition): RouletteWheelSlot {
        const degrees = this.getWheelDegreesTraversedAtPosition(pos);
        return this.slotAtTimeAndDegrees(t, degrees);
    }

    slotsAtTime(t: number): RouletteWheelSlot[] {
        return RouletteWheel.RotateSlots(this.slots, this.getWheelDegreesTraversedAtTime(t));
    }

    start() {
        this.status = 'STARTED';
        this.emitDefaultBall();
        this.getNextMoment();
        this.timeInterval = setInterval(() => {
            this.moment += 1;
            this.getNextMoment();
        }, this.timerPeriod);
    }

    startSpin() {
        if (this.started) {
            this.stoppedMoment = 0;
            this.stoppedDegreesCounterClockwise = 0;
            this.status = 'SPINNING';
            this.playSound();
        }
    }

    endSpin(moment: number, position: PixelPosition) {
        const spin = build(RouletteWheelSpin, {
            slot: this.slotAtTimeAndPosition(moment, position),
            moment,
            position,
        });
        this.emitLastSpin(spin);
        this.stoppedDegreesCounterClockwise = RouletteWheel.GetDegreesCounterClockwiseFromPosition(this.centerPosition, position);
        this.stoppedMoment = moment;
        this.startTransition();
    }

    startTransition() {
        this.status = 'TRANSITIONING';
        setTimeout(() => {
            this.reload();
        }, 2000);
    }

    stop() {
        this.status = 'STOPPED';
        this.emitDefaultBall();
        this.moment = 0;
    }

    stopTransition() {
        this.status = 'STARTED';
        this.emitDefaultBall();
    }

    reload() {
        this.status = 'RELOADING';
        this.emitDefaultBall();
    }

    private emitDefaultBall() {
        this.emitNextBall(this.ballBeforeSpin);
    }

    private emitLastSpin(spin: RouletteWheelSpin) {
        this.lastSpin = spin;
        this.lastSpinSubject.next(this.lastSpin);
    }

    private emitNextBall(ball: RouletteBall) {
        this.ball = ball;
        this.ballSubject.next(ball);
    }

    private getNextBallPositionTransitioning(): PixelPosition {
        const momentsPassed = this.moment - this.stoppedMoment;
        const degreesTraversed = momentsPassed * this.wheelDegreesPerMoment;
        const degreesClockwise = RouletteWheel.RotateDegreesCounterClockwise(this.stoppedDegreesClockwise, degreesTraversed);
        return RouletteWheel.GetPosition(this.centerPosition, degreesClockwise, this.ballDistanceFromCenterStopped);
    }

    private getNextMoment() {
        // this.log(this.status, 1000);
        switch (this.status) {
            case 'STARTED':
                break;
            case 'STOPPED':
                clearInterval(this.timeInterval);
                break;
            case 'SPINNING':
                if (this.ballStopped) {
                    this.endSpin(this.moment, this.ball.position); // TODO: check this logic
                } else {
                    const pos = this.nextBallPosition;
                    const b = build(RouletteBall, { position: pos });
                    this.emitNextBall(b);
                }
                break;
            case 'TRANSITIONING':
                const position = this.getNextBallPositionTransitioning();
                const ball = build(RouletteBall, this.ball, { position });
                this.emitNextBall(ball);
                break;
            case 'RELOADING':
                break;
        }
    }

    private log(e: any, period = 100) {
        if (this.moment % period === 0) {
            console.log('\n\nMoment = ', this.moment);
            console.dir(e);
            console.log('\n\n');
        }
    }

    private playSound() {
        const audio = new Audio('assets/roulette-spin.mp3');
        audio.play();
    }

}

export class RouletteBall {
    positionLeft = 0;
    positionTop = 0;
    stoppedDegreesCounterClockwise = 0;
    stoppedMoment = 0;

    set position(value: PixelPosition) {
        this.positionLeft = value.left;
        this.positionTop = value.top;
    }

    get position(): PixelPosition {
        return build(PixelPosition, {
            top: this.positionTop,
            left: this.positionLeft
        });
    }

}

export class PixelCoordinates {
    x = 0;
    y = 0;
}

export class PixelPosition {
    top = 0;
    left = 0;
}

export class RouletteWheelSlot {
    number = '';
    startDegrees = 0;
    endDegrees = 0;

    get color(): 'Red' | 'Black' | 'Green' {
        switch (this.number) {
            case '0':
                return 'Green';
            case '00':
                return 'Green';
            case '27':
                return 'Red';
            case '10':
                return 'Black';
            case '25':
                return 'Red';
            case '29':
                return 'Black';
            case '12':
                return 'Red';
            case '8':
                return 'Black';
            case '19':
                return 'Red';
            case '31':
                return 'Black';
            case '18':
                return 'Red';
            case '6':
                return 'Black';
            case '21':
                return 'Red';
            case '33':
                return 'Black';
            case '16':
                return 'Red';
            case '4':
                return 'Black';
            case '23':
                return 'Red';
            case '35':
                return 'Black';
            case '14':
                return 'Red';
            case '2':
                return 'Black';
            case '28':
                return 'Black';
            case '9':
                return 'Red';
            case '26':
                return 'Black';
            case '30':
                return 'Red';
            case '11':
                return 'Black';
            case '7':
                return 'Red';
            case '20':
                return 'Black';
            case '32':
                return 'Red';
            case '17':
                return 'Black';
            case '5':
                return 'Red';
            case '22':
                return 'Black';
            case '34':
                return 'Red';
            case '15':
                return 'Black';
            case '3':
                return 'Red';
            case '24':
                return 'Black';
            case '36':
                return 'Red';
            case '13':
                return 'Black';
            case '1':
                return 'Red';
            default:
                return null;
        }
    }

    get ballDegrees(): number { // TODO: find correct ball degrees
        // return RouletteWheel.GetMiddleDegrees(this.startDegrees, this.endDegrees);
        return RouletteWheel.GetQuartileDegrees(this.startDegrees, this.endDegrees);
        // return this.startDegrees;
        // return this.endDegrees;
    }

    getBallPosition(center: PixelPosition, radius: number): PixelPosition {
        const centralAngle = RouletteWheel.Degrees2CentralAngleClockwise(this.ballDegrees);
        const coordinates = RouletteWheel.GetCoordinatesRelativeToCenter(centralAngle, radius - 15);
        return RouletteWheel.GetPositionRelativeToCenter(center, coordinates, this.ballDegrees);
    }

    inSlot(degrees: number): boolean {
        return (degrees >= this.startDegrees && degrees < this.endDegrees)
            || (this.startDegrees > this.endDegrees && (degrees > this.startDegrees || degrees < this.endDegrees));
    }

}
